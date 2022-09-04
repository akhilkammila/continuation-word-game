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

    useEffect(()=>{
        socket.on("receive_letter", (letter) =>{
            setMasterWord((prevWord)=>prevWord + letter)
            setTurn((turn)=> (turn+1)%players.length)
        })
    }, socket)

    function handleSubmit(e){
        e.preventDefault()
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

        socket.emit("sending_letter", room, formEntry)
        setMasterWord(prevWord => prevWord + formEntry)
        setTurn((turn)=> (turn+1)%players.length)
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
        setMasterWord('')
    }

    return (
        <Layout>
            <Flex h="95vh" w="100%" alignItems="center" flexDirection="column">
                {/* Displays the Current word */}
                <Heading>It's {players[turn]}'s turn</Heading>
                <Heading>{turn}</Heading>
                <Flex mt="10vh" h="70vh" w="100%" alignItems="center" flexDirection="column">
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