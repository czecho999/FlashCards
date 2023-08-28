import { useState } from "react"
import { Card, CardActionArea, Typography, CardContent, Box, IconButton, Dialog, DialogTitle, DialogContent } from "@mui/material"
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ImageIcon from '@mui/icons-material/Image';
import { useSelector } from "react-redux"
import { getImage } from "../axiosHelper"
import { Buffer } from "buffer";
const FlashCards = (flashCards) => {
    const [side, changeSide] = useState(true)
    const [currentFlashCard, changecurrentFlashcard] = useState(0)
    const [openDialog, setOpenDialog] = useState(false)
    const [img, setImage] = useState(null)

    const numberOfFlashcards = flashCards.flashCards.length
    const token = useSelector((state)=> state.token.value.token)

    const isImage = flashCards.flashCards[currentFlashCard]?.fileName==null

    const next = () => {
        currentFlashCard === (numberOfFlashcards-1) ? changecurrentFlashcard(0): changecurrentFlashcard(currentFlashCard+1)
        changeSide(true)
    };

    const previous = () => {
        currentFlashCard === (0) ? changecurrentFlashcard(numberOfFlashcards-1): changecurrentFlashcard(currentFlashCard-1) 
        changeSide(true)
    };

    const handleDialogOpen = () => {
        getImage("GET", `/team/getImage/${flashCards.flashCards[currentFlashCard].id}`, {}, token).then((res) => {
            setImage(Buffer.from(res.data, 'binary').toString('base64'))
        })
        .catch((error)=>{
            console.error(error);
        })
        .then(()=>{setOpenDialog(true)})
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
    }; 

    const handleKeyDown = (e) => {
        e.preventDefault()
        switch(e.key){
            case "ArrowRight":
                next()
                break
            case "ArrowLeft":
                previous()
                break
            case "ArrowUp":
                changeSide(!side)
                break
            case "ArrowDown":
                !isImage && handleDialogOpen()
        }
    }

    return(
    <Card className='.MuiCard-root' sx={{ align: "center"}} onKeyDown={handleKeyDown}>
        <Box sx={{ display: 'flex', alignItems: 'center'}}>
        <CardActionArea sx={{ maxWidth:100,height: 400}} onClick={()=>previous()}>
            <ArrowBackIosNewIcon sx={{ height: 100, width: 100 }}/>
        </CardActionArea>
        <CardActionArea sx={{ minWidth: 350, height: 400 }} onClick={()=>changeSide(!side)} >
            <CardContent sx={{maxHeight: 1}}>
                {side?<Typography gutterBottom variant="h1"  align="center" >
                    {flashCards.flashCards[currentFlashCard]?.entry}
                </Typography> :
                <Typography gutterBottom variant="body2"  align="center" sx={{wordBreak: 'break-word'}}>
                    {flashCards.flashCards[currentFlashCard]?.definition}
                </Typography>}
            </CardContent>
        </CardActionArea>
        <CardActionArea sx={{ maxWidth:100,height: 400}} onClick={()=>next()}>
            <ArrowForwardIosIcon sx={{ height: 100, width: 100 }}/>
        </CardActionArea>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between'}}>
            <CardContent align="center">
                <Typography variant='p' color='text.secondary' align="center" >
                    {`${flashCards.flashCards[currentFlashCard]?.addedBy}`}
                </Typography>
            </CardContent>
            <CardContent/>
            <CardContent/>
            <CardContent align="center">
                <Typography variant='p' color='text.secondary' align="center" >
                    {`${(currentFlashCard+1)}/${numberOfFlashcards}`}
                </Typography>
            </CardContent>
            <CardContent align="center">
                <IconButton disabled={isImage} onClick={handleDialogOpen}>
                    <ImageIcon/>
                </IconButton>
                <Dialog onKeyDown={handleDialogClose} onClose={handleDialogClose} open={openDialog} maxWidth="md">
                    <DialogTitle>Obraz do {flashCards.flashCards[currentFlashCard].entry}</DialogTitle>
                    <DialogContent>
                        <img style={{width: "100%"}}src={`data:image/png;base64, ${img}`} alt="Obraz do fiszki" />
                    </DialogContent>
                </Dialog>
            </CardContent>
            <CardContent/>
            <CardContent/>
        </Box>
        </Card>
    )
}
export default FlashCards