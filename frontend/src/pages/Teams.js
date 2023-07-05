import { Container } from "@mui/material"
import React, { useEffect, useState } from "react"
import TeamCard from "../components/TeamCard"
import Grid from "@mui/material/Grid"
import { useSelector } from "react-redux"
import { request } from "../axiosHelper"

const Teams = () => {
    const [user, setUser] = useState({});
    const userId = useSelector((state)=> state.user.value.id)

    
    useEffect(() => {
        if(userId){
            request("GET", `/user/${userId}`, {}).then((res) => {
                setUser(res.data);
            })
            .catch((error)=>{
                console.error(error);
            })
        }
    },[userId])

    return (
    <Container>
        <Grid container spacing={5}>
            {user.teams && user.teams.map((team, index) =>
                <TeamCard team={team}/>
            )}
        </Grid>
    </Container>
    )
}
export default Teams