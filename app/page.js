
import getStripe from "@/utils/get-stripe";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button, Toolbar, Typography, Container, AppBar, Box, Grid} from "@mui/material";
import Head from "next/head";



const backgroundColor = "#101010";
const cardColor = "#1a1a1a";
const textColor = "#a3a3a3"
const borderColor = "#555";

export default function Home() {
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

          {/* Pricing Section*/}
          <Box sx={{mt:6, textAlign:'center'}}>
            <Typography variant="h4"sx={{color:'white',pt:10,}}>Pricing</Typography>
            <Grid container spacing={2} sx={{mt:5}}>

              <Grid item xs={12} md={4}>

                <Box sx={{border: 'solid 1px',borderRadius:4, p: 2,backgroundColor:cardColor}}>
                  <Typography variant="h6">Basic</Typography>
                  <Typography>
                    {''}
                    Access to basic features and limited flashcards
                  </Typography>
                  <Typography variant="h6">$9.99/month</Typography>
                  <Button variant="contained" bgcolor="primary" sx={{mt:2}}>Choose Plan</Button>
                </Box>
              </Grid>

              <Grid item xs={12} md={4}>
                <Box sx={{border: 'solid 1px', p: 2,borderRadius:4, p: 2,backgroundColor:cardColor}}>
                  <Typography variant="h6">Pro</Typography>
                  <Typography>
                    {''}
                    Access to unlimited flashcards and storage
                  </Typography>
                  <Typography variant="h6">$19.99/month</Typography>
                  <Button variant="contained" bgcolor="primary" sx={{mt:2}}>Choose Plan</Button>
                </Box>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Box sx={{border: 'solid 1px', p: 2,borderRadius:4, p: 2,backgroundColor:cardColor}}>
                  <Typography variant="h6">Enterprise</Typography>
                  <Typography>
                    {''}
                    Customized plan for your organization
                  </Typography>
                  <Typography variant="h6">Contact us</Typography>
                  <Button variant="contained" bgcolor="primary" sx={{mt:2}}>Contact</Button>
                </Box>
              </Grid>
            </Grid>

            <Box sx={{mt:6}}>
              <Typography>Footer</Typography>
          </Box>
          </Box>

      </Container>
    </Box>
  );
}
