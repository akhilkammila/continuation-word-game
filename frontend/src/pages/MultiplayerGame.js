import React, {useState, useEffect} from 'react'
import PlayersDisplay from './PlayersDisplay.js'
import {Box, Heading, Button, Image, Flex, Text, Input, Alert, useToast} from "@chakra-ui/react"
import Layout from './Layout.js'
import MasterWordDisplay from './MasterWordDisplay.js'
import {Link as RouterLink} from "react-router-dom"
import MultiPlayerPlayersDisplay from './MultiplayerPlayersDisplay'

const MultiplayerGame = ({room, socket, players, startingLetter, name}) => {
    const toast = useToast()
    const [formEntry, setFormEntry] = useState('')
    const [masterWord, setMasterWord] = useState(startingLetter)
    const index = players.indexOf(name)
    const [turn, setTurn] = useState(0)
    const [gameOver, setGameOver] = useState(false)

    useEffect(()=>{
        socket.on("receive_letter", (letter) =>{
            setMasterWord((prevWord)=>prevWord + letter)
            setTurn((turn)=> (turn+1)%players.length)
        })
    }, [socket])

    useEffect(()=>{
        socket.on("someone_lost", (name, letter) =>{
            toast({
                title: `You Won! ${name} lost with ${letter}`,
                status: 'success',
                duration: 7000,
                position: 'top',
                isClosable: true,
            })

            setGameOver(true)

            console.log("I won lets go!")
        })
    }, [socket])

    useEffect(()=>{
        socket.on("receive_reset", (letter)=>{
            toast({
                title: "The game was reset",
                status: 'success',
                duration: 3000,
                position: 'top',
                isClosable: true,
            })

            setMasterWord(letter)
            setTurn(0)
            setGameOver(false)
        })
    })

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
            return;
        }

        if(index!=turn){
            toast({
                title: "It's not your turn",
                status: 'error',
                duration: 3000,
                position: 'top',
                isClosable: true,
            })
            return;
        }
        if(formEntry.length!=1){
            toast({
                title: "Submit one letter",
                status: 'error',
                duration: 3000,
                position: 'top',
                isClosable: true,
            })
            return;
        }

        // check if this player ended a word (lost)
        // check if theres no possible letters left (lost)
        fetch(`https://api.datamuse.com/words?sp=${masterWord + formEntry}*`)
            .then(res => res.json())
            .then(data => {
                data = data.filter(function(el)
                    {
                        return el.word.length >=5
                    }
                )
                data = data.sort((a,b) => a.word.length - b.word.length);

                // If the player ends the word OR there are no possible words left
                if(data.length==0){
                    youLost(formEntry, `Sorry, there are no 5+ letter words starting with ${masterWord+formEntry}`);
                    setGameOver(true);
                }

                else if(masterWord+formEntry === data[0].word){
                    youLost(formEntry, `Sorry, you said the last letter in ${masterWord+formEntry}`);
                    setGameOver(true)
                }

            });
        
        //normal case, word works
        socket.emit("sending_letter", room, formEntry)
        setMasterWord(prevWord => prevWord + formEntry)
        setTurn((turn)=> (turn+1)%players.length)
    }

    function youLost(formEntry, message){
        socket.emit("i_lost", room, name, formEntry)

        toast({
            title: 'You Lost',
            description: message,
            status: 'error',
            duration: 7000,
            position: 'top',
            isClosable: true,
        })
        console.log('lost :(')
    }

    function reset(){
        const letter = 'abcdefghijklmnopqrstuvwxyz'.charAt(Math.floor(Math.random() * 26))
        socket.emit("resetting", room, letter)

        setMasterWord(letter)
        setTurn(0)
        setGameOver(false)
    }

    return (
        <Layout>
            <Flex h="95vh" w="100%" alignItems="center" flexDirection="column">
                {/* Displays the Current word */}
                <Flex mt="2vh" h="70vh" w="100%" alignItems="center" flexDirection="column">
                    <Heading m="5vh">It's {players[turn]}'s turn</Heading>
                    <MasterWordDisplay masterWord={masterWord}/>
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
                    <MultiPlayerPlayersDisplay players={players}/>
                </Flex>

                {/* Button that takes you back*/}
            </Flex>
        </Layout>
    )
}

export default MultiplayerGame