import { Dialog, DialogTitle, DialogContent, Box, Paper, TextField, DialogActions, Button } from "@mui/material"
import { useState } from "react";
import { request } from "../axiosHelper";
import { useSelector } from "react-redux";

const EditFlashCardDialog = ({flashcard, handleDialogClose, openDialog}) => {


    const token = useSelector((state)=> state.token.value.token)
    const [newEntry, setNewEntry] = useState(flashcard.entry)
    const [newDefinition, setNewDefinition] = useState(flashcard.definition)

    const handleClose = () => {
        handleDialogClose()
    };

    const handleSaveFlashCard = () => {
        console.log(newDefinition)
        request("PUT", `/team/flashcard/${flashcard.id}`, {
            entry: newEntry,
            definition: newDefinition,
            fileName: flashcard.fileName
        }, token)
        .then(()=>{
            handleDialogClose()
        })
        .catch((error)=>{
            console.error(error);
        })
    };

    return(
        <Dialog onClose={handleClose} open={openDialog} maxWidth="lg" fullWidth="true">
            <DialogTitle>Edytuj fiszke"{flashcard.entry}"</DialogTitle>
            <DialogContent>
                <Paper marginBottom={1}>
                    <Box component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: 0.48 },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField
                            id="standard-multiline-flexible"
                            label="Pojęcie"
                            multiline
                            maxRows={4}
                            value={newEntry}
                            onChange={(e)=>{setNewEntry(e.currentTarget.value)}}
                        />
                        <TextField
                            id="standard-multiline-flexible"
                            label="Definicja"
                            maxRows={4}
                            value={newDefinition}
                            inputProps={{ maxLength: 2048 }}
                            multiline
                            onChange={(e)=>{setNewDefinition(e.currentTarget.value)}}
                        />
                    </Box>
                </Paper>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSaveFlashCard}>Zapisz</Button>
                <Button onClick={handleClose}>Anuluj</Button>
            </DialogActions>
        </Dialog>
)
}

export default EditFlashCardDialog