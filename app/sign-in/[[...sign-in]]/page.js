import { Box, Button, Toolbar, Typography, Container, AppBar, Link } from "@mui/material";
import { SignIn } from "@clerk/nextjs";

const backgroundColor = "#101010";
const cardColor = "#1a1a1a";
const textColor = "#a3a3a3"
const borderColor = "#555";

export default function signUpPage() {
    return (
    
    <Box minHeight='100vh'sx={{backgroundColor:backgroundColor, color:textColor}}>
    <Container maxwidth="sm"> 
        <AppBar position="sticky" 
        sx={{
        backgroundColor: 'rgba(0,0,0,0.001)',
        backdropFilter: 'blur(10px)',
        borderBottom:2,
        borderColor:borderColor,
        borderRadius:0

        }}>
            <Toolbar>
                <Typography variant="h6" sx={{flexGrow:1}}>Smart Flashcards</Typography>
                <Button color="inherit">
                    <Link href="/login" passHref color='inherit' sx={{textDecoration:'none'}}>Log In</Link> 
                </Button>
                <Button color="inherit">
                    <Link href="/sign-up" passHref color='inherit'sx={{textDecoration:'none'}}>Sign Up</Link> 
                </Button>
            </Toolbar>
        </AppBar>

        <Box
        display="flex"
        flexDirection= "column"
        alignItems="center"
        justifyContent="center"
        sx={{mt:2,pb:5}}
        >
            <Typography variant="h4" gutterBottom sx={{color:'white'}}>Sign In</Typography>
            <SignIn />
        </Box>
    </Container>  
    </Box>
    )
};