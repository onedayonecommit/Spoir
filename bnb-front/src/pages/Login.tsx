import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
  } from '@chakra-ui/react';
  
  export default function Login() {
    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Sign in to your account</Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input type="email" />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input type="password" />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}>
                  {/* <Checkbox>Remember me</Checkbox> */}
                  {/* <Link color={'blue.400'}>Forgot password?</Link> */}
                  <Link color={'blue.400'} href='/signup'>Don't have account?</Link>
                </Stack>
                <Button
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}>
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }

















// import * as React from "react"
// import {
//   ChakraProvider,
//   Box,
//   Text,
//   Link,
//   VStack,
//   Code,
//   Grid,
//   theme,
//   Flex,
//   Heading,
//   Input,
//   Button,
//   useColorMode,
//   useToast,
// } from "@chakra-ui/react"



// const Login = () => {
//     const toast = useToast();

//     return (
//         <ChakraProvider theme={theme}>
//             <Flex
//             height="100vh"
//             alignItems="center"
//             justifyContent="center"
//             >
//                 <Flex direction="column" background="gray.100"
//                 p={12} rounded={6}
//                 >
//                     <Heading mb={6} textAlign="center">Log in</Heading>
//                     <Input placeholder="email" variant="filled" mb={3}
//                     type="email" bgColor="white"/>
//                     <Input placeholder="password" variant="filled"
//                     type="password" bgColor="white"/>
//                     <Button 
//                     mt={3} mb={6} bgColor="purple.200">Login</Button>
//                     <Button onClick={()=>{
//                     toast({
//                         variant:'left-accent',
//                         title: 'Tx Conformed',
//                         description: "Your Tx was Conformed : 0xa12",
//                         status:"success",
//                         duration:9000,
//                         isClosable: true
//                     })
//                     }}>darkmode</Button>
//                 </Flex>

//             </Flex>
//         </ChakraProvider>
        
//     )
// }

// export default Login;