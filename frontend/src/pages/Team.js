import { Typography, Container, Box } from "@mui/material"
import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { request } from "../axiosHelper"
import ChapterCard from "../components/ChapterCard"
import { setCurrentChapters } from "../store"
import Grid from "@mui/material/Grid"
const Team = () => {
    
    const currentTeam = useSelector((state)=> state.team.value.team)
    const [chapters, setChapters] = useState()
    const dispatch = useDispatch()

    useEffect(() => {
        if(currentTeam){
            request("GET", `/team/${currentTeam.id}/chapter`, {}).then((res) => {
                setChapters(res.data)
            })
            .catch((error)=>{
                console.error(error);
            })
        }
    },[currentTeam])

    dispatch(setCurrentChapters({chapters:chapters}))
    return (
    <Box>
        <Typography variant="h3" align="center"  sx={{marginBottom: 2, bgcolor: "lightgrey"}}>
            {currentTeam.name}
        </Typography>
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