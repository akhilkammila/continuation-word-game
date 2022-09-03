import React from 'react'
import {Box, Heading, Button, Image, Flex, Text, Input} from "@chakra-ui/react"

const PlayersDisplay = () => {

    return (
        <Flex flexDirection="row">
            <Flex m="5vh" flexDirection="column" alignItems="center">
                <Heading color="green">You</Heading>
            </Flex>
            <Flex m="5vh" flexDirection="column" alignItems="center">
                <Heading color="red.600">Bot</Heading>
            </Flex>
        </Flex>
    )
}

export default PlayersDisplay