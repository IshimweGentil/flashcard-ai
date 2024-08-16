'use client'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { writeBatch, doc, collection, getDoc } from 'firebase/firestore' 
import { Box, Typography, Container, AppBar, Toolbar, Button, Paper, TextField, Grid, CardActionArea, DialogTitle, DialogContent, DialogActions, Dialog, DialogContentText, Card, CardContent } from '@mui/material'
import {Link} from 'next/link'

const backgroundColor = "#101010";
const cardColor = "#1a1a1a";
const textColor = "#a3a3a3"
const borderColor = "#555";

export default function Generate() {
    const {isLoaded, isSignedIn, user} = useUser();
    const [flashcards, setFlashcards] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const [text, setText] = useState('');
    const [name, setName] = useState('');
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const handleSubmit = async () => {
        fetch('/api/generate', {
            method: 'POST',
            body: text,
        }) 
        .then((res) => res.json())
        .then((data) => setFlashcards(data))
}       
    const handleCardClick = (id) =>{
        setFlipped((prev) => ({
            ...prev,
            [id]: !prev[id],
        }))
}
    const handleOpen = () => {
        setOpen(true);
}
    const handleClose = () => {
        setOpen(false);
}
    const saveFlashcards = async () => {
        if (!name) {
            alert('Please enter a name')
            return
        }
        const batch = writeBatch(db)
        const userDocRef = doc(collection(db,'users'),user.id)
        const docSnap = await getDoc(userDocRef)

        if (docSnap.exists()) {
            const collections = docSnap.data().flashcards || []
            if (collections.find((f) => f.name === name)) {
                alert("flashcard collection with the same name already exists.")
                return
            }   else {
                collections.push({name})
                batch.set(userDocRef,{flashcards: collections},{merge: true})
            }
        }   else {
            batch.set(userDocRef,{flashcards: [{name}]})
        }
            const colRef = collection(userDocRef, name)
            flashcards.forEach((flashcard) => {
                const cardDocRef = doc(colRef)
                batch.set(cardDocRef, flashcard)
            })
            await batch.commit()
            handleClose()
            router.push('/flashcards')
    }
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
                    <Link href="/login" passHref color='inherit'>Log In</Link> 
                </Button>
                <Button color="inherit">
                    <Link href="/signup" passHref color='inherit'>Sign Up</Link> 
                </Button>
            </Toolbar>
        </AppBar>


    <Container maxWidht="md">
        <Box sx={{
            mt:4,
            mb:6,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            
            }}>
        <Typography variant="h4" sx={{color:'white'}}gutterBottom>Generate Flashcards</Typography>
        <Paper sx={{p:4, width: '100%',backgroundColor: cardColor,border:'1px solid', borderColor:borderColor}}>
        <TextField 
    
        value = {text} 
        onChange={(e) => setText(e.target.value)} 
        label="Enter your notes here" 
        multiline 
        rows={4} 
        variant="outlined" 
        fullWidth
        sx={{
            minHeight:'150px',
            mb: 2,
            '& .MuiOutlinedInput-root': {
                '& fieldset': {
                    borderColor: cardColor,
                },
                '&:hover fieldset': {
                    borderColor: cardColor,
                },
                '&.Mui-focused fieldset': {
                    borderColor: cardColor,
                },
            },
            '& .MuiInputLabel-root': {
                color: textColor,
            },
        }}
        InputProps={{
            style: { color: textColor }
        }}
        InputLabelProps={{
            style: { color: textColor }
        }}/>
        <Button 
        variant="contained" 
        color="primary" 
        onClick={handleSubmit} 
        fullWidth>
            {' '}
            Generate
        </Button>
        </Paper>
        
        {flashcards.length > 0 && (
            <Box sx={{mt:4}}>
                <Typography variant="h5" sx={{color: textColor}}>Flashcard Preview</Typography>
                <Grid container spacing = {3}>
                    {flashcards.map((flashcard, index) => (
                        <Grid item xs={12} sm={6} md={4} key = {index}>
                            <Card>
                                <CardActionArea onClick={() => {
                                    handleCardClick(index)
                                }}>
                                    <CardContent>
                                        <Box
                                        sx={{
                                            perspective:'1000px',
                                            '& > div': {
                                                transition: 'transform 0.6s',
                                                transformStyle: 'preserve-3d',
                                                position: 'relative',
                                                width: '100%',
                                                height: '200px',
                                                boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                                                transform: flipped[index] ? 'rotateY(180deg)' : 'rotateY(0deg)',
                                            },
                                            '& > div > div': {
                                               position: 'absolute',
                                                width: '100%',
                                                height: '100%',
                                                backfaceVisibility: 'hidden',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                padding: 2,
                                                boxSizing: 'border-box',
                                            },
                                            '& > div > div:nth-of-type(2)': {
                                            transition: 'transform 0.6s',
                                                transform: 'rotateY(180deg)',
                                            },
                                        }}>
                                            <div>
                                                <div>
                                                    <Typography variant="h5" component ="div"sx={{color: textColor}}>
                                                        {flashcard.front}
                                                        </Typography>
                                                    </div>
                                                </div>
                                                <div>
                                                    <Typography variant="h5" component ="div"sx={{color: textColor}}>
                                                        {flashcard.back}
                                                        </Typography>
                                                </div>
                                            </Box>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <Box sx={{mt:4, display:"flex", justifyContent:"center"}}>
                    <Button variant="contained" color="primary" onClick={handleOpen}>
                        Save
                    </Button>
                </Box>
            </Box>
        )}
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Save Flashcards</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please enter a name for your flashcard collection
                </DialogContentText>
                <TextField 
                autoFocus
                margin='dense'
                label='Collection Name'
                type='text'
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                variant='outlined'
                 />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={saveFlashcards}>Save</Button>  
            </DialogActions>
        </Dialog>

    </Box>
    
    </Container>
    </Container>
    </Box>
    )
}