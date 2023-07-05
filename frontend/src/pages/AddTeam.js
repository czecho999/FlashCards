import { Typography, Container, Box, TextField, Button } from "@mui/material"
import React from "react"
import { useState } from "react"
import { request } from "../axiosHelper"
import { useSelector } from "react-redux"
import { Link } from 'react-router-dom'

const AddTeam = () => {

    const [newTeam, setNewTeam] = useState()
    const username = useSelector((state)=> state.user.value.login)

    const addTeam = () =>{
        request("POST", `/team`, {
            name: newTeam,
            username: username
        })
        .catch((error)=>{
            console.error(error);
        })
    }


    return (
    <Container>
        <Typography>
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '50ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <TextField
            id="standard-multiline-flexible"
            label="Nazwa nowego Zespołu"
            multiline
            maxRows={4}
            onChange={(e)=>{setNewTeam(e.currentTarget.value)}}
            />
            <Link to={`/teams`}>
                <Button variant="outlined" size="large" sx={{marginTop: 1}} onClick={()=>addTeam()}>Stwórz zespół</Button>
            </Link>
        </Box>
        </Typography>
    </Container>
    )
}
export default AddTeam