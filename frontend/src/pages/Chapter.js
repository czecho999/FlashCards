import { Typography, Container, Divider, Chip, Box, TextField, Button, Paper, IconButton } from "@mui/material"
import React from "react"
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { request, postImage } from "../axiosHelper"
import FlashCards from "../components/FlashCards"
import FlashCardsTable from "../components/FlashCardsTable"
import { useSelector } from "react-redux"
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

const Chapter = () => {
    const { chapter } = useParams()
    const [chapterData, setChapterData] = useState()
    const [newEntry, setNewEntry] = useState()
    const [newDefinition, setNewDefinition] = useState()
    const [newImage, setNewImage] = useState(null)
    const token = useSelector((state)=> state.token.value.token)

    const addFlashcard = () =>{
        if(newImage==null){
            request("POST", `/team/${chapter}/flashcards`, {
                entry: `${newEntry}`,
                definition: `${newDefinition}`,
                fileName: null
            }, token).then((res) => {
                setNewDefinition("")
                setNewEntry("")
                reloadFlashcards()
            })
            .catch((error)=>{
                console.error(error);
            })
        }
        else{
            request("POST", `/team/${chapter}/flashcards`, {
                entry: `${newEntry}`,
                definition: `${newDefinition}`,
                fileName: newImage.name
            }, token).then((res) => {
                const renamedFile = new File([newImage], `${res.data.fileName}`)
                const formData = new FormData();
                formData.append("image", renamedFile)
                postImage("POST", `/team/${res.data.id}/addImage`, formData, token).then(()=>{
                    setNewImage(null)
                    setNewDefinition("")
                    setNewEntry("")
                    reloadFlashcards()
                })
                .catch((error)=>console.error(error))
            })
            .catch((error)=>{
                console.error(error);
            })
        }
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
        <Paper variant="outlined" sx={{marginBottom: 4, marginTop: 0.5, borderRadius:5, boxShadow:1}}>
        <Typography variant="h3" align="center">
            {chapterData?.name}
        </Typography>
        </Paper>
        {chapterData?.flashCards.length>0 ? <FlashCards flashCards={chapterData.flashCards}/> 
        : <Typography>Brak fiszek w dziale</Typography>}
        <Divider sx={{marginTop:5}}>
            <Chip label="Dodaj fiszki:" />
        </Divider>
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: 0.48 },
            }}
            noValidate
            autoComplete="off"
        >
            <TextField
            id="standard-multiline-flexible"
            label="Pojęcie"
            multiline
            maxRows={4}
            value={newEntry}
            onChange={(e)=>{setNewEntry(e.currentTarget.value)}}
            />
            <TextField
            id="standard-multiline-flexible"
            label="Definicja"
            maxRows={4}
            value={newDefinition}
            inputProps={{ maxLength: 2048 }}
            multiline
            onChange={(e)=>{setNewDefinition(e.currentTarget.value)}}
            />
            <IconButton component="label">
                <input hidden accept="image/*" 
                type="file" 
                onChange={(e)=>{setNewImage(e.target.files[0])}}/>
                <AddPhotoAlternateIcon fontSize="large"/>
                {newImage==null ? <Typography color='text.secondary' >Dodaj grafikę (Opcjonalne)</Typography>
                : <Typography color='text.secondary'>{newImage?.name}</Typography>}
            </IconButton>
            <Button variant="outlined" size="large" sx={{marginTop: 1}} onClick={()=>addFlashcard()}>Dodaj fiszkę</Button>
        </Box>
        <Divider sx={{marginTop:5, marginBottom:5}}>
        </Divider>
        {chapterData?.flashCards.length>0 ? <FlashCardsTable flashCards={chapterData.flashCards} reloadFlashcards={reloadFlashcards}/>
        :<Typography>Brak fiszek w dziale</Typography>}
    </Container>
    )
}
export default Chapter