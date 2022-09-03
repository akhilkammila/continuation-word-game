import React, {useState, useEffect} from 'react'

import {Box, Heading, Button, Image, Flex} from "@chakra-ui/react"
import ToggleMode from './ToggleMode.js'

function Home() {

  return (
    <Box h="100vh">

        {/* Remainder of the Layout */}
        <Flex h="95vh" w="100%" alignItems="center" flexDirection="column">
            <Heading mt="30vh" size="2xl">ghost</Heading>
            <Heading mt="5vh" size="1xl">popular word game – now online and multiplayer!</Heading>
            <Flex>
                <Button m="3vh">singleplayer</Button>
                <Button m="3vh">multiplayer</Button>
            </Flex>
        </Flex>

        {/* Toggle Theme Button */}
        <Box h="5vh" w="100%" alignItems="center" justifyContent="right">
            <ToggleMode/>
        </Box>
    </Box>
  )
}

export default Home;