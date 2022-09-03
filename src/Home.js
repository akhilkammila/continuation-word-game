import React, {useState, useEffect} from 'react'

import {Box} from "@chakra-ui/react"
import ToggleMode from './ToggleMode.js'

function Home() {

  return (
    <Box w="100%" alignItems="center" justifyContent="center">
        <ToggleMode/>
        <h1>hi</h1>
        <h1>hi</h1>
    </Box>
  )
}

export default Home;