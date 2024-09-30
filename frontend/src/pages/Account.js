import { Typography, Container, Card, CardContent, Box, Divider } from "@mui/material";
import React from "react"
import { useSelector } from "react-redux";
const Account = () => {

    const loggedUser = useSelector((state)=> state.user.value)
    console.log(loggedUser)
    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Card>
            <Box sx={{ backgroundColor: 'primary.main', color: 'white', p: 2 }}>
                <Typography variant="h4" gutterBottom>
                    KONTO
                </Typography>
            </Box>
            <CardContent sx={{ p: 2 }}>
                <Box sx={{ mt: 2 }}>
                    <Typography variant="h6">
                        Login: {loggedUser.login}
                    </Typography>
                    <Typography variant="h6">
                        Email: {loggedUser.email}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    </Container>
    )
}
export default Account