import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom'

export default function ChapterCard({chapter, team}) {

  return (
    <Grid item xs={4}>
        <Card className='.MuiCard-root'>
        <Link to={`/${team.id}/${chapter.id}`}>
        <CardActionArea sx={{ height: 150 }} >
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {chapter.name}
                </Typography>
            </CardContent>
            <CardContent>
                <Typography variant='p' color='text.secondary'>
                    {chapter && chapter.flashCards.length} fiszek
                </Typography>
            </CardContent>
        </CardActionArea>
        </Link>
        </Card>
    </Grid>
  );
}