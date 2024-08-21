'use client'
import {useUser} from '@clerk/nextjs'
import {useEffect, useState} from 'react'
import {collection, doc, getDoc, setDoc} from 'firebase/firestore'
import {db} from '@/firebase'
import { useRouter } from 'next/navigation'
import {Container, Grid, Card, CardActionArea, CardContent, Typography,Box} from '@mui/material'


const backgroundColor = "#101010";
const cardColor = "#1a1a1a";
const textColor = "#a3a3a3"
const borderColor = "#555";

export default function Flashcards() {
    const {isLoaded, isSignedIn, user} = useUser()
    const [flashcards, setFlashcards] = useState([])
    const router = useRouter()

    useEffect(() => {
        async function getFlashcards() {
            if (!user) return
            const docRef = doc(collection(db, 'users'),user.id)
            const docSnap = await getDoc(docRef)

            if (docSnap.exists()) {
                const collections = docSnap.data().flashcards || []
                
                setFlashcards(collections)
                } else {
                await setDoc(docRef, {flashcards: []})
                }
        }   
        getFlashcards()
    },[user])

        if (!isLoaded || !isSignedIn) {
            return <></>
        }
        const handleCardClick = (id) => {
            router.push(`/flashcard?id=${id}`)
        }

        return (
        <Box sx={{backgroundColor:backgroundColor, minHeight:'100vh'}}>
        <Container maxWidth='100vw'>
            <Grid container spacing={3} sx={{mt:4}}>
                {flashcards.map((flashcard, index)=>(
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card sx={{backgroundColor:cardColor,border:'1px solid', borderColor:borderColor,color:textColor}}>
                            <CardActionArea onClick={()=> {
                                handleCardClick(flashcard.name)
                            }}
                                ><CardContent>
                                    <Typography variant='h6'>
                                        {flashcard.name}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>   
        </Container>
        </Box>
    )
    }