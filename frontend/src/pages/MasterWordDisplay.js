import React, { useEffect, useState } from 'react'
import {Box, Heading, Button, Image, Flex, Text} from "@chakra-ui/react"
import LetterDisplay from './LetterDisplay'

const MasterWordDisplay = ({masterWord}) => {

    const lettersArray = masterWord.split("")
    
    return(
        <Flex flexDirection="column" alignItems="center">
            {lettersArray.map((letter, index)=>{
                return <LetterDisplay letter={letter} index={index}></LetterDisplay>
            })}
        </Flex>
        
    )

}

export default MasterWordDisplay