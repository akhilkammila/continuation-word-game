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
    const [gameOver, setGameOver] = useState(false)

    function handleSubmit(e){
        e.preventDefault()
        if(gameOver){
            toast({
                title: "Game is Over. Please Reset!",
                status: 'error',
                duration: 3000,
                position: 'top',
                isClosable: true,
            })
        }

        if(formEntry.length!=1) return;

        // console.log('submitted your letter')


        fetch(`https://api.datamuse.com/words?sp=${masterWord + formEntry}*-123456789 `)
            .then(res => res.json())
            .then(data => {
                data = data.filter(function(el)
                    {
                        return el.word.length >=5 && !el.word.includes(" ")
                    }
                )
                data = data.sort((a,b) => a.word.length - b.word.length);

                console.log('in case you need some help')
                console.log('and no, this isnt available in multiplayer')
                console.log(data)

                const computerData = data.filter(function(el)
                    {
                        if(difficulty==='Easy'){
                            return el.word.length%2===1
                        }
                        if(difficulty==='Hard'){
                            return el.word.length%2===0
                        }
                        return data.length===0 || !el.word.includes(data[0].word)
                    }
                )

                // console.log('after filter')
                // console.log(computerData);
                

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
                //first word in the list if easy or hard
                //random word if medium

                // console.log(computerData.length)

                let computerLetter = computerData[0].word[masterWord.length+1]

                if(difficulty==='Medium'){
                    // console.log('runing medium')
                    computerLetter = computerData[Math.floor(Math.random() * computerData.length/2 + computerData.length/2)].word[masterWord.length+1]
                }

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

        setGameOver(true)
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

        setGameOver(true)
    }

    function reset(){
        setMasterWord(startingLetters.charAt(Math.floor(Math.random() * startingLetters.length)))
        setGameOver(false)
    }

    return (
        <Layout>
            <Flex h="95vh" w="100%" alignItems="center" flexDirection="column">
                {/* Displays the Current word */}
                <Flex mt="10vh" h="70vh" w="100%" alignItems="center" flexDirection="column">
                    <MasterWordDisplay masterWord={masterWord} numPlayers={2}/>
                </Flex>

                <Flex>
                    <form onSubmit={e => handleSubmit(e)}>
                        <Input onChange={(e)=> setFormEntry(e.currentTarget.value)} placeholder="enter your next letter"></Input>
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