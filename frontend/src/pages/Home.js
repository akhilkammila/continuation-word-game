import React, {useState, useEffect} from 'react'

import {Box, Heading, Button, Image, Flex} from "@chakra-ui/react"
import {Link as RouterLink} from "react-router-dom"
import ToggleMode from './ToggleMode.js'
import Layout from './Layout.js'
import ghost from '../images/ghost.svg'

// for production, socket link is https://www.ghostwordgame.tk/
// for testing, socket link is localhost:3001

import io from 'socket.io-client'
const socket = io.connect("localhost:3001")

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
          <Flex mt="30vh" alignItems="center" justifyContent="center">
            <Heading size="2xl">ghost</Heading>
            <Image ml="2vh" w="10vh" src={ghost}></Image>
          </Flex>
          <Heading mt="4vh" size="1xl">the popular word game – now online and multiplayer!</Heading>
          <Flex mt="2vh">
              <Button m="1.5vh" as={RouterLink} to="/singleplayerselector">singleplayer</Button>
              <Button m="1.5vh" as={RouterLink} to="/multiplayerselector">multiplayer</Button>
              <Button m="1.5vh" as={RouterLink} to="/rules">rules</Button>
          </Flex>
      </Flex>
    </Layout>
  )
}

export default Home;