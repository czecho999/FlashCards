import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea, } from '@mui/material';
import Grid from '@mui/material/Grid';
import { setCurrentTeam } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import Avatar from '@mui/material/Avatar';
import { request } from '../axiosHelper';

export default function TeamCard({team}) {

  const token = useSelector((state)=> state.token.value.token)
  const navigate = useNavigate();

  const handleTeamChoose = (id) => {
    request("GET", `/team/${id}`, {}, token).then((res) => {
      dispatch(setCurrentTeam({team: res.data}))
    })
    .then(navigate(`/${team.id}`))
    .catch((error)=>{
        console.error(error);
    })
  }

  const dispatch = useDispatch();
  return (
    <Grid item xs={3}>
        <Card className='.MuiCard-root'>
        <CardActionArea sx={{ maxWidth: 345, height: 150 }} onClick={() => handleTeamChoose(team.id)} >
            <CardContent>
            <Avatar variant="rounded">{team.name[0].toUpperCase()}</Avatar>
            <Typography gutterBottom variant="h6" component="div">
                {team.name}
            </Typography>
            </CardContent>
        </CardActionArea>
        </Card>
    </Grid>
  );
}