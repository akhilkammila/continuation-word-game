import React, {useState} from 'react'

import {Box, Heading, Button, Image, Flex, Input, useToast} from "@chakra-ui/react"
import {Link as RouterLink} from "react-router-dom"
import Layout from './Layout.js'
import Multiplayer from './Multiplayer.js'

import io from 'socket.io-client'
const socket = io.connect("http://localhost:3001")

const MultiPlayerSelector= () => {
    const toast = useToast()

    const defaultName = 'Player ' + Math.floor(Math.random() * 1000)
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')
    const [inRoom, setInRoom] = useState(false)


    function joinRoom(){

        console.log('creating / joining room')
        if(room==""){
            toast({
                title: 'Failed Creating Room',
                description: 'enter a room code',
                status: 'error',
                duration: 3000,
                position: 'top',
                isClosable: true,
            })
            return
        }

        const id = name=='' ? defaultName : name;
        
        socket.emit("join_room", {room, id} )

        setInRoom(true)
    }

    if(!inRoom) return (
        <Layout>
            {/* Every page must SIT IN A FLEXBOX OF VH 95 */}
            <Flex h="95vh" w="100%" alignItems="center" flexDirection="column" justifyContent="center">
                <Flex h="80vh" justifyContent="center" alignItems="center" flexDirection="column">
                    <Heading>multiplayer menu</Heading>
                    <Flex mt="3vh" flexDirection="column" alignItems="center">
                        <Input w="50vh" m="1vh" onChange={(e)=> setName(e.currentTarget.value)} placeholder={"Enter Name (default: " + defaultName + " )"}></Input>
                        <Input w="50vh" m="1vh" onChange={(e)=> setRoom(e.currentTarget.value)} placeholder="Room Code (if creating a room, enter any code)"></Input>
                        <Flex alignItems="center">
                            <Button m="1vh" onClick={joinRoom}>Create / Join Room</Button>
                        </Flex>
                    </Flex>
                </Flex>

                <Button as={RouterLink} to="/">Leave</Button>
            </Flex>
        </Layout>
    )

    return(
        <Multiplayer room={room} socket={socket}/>
    )
}

export default MultiPlayerSelector