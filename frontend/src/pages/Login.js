import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { request } from '../axiosHelper';
import { useDispatch } from 'react-redux';
import { setToken, login } from '../store';
import { useNavigate } from 'react-router-dom';
// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Login() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
   
    request("POST", `/user/login`, {
        login: data.get('login'),
        password: data.get('password')
    },"")
    .then((res)=>{
        dispatch(setToken(res.data))
        console.log(res)
        request("GET", `/user/bylogin/${data.get('login')}`, {}, res.data.token).then((res2) => {
            dispatch(login(res2.data))
            console.log(res2)
            navigate("/teams")
        })
        .catch((error)=>{
            console.error(error);
        })
    })
    .catch((error)=>{
        console.error(error);
    })
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Logowanie
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="login"
              label="Login"
              name="login"
              autoComplete="login"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Hasło"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Zaloguj się
            </Button>
            <Grid container>
              <Grid item>
                <Link to={`/register`}>
                    <Typography variant="body2">
                        Nie masz jeszcze konta? Zarejestruj się
                    </Typography>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}