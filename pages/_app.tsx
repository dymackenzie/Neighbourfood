import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import "../styles/font.css"

// extend the theme to include font sizes and fonts
const theme = extendTheme({
  fontSizes: {
    h1: "63px",
    h2: "40px",
    h3: "30px",
    h4: "20px",
    h5: "20px",
    h6: "15px",
    button: "13px",
    body: "13px"
  },
  fonts: {
    heading: `"roboto"`,
    body: `"roboto"`
  },
  colors: {
    gray1: "#606060"
  }
})

export default function App({ Component, pageProps }: AppProps) {
  return (
  <ChakraProvider theme={theme}>
    <Navbar/>
    <Component {...pageProps} />
  </ChakraProvider>
  )
}
