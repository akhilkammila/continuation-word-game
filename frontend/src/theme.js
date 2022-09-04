import { extendTheme } from "@chakra-ui/react";

const config = {
    fonts:{
        body: 'Raleway'
    },

    initialColorMode: 'dark',
    useSystemColorMode: false,
}

const theme = extendTheme({config})
export default theme