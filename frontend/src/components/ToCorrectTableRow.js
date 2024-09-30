import { TableRow, TableCell, IconButton, Menu, MenuItem, Collapse, Box, Table, TableHead, TableBody } from "@mui/material"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Fragment, useState } from "react";
import {  useSelector } from "react-redux";
import { request } from "../axiosHelper";
import EditFlashCardDialog from "./EditFlashCardDialog";

const ToCorrectTableRow = ({row, reloadFlashcards, reloadToCorrect}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [details, setDetails] = useState(false);
    const [openDialog, setOpenDialog] = useState(false)
    const open = Boolean(anchorEl);
    const token = useSelector((state)=> state.token.value.token)
    

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleMarkedRemove = () => {
        setAnchorEl(null);
        request("DELETE", `/team/flashcard/${row.markedFlashCard.id}`, {}, token)
        .then((res)=>{
            reloadFlashcards()
            reloadToCorrect()
            handleClose()
        })
        .catch((error)=>{
            console.error(error);
        })
    }

    const handleEditFlashcard = () => {
        setOpenDialog(true)
        handleClose()
    }

    const handleDialogClose = () => {
        setOpenDialog(false);
    }; 

    return (
        <Fragment>
        <TableRow
            key={row.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell sx={{width: 0.05}}>
                <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setDetails(!details)}
                >
                {details ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
            </TableCell>
            <TableCell component="th" scope="row" sx={{width: 0.15}}>
            {row.type === "INCORRECT" ? "BŁĄD"
            : row.type === "DUPLICATE" ? "DUPLIKAT"
            : row.type === "TO_CORRECT" ? "DO POPRAWY"
            : "ZAMKNIĘTA"}
            </TableCell>
            <TableCell sx={{width: 0.2, whiteSpace: 'normal',wordBreak: 'break-word',}}>{row.markedFlashCard.entry}</TableCell>
            <TableCell align="justify" sx={{whiteSpace: 'normal',wordBreak: 'break-word', maxWidth:1}}>{row.comment}</TableCell>
            <TableCell sx={{width:0.15}}>{row.raisedBy}</TableCell>
            <TableCell sx={{width:0.05}}>
            <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? 'long-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
            'aria-labelledby': 'basic-button',
            }}
            >
                <MenuItem onClick={handleMarkedRemove}>Usuń fiszkę</MenuItem>
                <MenuItem onClick={handleEditFlashcard}>Edytuj Fiszkę</MenuItem>
            </Menu>
            <EditFlashCardDialog flashcard={row.markedFlashCard} handleDialogClose={handleDialogClose} openDialog={openDialog}/>
            </TableCell>
        </TableRow>
        <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={details} timeout="auto" unmountOnExit>
                <Box sx={{ margin: 1 }}>
                <Table size="small" aria-label="purchases">
                    <TableHead>
                    <TableRow>
                        <TableCell>Definicja fiszki</TableCell>
                        {row.type==="DUPLICATE" && <TableCell>Duplikowana fiszka</TableCell>}
                        {row.type==="DUPLICATE" && <TableCell >Definicja duplikowanej</TableCell>}
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                        <TableCell component="th" scope="row" sx={{minWidth:0.45, maxWidth:1, whiteSpace: 'normal',wordBreak: 'break-word',}}>
                            {row.markedFlashCard.definition}
                        </TableCell>
                        {row.type==="DUPLICATE" &&<TableCell sx={{width:0.1}}>{row.duplicatedFlashCard?.entry}</TableCell>}
                        {row.type==="DUPLICATE" &&<TableCell sx={{width:0.45, whiteSpace: 'normal',wordBreak: 'break-word',}}>{row.duplicatedFlashCard?.definition}</TableCell>}
                        </TableRow>
                    </TableBody>
                </Table>
                </Box>
            </Collapse>
            </TableCell>
        </TableRow>
        </Fragment>
    )
}

export default ToCorrectTableRow