import { Container, Box, TextField, Button, Divider, Chip } from "@mui/material"
import React from "react"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { request } from "../axiosHelper";
import { setCurrentTeam } from "../store";
import UsersTableRow from "../components/UsersTableRow";

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
                {<TableBody>
                {users && users.map((row) => (
                    <UsersTableRow row={row} />
                ))}
                </TableBody>}
            </Table>
        </TableContainer>
    </Container>
    )
}
export default Users