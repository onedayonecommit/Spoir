import * as React from "react"
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  Flex,
  Heading,
  Input,
  Button,
  useColorMode,
  useToast,
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import { Logo } from "./Logo"
import { Route, Router, Routes } from "react-router-dom"
import Main from "./pages/Main"
import Login from "./pages/Login"
import Layout from "./components/layout/Layout"
import WithSubnavigation from "./components/layout/Layout"
import LargeWithAppLinksAndSocial from "./components/layout/Footer"
import SimpleCard from "./pages/Login"
import SignupCard from "./pages/Signup"
import NotFound from "./pages/NotFound"

export const App = () => {

  // const { toggleColorMode } = useColorMode();
  //https://app.gitbook.com/invite/DKAOXHQNPZDQ4vTCfBcu/1wDfTDmfglh2vtTT4ZDj
  //깃북 초대링크

  return(
  <ChakraProvider theme={theme}>  
    <WithSubnavigation />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<SignupCard/>} />
        <Route path={"*"} element={<NotFound/>}/>

      </Routes>
    <LargeWithAppLinksAndSocial />
   </ChakraProvider>

  )

  
}

