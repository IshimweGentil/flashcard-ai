'use client'
import getStripe from "@/utils/get-stripe";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button, Toolbar, Typography, Container, AppBar, Box, Grid, Card, CardContent} from "@mui/material";
import Head from "next/head";


const backgroundColor = "#101010";
const cardColor = "#1a1a1a";
const textColor = "#a3a3a3"
const borderColor = "#555";

export default function Home() {

  const handleSubmit = async () => {
    const checkoutSession = await fetch('/api/checkout_session', {
      method: 'POST',
      headers: {
        origin: 'http://localhost:3000', // Make sure to change this to your live domain
      },
    });
    
      const checkoutSessionJson = await checkoutSession.json();

      if (checkoutSessionJson.statusCode === 500) {
        console.error(checkoutSessionJson.message);
        return;
      }
      const stripe = await getStripe();
      const { error } = await stripe.redirectToCheckout({
        sessionId: checkoutSessionJson.id,
      });

      if (error) {
        console.warn(error.message);
      }
    }

  return (
  <Box minHeight='100vh'sx={{backgroundColor:backgroundColor, color:textColor}}> {/* Apply background color and ensure it covers the full height */}
    
    <Container > 

      <Head>
        <title>Flashcard Generator</title> 
        <meta name = "description" content = "Generate flashcards from your notes"/>
      </Head>

      {/* Navbar Section*/}
      <AppBar position="sticky" 
      sx={{
        backgroundColor: 'rgba(0,0,0,0.001)',
        backdropFilter: 'blur(10px)',
        borderBottom:2,
        borderColor:borderColor,
        borderRadius:0

        }}>
        <Toolbar >
          <Typography variant= "h6" style={{flexGrow:1}}>
          Smart Flashcards
          </Typography>
          <SignedOut>
            <Button color="inherit" href="sign-in">Log In</Button>
            <Button color="inherit"href="sign-up">Sign Up</Button>
          </SignedOut>
          </Toolbar>
        </AppBar>

        {/* Main text / Hero section */}
        <Box sx={{textAlign:'center',pt:10 }}>
          <Typography variant="h3"sx={{color:'white'}} gutterBottom>Transform Your Notes into <br/> <b>Smart Flashcards</b></Typography>
          <Typography variant="h6" sx={{color:textColor,mt:2}}>
            By automating flashcard creation, you can focus more on learning and less on organizing, 
            <br/>leading to increased productivity and more efficient studying.
            </Typography>
            
          <Button variant="contained" bgcolor="primary" sx={{mt:2}}>Get Started for Free</Button>
        </Box>

        {/* Features */}
        <Box sx={{mt:6, textAlign:'center',pt:10}}>
          <Typography variant="h4" sx={{color:'white'}} gutterBottom>Features</Typography>
          <Grid container spacing = {4}>
             <Grid item xs={12} md={4}>
              <Typography variant="h6" >Content Generation</Typography>
              <Typography sx={{color:textColor}}gutterBottom> 
                {''}
                Generate flashcards based on a given topic or subject.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6"gutterBottom>Customization</Typography>
              <Typography> 
                {''}
                Allow users to customize the format, style, and content of flashcards.
              </Typography>
              </Grid>
             <Grid item xs={12} md={4}>
              <Typography variant="h6"gutterBottom>Interactive Learning</Typography>
              <Typography> 
                {''}
                Provide interactive features to enhance the learning experience.
              </Typography>
            </Grid>
            </Grid>
          </Box>

          {/* Pricing Section */}
        <Box sx={{ mt: 6, textAlign: 'center' }}>
          <Typography variant="h4" sx={{ color: 'white', pt: 10 }}>Pricing</Typography>
          <Grid container spacing={3} sx={{ mt: 5, justifyContent: 'center' }}>
            {/* Basic Plan */}
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ backgroundColor: cardColor, border: '1px solid', borderColor: borderColor, height:'250px' }}>
                <CardContent sx={{ borderRadius: '8px', textAlign: 'center' }}>
                  <Typography variant="h4"sx={{ color: textColor }}>Basic</Typography>
                  <Typography variant="h2"sx={{ color: 'white' }}>Free</Typography>
                  <Button variant="contained" sx={{ mt: 2 }}>Choose Plan</Button>
                </CardContent>
              </Card>
            </Grid>
            {/* Pro Plan */}
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ backgroundColor: cardColor, border: '1px solid', borderColor: borderColor, height:'250px' }}>
                <CardContent sx={{ borderRadius: '8px', textAlign: 'center' }}>
                  <Typography variant="h4"sx={{ color: textColor }}>Pro</Typography>
                  
                  <Typography variant="h2"sx={{ color: 'white' }}>$20</Typography><Typography variant="body2"sx={{ color: textColor }}>Billed Monthly</Typography>
                  <Button variant="contained" sx={{ mt: 2 }} onClick={handleSubmit} >Choose Plan</Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

            {/* Footer */}
            <Box sx={{ mt: 10, py: 4, backgroundColor: cardColor, textAlign: 'center' }}>
              <Typography variant="body1" sx={{ color: 'white' }}>
                © {new Date().getFullYear()} Ishimwe Gentil. All rights reserved.
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Button sx={{ color: 'white', mx: 1 }}>Privacy Policy</Button>
                <Button sx={{ color: 'white', mx: 1 }}>Terms of Service</Button>
                <Button sx={{ color: 'white', mx: 1 }}>Contact Us</Button>
              </Box>
            </Box>
          </Box>
      </Container>
    </Box>
  );
}
