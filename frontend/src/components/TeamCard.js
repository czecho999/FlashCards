import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea, } from '@mui/material';
import Grid from '@mui/material/Grid';
import { setCurrentTeam } from '../store';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import Avatar from '@mui/material/Avatar';

export default function TeamCard({team}) {

  const dispatch = useDispatch();
  return (
    <Grid item xs={3}>
        <Card className='.MuiCard-root'>
        <Link to={`/${team.id}`}>
        <CardActionArea sx={{ maxWidth: 345, height: 150 }} onClick={() => dispatch(setCurrentTeam({team: team}))} >
            <CardContent>

            <Avatar variant="rounded">{team.name[0].toUpperCase()}</Avatar>

            <Typography gutterBottom variant="h6" component="div">
                {team.name}
            </Typography>
            </CardContent>
        </CardActionArea>
        </Link>
        </Card>
    </Grid>
  );
}