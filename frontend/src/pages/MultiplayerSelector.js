import React, {useState} from 'react'

import {Box, Heading, Button, Image, Flex, Input} from "@chakra-ui/react"
import {Link as RouterLink} from "react-router-dom"
import ToggleMode from './ToggleMode.js'
import Layout from './Layout.js'
import Singleplayer from './Singleplayer.js'

const MultiPlayerSelector= () => {
    const [name, setName] = useState('Player ' + Math.floor(Math.random() * 1000))
    const [room, setRoom] = useState('Player ' + Math.floor(Math.random() * 1000))

    function createRoom(e){
        console.log('creating room')
    }

    function joinRoom(e){
        console.log('joining room')
    }

    return (
        <Layout>
            {/* Every page must SIT IN A FLEXBOX OF VH 95 */}
            <Flex h="95vh" w="100%" alignItems="center" flexDirection="column" justifyContent="center">
                <Flex h="80vh" justifyContent="center" alignItems="center" flexDirection="column">
                    <Heading>multiplayer menu</Heading>
                    <Flex mt="3vh" flexDirection="column" alignItems="center">
                        <Input m="1vh" onChange={(e)=> setName(e.currentTarget.value)} placeholder={"Enter Name (default: " + name + " )"}></Input>
                        <Input m="1vh" onChange={(e)=> setRoom(e.currentTarget.value)} placeholder="Create / Join Room Code"></Input>
                        <Flex alignItems="center">
                            <Button m="1vh" onClick={createRoom}>Create Room</Button>
                            <Button m="1vh" onClick={joinRoom}>Join Room</Button>
                        </Flex>
                    </Flex>
                </Flex>

                <Button as={RouterLink} to="/">Leave</Button>
            </Flex>
        </Layout>
    )
}

export default MultiPlayerSelector