import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import FlashCardsTableRow from './FlashCardsTableRow';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TicketsTable from './TicketsTable';
import ToCorrectTable from './ToCorrectTable';
import { TextField } from '@mui/material';


export default function FlashCardsTable(flashCards) {

  const [value, setValue] = React.useState('1');
  const [flashcardsFilter,setFlashcardsFilter] = React.useState()

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Wszystkie Fiszki" value="1" />
            <Tab label="Oznaczone fiszki" value="2" />
            <Tab label="Moje Fiszki do poprawy" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <TableContainer component={Paper}>
            <TextField
              id="search"
              label="Wyszukaj Fiszki"
              value={flashcardsFilter}
              onChange={(e)=>{setFlashcardsFilter(e.currentTarget.value)}}
              fullWidth
              sx={{marginTop: 1}}
            />
            <Table sx={{ minWidth: 650 ,maxWidth: 1}} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Pojęcie</TableCell>
                  <TableCell >Definicja</TableCell>
                  <TableCell>Twórca</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {flashCards.flashCards.filter((f) => f.entry.includes(flashcardsFilter)).map((row) => (
                  <FlashCardsTableRow row = {row} reloadFlashCards={flashCards.reloadFlashcards} flashcards={flashCards.flashCards}/>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
        <TabPanel value="2">
          <TicketsTable reloadFlashcards={flashCards.reloadFlashcards}/>
        </TabPanel>
        <TabPanel value="3">
          <ToCorrectTable/>
        </TabPanel>
      </TabContext>
    </Box>

  );
}