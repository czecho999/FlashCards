import { Typography, Container, Button, Box } from "@mui/material"
import { Link } from "react-router-dom"

const Home = () => {
    return (
    <Container>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
        <Typography>
            Ta strona pozwala tworzyć fiszki wraz ze znajomymi. Podzielcie się ich tworzeniem i wspólnie korzystajcie z wszystkich!
        </Typography>
        <Link to={`/login`}>
            <Button variant="contained">
               Zaloguj się
            </Button>
        </Link>
        <Link to={`/register`}>
            <Typography variant="body2">
                Nie masz jeszcze konta? Zarejestruj się
            </Typography>
        </Link>
        </Box>
    </Container>
    )
}
export default Home