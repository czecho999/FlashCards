import { Typography, Container, Box, TextField, Button } from "@mui/material"
import React from "react"
import { useState } from "react"
import { request } from "../axiosHelper"
import { useSelector } from "react-redux"
import { Link } from 'react-router-dom'

const AddChapter = () => {

    const [newChapter, setNewChapter] = useState()
    const currentTeam = useSelector((state)=> state.team.value.team)

    const addChapter = () =>{
        request("POST", `/team/${currentTeam.id}/chapter`, newChapter)
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
            label="Nazwa nowego działu"
            multiline
            maxRows={4}
            onChange={(e)=>{setNewChapter(e.currentTarget.value)}}
            />
            <Link to={`/${currentTeam.id}`}>
                <Button variant="outlined" size="large" sx={{marginTop: 1}} onClick={()=>addChapter()}>Stwórz dział</Button>
            </Link>
        </Box>
        </Typography>
    </Container>
    )
}
export default AddChapter