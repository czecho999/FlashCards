import { Typography, Container, Box, TextField, Button } from "@mui/material"
import React from "react"
import { useState } from "react"
import { request } from "../axiosHelper"
import { useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom'

const AddTeam = () => {

    const [newTeam, setNewTeam] = useState()
    const username = useSelector((state)=> state.user.value.login)
    const token = useSelector((state)=> state.token.value.token)
    const navigate = useNavigate()

    const addTeam = () =>{
        console.log(token)
        request("POST", `/team`, {
            name: newTeam,
            username: username
        }, token)
        .then(navigate(`/teams`))
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
                <Button variant="outlined" size="large" sx={{marginTop: 1}} onClick={()=>addTeam()}>Stwórz zespół</Button>
        </Box>
        </Typography>
    </Container>
    )
}
export default AddTeam