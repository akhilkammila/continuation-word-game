import React from 'react'
import {Box, Heading, Button, Image, Flex} from "@chakra-ui/react"
import ToggleMode from './ToggleMode.js'

// This is the background of every page, which is basically just the toggle theme button at the bottom
function Layout({children}) {
    return (
    <Box h="100vh">
        {/* Remainder of the Layout */}
        {children}

        {/* Toggle Theme Button */}
        <Box h="5vh" w="100%" alignItems="center" justifyContent="right">
            <ToggleMode/>
        </Box>
    </Box>
    )
}

export default Layout