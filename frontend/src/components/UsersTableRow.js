import { IconButton, Menu, MenuItem } from "@mui/material"
import React from "react"
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useSelector, useDispatch } from "react-redux";
import { request } from "../axiosHelper";
import { setCurrentTeam } from "../store";

const UsersTableRow = ({row}) =>{

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const team = useSelector((state)=> state.team.value.team)
    const token = useSelector((state)=> state.token.value.token)
    const loggedUserName = useSelector((state)=> state.user.value.login)
    const dispatch = useDispatch();
    const loggedUserRole = team.loggedUserRole

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleUserRemove = () => {
        setAnchorEl(null);
        request("DELETE", `/team/removeUser/${row.id.teamId}/${row.id.userId}`, {}, token)
        .then((res)=>{
            request("GET", `/team/${row.id.teamId}`, {}, token).then((res) => {
                dispatch(setCurrentTeam({team: res.data}))
              })
        })
        .catch((error)=>{
            console.error(error);
        })
    }
    
    const handleChangeRole = (role) => {
        setAnchorEl(null);
        request("PUT", `/team/changeUserRole`, {
            id: row.id,
            newRole: row.userTeamRole==="CZŁONEK"? "MODERATOR": "CZŁONEK"
        }, token)
        .then((res)=>{
            request("GET", `/team/${row.id.teamId}`, {}, token).then((res) => {
                dispatch(setCurrentTeam({team: res.data}))
              })
        })
        .catch((error)=>{
            console.error(error);
        })
    }

    return (
    <TableRow
        key={row.user?.login}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
        <TableCell component="th" scope="row">
            {row.user?.login}
        </TableCell>
        <TableCell align="justify" sx={{whiteSpace: 'normal',wordBreak: 'break-word', maxWidth:1}}>{row.userTeamRole}</TableCell>
        <TableCell sx={{width:0.05}}>
            <IconButton
            disabled={(loggedUserRole==="CZŁONEK" && row.user?.login!==loggedUserName) || (loggedUserRole==="MODERATOR" && row.user?.login!==loggedUserName && (row.userTeamRole==="MODERATOR" || row.userTeamRole==="ADMIN"))}
            aria-label="more"
            id="long-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleUserRemove}>Usuń użytkownika</MenuItem>
                {row.userTeamRole!=="ADMIN" && loggedUserRole==="ADMIN" &&
                (row.userTeamRole==="CZŁONEK"? <MenuItem onClick={handleChangeRole}>Zmień na moderatora</MenuItem>
                : <MenuItem onClick={handleChangeRole}>Zmień na członka</MenuItem>)}
            </Menu>
        </TableCell>
        </TableRow>
    )
}

export default UsersTableRow