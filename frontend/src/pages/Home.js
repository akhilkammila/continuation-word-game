import React, {useState, useEffect} from 'react'

import {Box, Heading, Button, Image, Flex} from "@chakra-ui/react"
import {Link as RouterLink} from "react-router-dom"
import ToggleMode from './ToggleMode.js'
import Layout from './Layout.js'

import io from 'socket.io-client'
const socket = io.connect("http://localhost:3001")

function Home() {

  const sendMessage = () => {
    // send the message TO THE SERVER
    socket.emit("send_message", {message: 'abcd'});
  }

  // LISTENS TO AN EVENT SENT BY SERVER
  useEffect(()=>{
    socket.on("receive_message", (arg)=>{
      alert(arg.message)
  })}, [socket])

  return (
    <Layout>

      {/* Every page must SIT IN A FLEXBOX OF VH 95 */}
      <Flex h="95vh" w="100%" alignItems="center" flexDirection="column">
          <Heading mt="30vh" size="2xl">ghost</Heading>
          <Heading mt="5vh" size="1xl">popular word game – now online and multiplayer!</Heading>
          <Flex>
              <Button m="3vh" as={RouterLink} to="/singleplayer">singleplayer</Button>
              <Button m="3vh" onClick={sendMessage}>multiplayer</Button>
          </Flex>
      </Flex>
    </Layout>
  )
}

export default Home;