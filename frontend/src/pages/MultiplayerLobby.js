import React, {useState, useEffect} from 'react'
import {Box, Heading, Button, Image, Flex, Input, useToast} from "@chakra-ui/react"
import {Link as RouterLink} from "react-router-dom"
import Layout from './Layout.js'
import MultiPlayerPlayersDisplay from './MultiplayerPlayersDisplay.js'

const MultiplayerLobby = ({room, socket}) => {
    const toast = useToast()
    const [formEntry, setFormEntry] = useState('')
    const [messagesReceived, setMessagesReceived] = useState(['below are the messages exchanged'])
    const [players, setPlayers] = useState(['hi'])
    const [gameStarted, setGameStarted] = useState(false)

    // SENDS THE MESSAGE TO ALL OTHER SOCKETS
    const handleStart = (e) =>{
        console.log('submitting a message')
        e.preventDefault()
        socket.emit("send_message", {formEntry, room})
    }

    // LISTENS TO MESSAGES FROM OTHER SOCKETS
    useEffect(()=>{
        console.log('I RECEIVED A MSG')
        socket.on("receive_message", (data)=>{
            setMessagesReceived(messagesReceived => messagesReceived.concat(data.formEntry))
        })

        socket.on("someone_joined", (name, size, currPlayers)=>{
            toast({
                title: name + ' Joined!',
                description: 'There are now ' + size + ' players',
                status: 'success',
                duration: 3000,
                position: 'top',
                isClosable: true,
            })

            setPlayers(()=>currPlayers)

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
}

export default MultiplayerLobby