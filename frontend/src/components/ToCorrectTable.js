import { Fragment, useEffect, useState } from "react"
import { TableRow, TableCell, Table, TableHead, TableBody, TableContainer, Paper,  } from "@mui/material"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { request } from "../axiosHelper"
import ToCorrectTableRow from "./ToCorrectTableRow"

export default function ToCorrectTable({reloadFlashcards}){

    const [toCorrect, setToCorrect] = useState()
    const token = useSelector((state)=> state.token.value.token)
    const { chapter } = useParams()

    useEffect(() => {
        request("GET", `/team/toCorrectByChapterAndUser/${chapter}`, {}, token).then((res) => {
            setToCorrect(res.data)
        })
        .catch((error)=>{
            console.error(error);
        })
    },[chapter, token])

    const reloadToCorrect = () =>{
        request("GET", `/team/toCorrectByChapterAndUser/${chapter}`, {}, token).then((res) => {
            setToCorrect(res.data)
        })
        .catch((error)=>{
            console.error(error);
        })
    }

    return(
        <Fragment>
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
                {toCorrect?.map((row) => (
                    <ToCorrectTableRow row={row} reloadFlashcards={reloadFlashcards} reloadToCorrect={reloadToCorrect}></ToCorrectTableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        </Fragment>
    )
}