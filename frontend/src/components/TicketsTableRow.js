import { TableRow, TableCell, IconButton, Menu, MenuItem, Collapse, Box, Table, TableHead, TableBody } from "@mui/material"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Fragment, useState } from "react";
import {  useSelector } from "react-redux";
import { request } from "../axiosHelper";

const TicketsTableRow = ({row, reloadFlashcards, reloadTickets}) => {

    const [anchorEl, setAnchorEl] = useState(null);
    const [details, setDetails] = useState(false);
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
            reloadTickets()
        })
        .catch((error)=>{
            console.error(error);
        })
    }

    const handleDuplicatedRemove = () => {
        setAnchorEl(null);
        request("DELETE", `/team/flashcard/${row.duplicatedFlashCard.id}`, {}, token)
        .then((res)=>{
            reloadFlashcards()
            reloadTickets()
        })
        .catch((error)=>{
            console.error(error);
        })
    }

    const handleToCorrect = () => {
        setAnchorEl(null);
        request("PUT", `/team/setTicketToCorrect/${row.id}`, {}, token)
        .then(()=>{reloadTickets()})
        .catch((error)=>{
            console.error(error);
        })
    }

    const handleResolved = () => {
        setAnchorEl(null);
        request("PUT", `/team/setTicketResolved/${row.id}`, {}, token)
        .then(()=>{reloadTickets()})
        .catch((error)=>{
            console.error(error);
        })
    }

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
                <MenuItem onClick={handleToCorrect}> Do poprawy </MenuItem>
                <MenuItem onClick={handleResolved}> Poprawna </MenuItem>
                {row.type==="DUPLICATE" && <MenuItem onClick={handleDuplicatedRemove}> Usuń duplikowaną fiszkę</MenuItem>}
            </Menu>
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

export default TicketsTableRow