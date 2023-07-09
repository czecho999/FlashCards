import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton } from '@mui/material';

export default function FlashCardsTable(flashCards) {
  return (
    <TableContainer component={Paper}>
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
          {flashCards.flashCards.map((row) => (
            <TableRow
              key={row.entry}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.entry}
              </TableCell>
              <TableCell align="justify" sx={{whiteSpace: 'normal',wordBreak: 'break-word', maxWidth:1}}>{row.definition}</TableCell>
              <TableCell sx={{width: 0.15}}>{row.addedBy}</TableCell>
              <TableCell sx={{width:0.05}}>
                <IconButton
                aria-label="more"
                id="long-button"
                // aria-controls={open ? 'long-menu' : undefined}
                // aria-expanded={open ? 'true' : undefined}
                // aria-haspopup="true"
                // onClick={handleClick}
                >
                    <MoreVertIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}