import { Typography, Container, Box, Divider } from "@mui/material"
import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { request } from "../axiosHelper"
import ChapterCard from "../components/ChapterCard"
import { setCurrentChapters } from "../store"
import Grid from "@mui/material/Grid"
const Team = () => {
    
    const currentTeam = useSelector((state)=> state.team.value.team)
    const token = useSelector((state)=> state.token.value.token)
    const [chapters, setChapters] = useState()
    const dispatch = useDispatch()

    useEffect(() => {
        if(currentTeam){
            request("GET", `/team/${currentTeam.id}/chapter`, {}, token).then((res) => {
                setChapters(res.data)
            })
            .catch((error)=>{
                console.error(error);
            })
        }
    },[currentTeam, token])

    dispatch(setCurrentChapters({chapters:chapters}))

    return (
    <Box>
        <Typography variant="h3" align="center" fontWeight='fontWeightBold' >
            {currentTeam.name}
        </Typography>
        <Divider sx={{marginBottom: 2, }}/>
        <Container>
            <Grid container spacing={5}>
                {chapters && chapters.map((chapter, index) =>
                    <ChapterCard chapter={chapter} team={currentTeam}/>
                )}
            </Grid>
        </Container>
    </Box>
    )
}
export default Team