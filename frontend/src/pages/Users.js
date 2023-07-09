import { Container, Box, TextField, Button, Divider, Chip, IconButton, Menu, MenuItem } from "@mui/material"
import React from "react"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { request } from "../axiosHelper";
import { setCurrentTeam } from "../store";

const Users = () => {

    const [newUser, setNewUser] = useState()

    const team = useSelector((state)=> state.team.value.team)
    const token = useSelector((state)=> state.token.value.token)
    const dispatch = useDispatch();
    const users = team.users

    const addUser = () =>{
        request("POST", `/team/addUser`, {
            login: newUser,
            teamId: team.id
        }, token)
        .then((res)=>{
            dispatch(setCurrentTeam({team: res.data}))
        })
        .catch((error)=>{
            console.error(error);
        })
    }

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
    <Container>
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: 0.8 },
            }}
            noValidate
            autoComplete="off"

        >
            <TextField
            id="standard-multiline-flexible"
            label="Login nowego użytkownika"
            onChange={(e)=>{setNewUser(e.currentTarget.value)}}
            />
            <Button variant="outlined" size="large" sx={{marginTop: 1}} onClick={()=>{addUser()}}>Dodaj użytkownika</Button>
        </Box>
        <Divider sx={{marginTop:5}}>
            <Chip label="Użytkownicy" />
        </Divider>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 ,maxWidth: 1}} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>Użytkownik</TableCell>
                    <TableCell >Rola</TableCell>
                    <TableCell></TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {users.map((row) => (
                    <TableRow
                    key={row.user.login}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="row">
                        {row.user.login}
                    </TableCell>
                    <TableCell align="justify" sx={{whiteSpace: 'normal',wordBreak: 'break-word', maxWidth:1}}>{row.userTeamRole}</TableCell>
                    <TableCell sx={{width:0.05}}>
                        <IconButton
                        aria-label="more"
                        id="long-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
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
                            <MenuItem onClick={handleClose}>Usuń użytkownika</MenuItem>
                            <MenuItem onClick={handleClose}>Zmień rolę</MenuItem>
                        </Menu>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
    </Container>
    )
}
export default Users