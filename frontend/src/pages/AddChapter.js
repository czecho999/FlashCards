import { Typography, Container, Box, TextField, Button } from "@mui/material"
import React from "react"
import { useState } from "react"
import { request } from "../axiosHelper"
import { useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom'

const AddChapter = () => {

    const [newChapter, setNewChapter] = useState()
    const currentTeam = useSelector((state)=> state.team.value.team)
    const token = useSelector((state)=> state.token.value.token)
    const navigate = useNavigate()

    const addChapter = () =>{
        request("POST", `/team/${currentTeam.id}/chapter`, newChapter, token)
        .then(navigate(`/${currentTeam.id}`))
        .catch((error)=>{
            console.error(error);
        })
    }


    return (
    <Container>
        <Typography component='div'>
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
            label="Nazwa nowego działu"
            multiline
            maxRows={4}
            onChange={(e)=>{setNewChapter(e.currentTarget.value)}}
            />
            <Button variant="outlined" size="large" sx={{marginTop: 1}} onClick={()=>addChapter()}>Stwórz dział</Button>
        </Box>
        </Typography>
    </Container>
    )
}
export default AddChapter