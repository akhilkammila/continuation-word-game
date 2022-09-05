import React, {useState, useEffect} from 'react'
import {Box, Heading, Button, Image, Flex, Input, useToast} from "@chakra-ui/react"
import {Link as RouterLink} from "react-router-dom"
import Layout from './Layout.js'
import MultiPlayerPlayersDisplay from './MultiplayerPlayersDisplay.js'
import MultiPlayerGame from './MultiplayerGame.js'

const MultiplayerLobby = ({room, socket, name}) => {
    const toast = useToast()
    const [players, setPlayers] = useState(['not connected to backend'])
    const [gameStarted, setGameStarted] = useState(false)
    const [startingLetter, setStartingLetter] = useState('')

    // SENDS THE MESSAGE TO ALL OTHER SOCKETS
    const handleStart = () => {
        if(players.length<2){
            toast({
                title: 'Not Enough Players to Start',
                description: '2+ needed',
                status: 'error',
                duration: 3000,
                position: 'top',
                isClosable: true,
            })
            return;
        }

        const letter = 'abcdefghijklmnopqrstuvwxyz'.charAt(Math.floor(Math.random() * 26))
        setStartingLetter(letter)
        setGameStarted(()=>true)
        socket.emit("start_game", room, letter)
    }

    // LISTENS TO MESSAGES FROM OTHER SOCKETS
    useEffect(()=>{

        // In the lobby, updates the players list
        socket.on("someone_joined", (name, size, currPlayers)=>{
            setPlayers(()=>currPlayers)
        })

        // start game 
        socket.on("receive_start_game", (letter)=>{
            setStartingLetter(letter)
            setGameStarted(()=>true)

        })

    }, [socket])
    
    if(!gameStarted){
        return (
            <Layout>
                {/* Every page must SIT IN A FLEXBOX OF VH 95 */}
                <Flex h="95vh" w="100%" alignItems="center" flexDirection="column" justifyContent="center">

                    <Flex h="80vh" justifyContent="center" alignItems="center" flexDirection="column">
                        <Heading>Room code: {room}</Heading>
                        <Button m="5vh" onClick={handleStart}>Start</Button>

                        <MultiPlayerPlayersDisplay players = {players}/>
                    </Flex>
                    
                </Flex>
            </Layout>
        )
    }

    return(
        <Box>
            <MultiPlayerGame room={room} socket={socket} players={players} startingLetter={startingLetter} name ={name}/>
        </Box>
    )
}

export default MultiplayerLobby