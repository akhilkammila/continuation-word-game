import React, { useEffect } from 'react'
import {Box, Heading, Button, Image, Flex, Text} from "@chakra-ui/react"
import {IconButton, useColorMode, useColorModeValue} from '@chakra-ui/react'

const LetterDisplay = ({letter, index, numPlayers}) => {
    const colorList = ["green", "red.600", "blue.600", "orange.600", "yellow.600", "purple.600"]
    let color = useColorModeValue('black', 'white')
    if(index>0){
        console.log(numPlayers)
        color = colorList[(index-1)%numPlayers]
    }
    
    return (
        <Heading color={color} size="2xl">{letter}</Heading>
    )
}

export default LetterDisplay