import React, {useState, useEffect} from 'react'
import PlayersDisplay from './PlayersDisplay.js'
import {Box, Heading, Button, Image, Flex, Text, Input, Alert, useToast} from "@chakra-ui/react"
import Layout from './Layout.js'
import MasterWordDisplay from './MasterWordDisplay.js'
import {Link as RouterLink} from "react-router-dom"

const Singleplayer = ({difficulty}) => {
    const toast = useToast()
    const startingLetters = 'abcdefghijklmnopqrstuvwxyz'
    const [formEntry, setFormEntry] = useState('')
    const [masterWord, setMasterWord] = useState(startingLetters.charAt(Math.floor(Math.random() * 
    startingLetters.length)))

    useEffect(()=>{
        console.log(masterWord)
    })

    function handleSubmit(e){
        e.preventDefault()
        if(formEntry.length!=1) return;

        console.log('submitted your letter')


        fetch(`https://api.datamuse.com/words?sp=${masterWord + formEntry}*`)
            .then(res => res.json())
            .then(data => {
                data = data.filter(function(el)
                    {
                        return el.word.length >=5
                    }
                )
                data = data.sort((a,b) => a.word.length - b.word.length);

                const computerData = data = data.filter(function(el)
                    {
                        return el.word.length%2==0
                    }
                )

                console.log(data);
                console.log('just fetched api 2')

                // If the player ends the word OR there are no possible words left
                if(data.length==0){
                    youLost(`Sorry, there are no 5+ letter words starting with ${masterWord+formEntry}`)
                    setMasterWord(prevVal => prevVal + formEntry)
                    return
                }

                if(masterWord+formEntry === data[0].word){
                    youLost(`Sorry, you said the last letter in ${masterWord+formEntry}`)
                    setMasterWord(prevVal => prevVal + formEntry)
                    return
                }

                if(computerData.length==0){
                    youWon(`After ${masterWord+formEntry}, the computer has no winning words to play`)
                    return
                }

                //Computer plays their letter
                const computerLetter = computerData[0].word[masterWord.length+1]

                //Filter the data to only words that continue with computer's letter
                data = data.filter(function(el)
                    {
                        return el.word[masterWord.length+1] == computerLetter
                    }
                )

                if (data[0].word==masterWord + formEntry + computerLetter){
                    youWon(`The computer said ${computerLetter}, ending the word ${masterWord + formEntry + computerLetter}`)
                }

                setMasterWord(prevVal => prevVal + formEntry + computerLetter)


        });
    }

    function youWon(message){
        toast({
            title: 'YOU WON!',
            description: message,
            status: 'success',
            duration: 3000,
            position: 'top',
            isClosable: true,
        })
    }

    function youLost(message){
        toast({
            title: 'You Lost',
            description: message,
            status: 'error',
            duration: 3000,
            position: 'top',
            isClosable: true,
        })
    }

    function reset(){
        setMasterWord(startingLetters.charAt(Math.floor(Math.random() * startingLetters.length)))
    }

    return (
        <Layout>
            <Flex h="95vh" w="100%" alignItems="center" flexDirection="column">
                {/* Displays the Current word */}
                <Flex mt="10vh" h="70vh" w="100%" alignItems="center" flexDirection="column">
                    <MasterWordDisplay masterWord={masterWord}/>
                </Flex>

                <Flex>
                    <form onSubmit={e => handleSubmit(e)}>
                        <Input onChange={(e)=> setFormEntry(e.currentTarget.value)}></Input>
                        <Input type="submit"></Input>
                    </form>
                </Flex>

                <Flex mt="5vh" flexDirection="row">
                    <Button onClick={()=>reset()}>
                        Reset
                    </Button>

                    <Button ml="3vh" as={RouterLink} to="/">
                        Leave
                    </Button>
                </Flex>

                {/* Shows "You" and "Computer" at the bottom*/}
                <Flex h="15vh" w="100%" alignItems="center" flexDirection="column">
                    <PlayersDisplay difficulty={difficulty}/>
                </Flex>

                {/* Button that takes you back*/}
            </Flex>
        </Layout>
    )
}

export default Singleplayer