import React, { useEffect } from 'react'
import {Box, Heading, Button, Image, Flex, Text} from "@chakra-ui/react"

const LetterDisplay = (props) => {
    let color="white"
    if(props.index>0){
        color = props.index%2==1 ? "green" : "red.600"
    }
    
    return (
        <Heading color={color} size="2xl">{props.letter}</Heading>
    )
}

export default LetterDisplay