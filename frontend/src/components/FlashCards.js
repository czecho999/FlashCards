import { useState } from "react"
import { Card, CardActionArea, Typography, CardContent, Box } from "@mui/material"
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
const FlashCards = (flashCards) => {

    const [side, changeSide] = useState(true)
    const [currentFlashCard, changecurrentFlashcard] = useState(0)

    const numberOfFlashcards = flashCards.flashCards.length

    const next = () => {
        currentFlashCard === (numberOfFlashcards-1) ? changecurrentFlashcard(0): changecurrentFlashcard(currentFlashCard+1)
        changeSide(true)
    };

    const previous = () => {
        currentFlashCard === (0) ? changecurrentFlashcard(numberOfFlashcards-1): changecurrentFlashcard(currentFlashCard-1) 
        changeSide(true)
    };

    return(
    <Card className='.MuiCard-root' sx={{ align: "center"}}>
        <Box sx={{ display: 'flex', alignItems: 'center'}}>
        <CardActionArea sx={{ maxWidth:100,height: 325}} onClick={()=>previous()}>
            <ArrowBackIosNewIcon sx={{ height: 100, width: 100 }}/>
        </CardActionArea>
        <CardActionArea sx={{ minWidth: 350, height: 325 }} onClick={()=>changeSide(!side)}>
            <CardContent sx={{maxHeight: 1}}>
                {side?<Typography gutterBottom variant="h1"  align="center" >
                    {flashCards.flashCards[currentFlashCard]?.entry}
                </Typography> :
                <Typography gutterBottom variant="body2"  align="center" sx={{wordBreak: 'break-word'}}>
                    {flashCards.flashCards[currentFlashCard]?.definition}
                </Typography>}
            </CardContent>
        </CardActionArea>
        <CardActionArea sx={{ maxWidth:100,height: 325}} onClick={()=>next()}>
            <ArrowForwardIosIcon sx={{ height: 100, width: 100 }}/>
        </CardActionArea>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between'}}>
            <CardContent align="center">
                <Typography variant='p' color='text.secondary' align="center" >
                    {`${flashCards.flashCards[currentFlashCard]?.addedBy}`}
                </Typography>
            </CardContent>
            <CardContent align="center">
                <Typography variant='p' color='text.secondary' align="center" >
                    {`${(currentFlashCard+1)}/${numberOfFlashcards}`}
                </Typography>
            </CardContent>
            <CardContent align="center">
                <Typography variant='p' color='text.secondary' align="center" >
                    
                </Typography>
            </CardContent>
        </Box>
        </Card>
    )
}
export default FlashCards