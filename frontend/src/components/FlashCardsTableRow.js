import { TableRow, TableCell, IconButton, Menu, MenuItem } from "@mui/material"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from "react";
import {  useSelector } from "react-redux";
import { request } from "../axiosHelper";
import RaiseTicketDialog from "./RaiseTicketDialog";

const FlashCardsTableRow = ({row, reloadFlashCards, flashcards}) => {

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const token = useSelector((state)=> state.token.value.token)
    const [openDialog, setOpenDialog] = useState(false)
    const team = useSelector((state)=> state.team.value.team)
    const loggedUserName = useSelector((state)=> state.user.value.login)
    const loggedUserRole = team.loggedUserRole

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleFlashcardRemove = () => {
        setAnchorEl(null);
        request("DELETE", `/team/flashcard/${row.id}`, {}, token)
        .then((res)=>{
            reloadFlashCards()
        })
        .catch((error)=>{
            console.error(error);
        })
    }

    const handleTicketDialog = () => {
        setOpenDialog(true)
        handleClose()
    }

    const handleDialogClose = () => {
        setOpenDialog(false);
    }; 

    return (
        <TableRow
              key={row.entry}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" sx={{width: 0.15}}>
                {row.entry}
              </TableCell>
              <TableCell align="justify" sx={{whiteSpace: 'normal',wordBreak: 'break-word', maxWidth:1}}>{row.definition}</TableCell>
              <TableCell sx={{width: 0.1}}>{row.addedBy}</TableCell>
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
                    {(loggedUserRole === 'ADMIN' || loggedUserRole === 'MODERATOR' || row.addedBy === loggedUserName) && (
                        <MenuItem onClick={handleFlashcardRemove}>Usuń fiszkę</MenuItem>
                    )}
                    <MenuItem onClick={handleTicketDialog}> Oznacz fiszkę </MenuItem>
                </Menu>
                <RaiseTicketDialog flashcard={row} handleDialogClose={handleDialogClose} openDialog={openDialog} flashcards={flashcards}/>
              </TableCell>
            </TableRow>
    )
}

export default FlashCardsTableRow