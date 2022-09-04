import React, {useState} from 'react'

import {Box, Heading, Button, Image, Flex} from "@chakra-ui/react"
import {Link as RouterLink} from "react-router-dom"
import ToggleMode from './ToggleMode.js'
import Layout from './Layout.js'
import Singleplayer from './Singleplayer.js'

function SinglePlayerSelector() {
    const [difficulty, setDifficulty] = useState(0)

    if (difficulty===0) return (
        <Layout>
            {/* Every page must SIT IN A FLEXBOX OF VH 95 */}
            <Flex h="95vh" w="100%" alignItems="center" flexDirection="column" justifyContent="center">
                <Flex h="80vh" justifyContent="center" alignItems="center" flexDirection="column">
                    <Heading>choose a difficulty</Heading>
                    <Flex flexDirection="row">
                        <Button m="3vh" onClick={()=>setDifficulty(1)}>Easy</Button>
                        <Button m="3vh" onClick={()=>setDifficulty(2)}>Medium</Button>
                        <Button m="3vh" onClick={()=>setDifficulty(3)}>Hard</Button>
                    </Flex>
                </Flex>

                <Button as={RouterLink} to="/">Leave</Button>
            </Flex>
        </Layout>
    )

    if(difficulty===1) return(
        <Singleplayer difficulty='Easy'></Singleplayer>
    )
    if(difficulty===2) return(
        <Singleplayer difficulty='Medium'></Singleplayer>
    )
    if(difficulty===3) return(
        <Singleplayer difficulty='Hard'></Singleplayer>
    )
}

export default SinglePlayerSelector