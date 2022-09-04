import React, {useState} from 'react'

import {Box, Heading, Button, Image, Flex, Text} from "@chakra-ui/react"
import {Link as RouterLink} from "react-router-dom"
import Layout from './Layout.js'
import Singleplayer from './Singleplayer.js'

const Rules = () => {
  return (
    <Layout>
        {/* Every page needs this 95vh box */}
        <Flex h="95vh" w="100%" alignItems="center" flexDirection="column" justifyContent="center">
            <Flex h="80vh" justifyContent="center" alignItems="center" flexDirection="column">
                <Heading m="2vh">rules</Heading>

                <Flex m="2vh" alignItems="center" flexDirection="column">
                    <Heading>the best way to learn is to play the easy bot</Heading>
                </Flex>

                <Flex m="2vh" alignItems="center" flexDirection="column">
                    <Heading size="md">but just in case, here's some basic rules in small-ish font so you hopefully dont read them</Heading>
                    <Heading size="md">on your turn, enter a letter that leads to a real world</Heading>
                    <Heading size="md">whoever says the last letter of a word loses</Heading>
                </Flex>
                
                <Flex m="2vh" alignItems="center" flexDirection="column">
                    <Text fontSize="lg"> ex: the word so far is oppos, and its your turn. lets try some letters </Text>
                    <Text fontSize="lg"> z -> there is no word starting with opposz, so you lose </Text>
                    <Text fontSize="lg"> e -> oppose is a word, but you just said the last letter, so you lose </Text>
                    <Text fontSize="lg"> u -> perfect! you are building towards the word "opposum", but didn't say the last letter </Text>
                </Flex>

                <Heading size="md">have fun!</Heading>

            </Flex>

            <Button as={RouterLink} to="/">Leave</Button>
        </Flex>
    </Layout>
  )
}

export default Rules