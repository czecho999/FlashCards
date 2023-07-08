import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function FlashCardsTable(flashCards) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 ,maxWidth: 1}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Pojęcie</TableCell>
            <TableCell align="center">Definicja</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {flashCards.flashCards.map((row) => (
            <TableRow
              key={row.entry}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.entry}
              </TableCell>
              <TableCell align="justify" sx={{whiteSpace: 'normal',wordBreak: 'break-word', maxWidth:1}}>{row.definition}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}