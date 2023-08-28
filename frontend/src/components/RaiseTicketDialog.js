import { Dialog, DialogTitle, DialogContent, Box, Paper, Typography, Divider, TextField, MenuItem, Chip, Autocomplete, DialogActions, Button } from "@mui/material"
import { useState } from "react";
import { request } from "../axiosHelper";
import { useSelector } from "react-redux";

const RaiseTicketDialog = ({flashcard, handleDialogClose, openDialog, flashcards}) => {


    const token = useSelector((state)=> state.token.value.token)
    const [type, setType] = useState()
    const [duplicated, setDuplicated] = useState()
    const [comment, setComment] = useState("")

    const defaultProps = {
        options: flashcards,
        getOptionLabel: (option) => option.entry,
    };

    const handleClose = () => {
        setType(null)
        setComment("")
        setDuplicated(null)
        handleDialogClose()
    };

    const handleRaiseTicket = () => {
        request("POST", `/team/raiseTicket/${flashcard.id}`, {
            comment: comment,
            type: (type==="Duplikat" ? "DUPLICATE"
                    : type==="Błędna fiszka" ? "INCORRECT"
                    : null),
            duplicatedId: (type==="Duplikat" ? duplicated.id : null)
        }, token)
        .then(()=>{
            setType(null)
            setComment("")
            setDuplicated(null)
            handleDialogClose()
        })
        .catch((error)=>{
            console.error(error);
        })
    };

    return(
        <Dialog onClose={handleClose} open={openDialog} maxWidth="lg" fullWidth="true">
            <DialogTitle>Oznacz fiszke "{flashcard.entry}"</DialogTitle>
            <DialogContent>
                <Paper variant="outlined" marginBottom={1}>
                    <Box sx={{ display: 'flex', alignItems: 'center'}}>
                        <Typography width={0.2} marginY={1} sx={{whiteSpace: 'normal',wordBreak: 'break-word', marginX: 1}}>{flashcard.entry}</Typography>
                        <Divider orientation="vertical" flexItem variant="middle"/>
                        <Typography width={0.8} marginY={1} sx={{whiteSpace: 'normal',wordBreak: 'break-word', marginX: 1}}>{flashcard.definition}</Typography>
                    </Box>
                </Paper>
                <Divider sx={{marginTop: 3}}>
                    <Chip label="Wypełnij zgłoszenie:"/>
                </Divider>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: 0.5 },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        id="outlined-select-currency"
                        select
                        defaultValue=""
                        label="Rodzaj zgłoszenia"
                        onChange={(e)=>setType(e.target.value)}
                        >
                        {["Błędna fiszka", "Duplikat"].map((option) => (
                            <MenuItem key={option} value={option}>
                            {option}
                            </MenuItem>
                        ))}
                    </TextField>
                    {type==="Duplikat"&&(<Autocomplete
                        disablePortal
                        {...defaultProps}
                        id="disable-close-on-select"
                        onChange={(e,value)=>setDuplicated(value)}
                        renderInput={(params) => (
                        <TextField {...params} label="Duplikowana Fiszka:" variant="outlined" />
                        )}
                    />)}
                    <TextField
                        id="standard-multiline-flexible"
                        label="Komentarz"
                        maxRows={4}
                        inputProps={{ maxLength: 256 }}
                        multiline
                        onChange={(e)=>{setComment(e.currentTarget.value)}}
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleRaiseTicket}>Wyślij zgłoszenie</Button>
                <Button onClick={handleClose}>Anuluj</Button>
            </DialogActions>
        </Dialog>
)
}

export default RaiseTicketDialog