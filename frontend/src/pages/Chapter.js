import { Typography, Container, Divider, Chip, Box, TextField, Button } from "@mui/material"
import React from "react"
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { request } from "../axiosHelper"
import FlashCards from "../components/FlashCards"
import FlashCardsTable from "../components/FlashCardsTable"
import { useSelector } from "react-redux"

const Chapter = () => {
    const { chapter } = useParams()
    const [chapterData, setChapterData] = useState()
    const [newEntry, setNewEntry] = useState()
    const [newDefinition, setNewDefinition] = useState()
    const token = useSelector((state)=> state.token.value.token)

    const addFlashcard = () =>{
        request("POST", `/team/${chapter}/flashcards`, {
            entry: `${newEntry}`,
            definition: `${newDefinition}`
        }, token).then((res) => {
            reloadFlashcards()
        })
        .catch((error)=>{
            console.error(error);
        })
    }

    const reloadFlashcards = () =>{
        request("GET", `/team/chapter/${chapter}`, {}, token).then((res) => {
            setChapterData(res.data)
        })
        .catch((error)=>{
            console.error(error);
        })
    }


    useEffect(() => {
        if(chapter){
            request("GET", `/team/chapter/${chapter}`, {}, token).then((res) => {
                setChapterData(res.data)
            })
            .catch((error)=>{
                console.error(error);
            })
        }
    },[chapter, token])

    return (
    <Container>
        <Typography variant="h3" align="center">
            {chapterData?.name}
        </Typography>
        {chapterData?.flashCards.length>0 ? <FlashCards flashCards={chapterData.flashCards}/> 
        : <Typography>Brak fiszek w dziale</Typography>}
        <Divider sx={{marginTop:5}}>
            <Chip label="Dodaj fiszki:" />
        </Divider>
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
            label="Pojęcie"
            multiline
            maxRows={4}
            onChange={(e)=>{setNewEntry(e.currentTarget.value)}}
            />
            <TextField
            id="standard-multiline-flexible"
            label="Definicja"
            maxRows={4}
            inputProps={{ maxLength: 2048 }}
            multiline
            onChange={(e)=>{setNewDefinition(e.currentTarget.value)}}
            />
            <Button variant="outlined" size="large" sx={{marginTop: 1}} onClick={()=>addFlashcard()}>Dodaj fiszkę</Button>
        </Box>
        <Divider sx={{marginTop:5}}>
            <Chip label="Wszystkie fiszki:" />
        </Divider>
        {chapterData?.flashCards.length>0 ? <FlashCardsTable flashCards={chapterData.flashCards}/>
        :<Typography>Brak fiszek w dziale</Typography>}
    </Container>
    )
}
export default Chapter