import * as React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useParams } from "react-router-dom"
import { useEffect } from 'react';
import { request } from '../axiosHelper';
import TicketsTableRow from './TicketsTableRow';



export default function TicketsTable({reloadFlashcards}) {

    const [tickets, setTickets] = useState()
    const token = useSelector((state)=> state.token.value.token)
    const { chapter } = useParams()

    useEffect(() => {
        request("GET", `/team/ticketsInChapter/${chapter}`, {}, token).then((res) => {
            setTickets(res.data)
        })
        .catch((error)=>{
            console.error(error);
        })
    },[chapter, token])

    const reloadTickets = () =>{
        request("GET", `/team/ticketsInChapter/${chapter}`, {}, token).then((res) => {
            setTickets(res.data)
        })
        .catch((error)=>{
            console.error(error);
        })
    }

    return (
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 ,maxWidth: 1}} aria-label="simple table">
        <TableHead>
        <TableRow>
            <TableCell></TableCell>
            <TableCell>Rodzaj</TableCell>
            <TableCell>Fiszka</TableCell>
            <TableCell>Komentarz</TableCell>
            <TableCell>zgłoszone przez</TableCell>
            <TableCell></TableCell>
        </TableRow>
        </TableHead>
        <TableBody>
        {tickets?.map((row) => (
            <TicketsTableRow row={row} reloadFlashcards={reloadFlashcards} reloadTickets={reloadTickets}></TicketsTableRow>
        ))}
        </TableBody>
    </Table>
    </TableContainer>

  );
}