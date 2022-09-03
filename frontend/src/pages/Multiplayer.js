import React, {useState, useEffect} from 'react'
import {Box, Heading, Button, Image, Flex, Input, useToast} from "@chakra-ui/react"
import {Link as RouterLink} from "react-router-dom"
import Layout from './Layout.js'

const Multiplayer = ({room, socket}) => {
    const [formEntry, setFormEntry] = useState('')
    const [messagesReceived, setMessagesReceived] = useState(['below are the messages exchanged'])

    // SENDS THE MESSAGE TO ALL OTHER SOCKETS
    const handleSubmit = (e) =>{
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
    }, [socket])
    
    return (
        <Layout>
            {/* Every page must SIT IN A FLEXBOX OF VH 95 */}
            <Flex h="95vh" w="100%" alignItems="center" flexDirection="column" justifyContent="center">

                <Flex h="80vh" justifyContent="center" alignItems="center" flexDirection="column">
                    <Heading>Room code: {room}</Heading>

                    <form onSubmit={e => handleSubmit(e)}>
                        <Input m="1vh" onChange={(e)=> setFormEntry(e.currentTarget.value)} placeholder="enter your next letter"></Input>
                        <Input m="1vh" type="submit"></Input>
                    </form>

                    {messagesReceived.map((message)=>{
                        return <Heading>{message}</Heading>
                    })}
                </Flex>
                
                <Button as={RouterLink} to="/">Leave</Button>
            </Flex>
        </Layout>
    )
}

export default Multiplayer