import React from 'react'
import {Box, Heading, Button, Image, Flex, Text, Input} from "@chakra-ui/react"

const MultiPlayerPlayersDisplay = ({players}) => {
    const colors = ["green", "red.600", "blue.600", "orange.600", "yellow.600", "purple.600"]
    return (
        <Flex flexDirection="row">
            {players.map((player, index)=>{
                return <Heading m="2vh" color={colors[index]}>{player}</Heading>
            })}
        </Flex>
    )
}

export default MultiPlayerPlayersDisplay