import {
    Button,
    Container,
    Flex,
    Heading,
    Image,
    Stack,
    Text,
    useBreakpointValue,
  } from '@chakra-ui/react';
import { Canvas } from '@react-three/fiber';
import Partners from '../components/Partner';
import CardWithIllustration from '../components/Sub';
import Team from '../components/Team';
  
  export default function SplitScreen() {

    


    return (
        <>
      <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
        <Flex p={8} flex={1} align={'center'} justify={'center'}>
          <Stack spacing={6} w={'full'} maxW={'lg'}>
            <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
              <Text
                as={'span'}
                position={'relative'}
                _after={{
                  content: "''",
                  width: 'full',
                  height: useBreakpointValue({ base: '20%', md: '30%' }),
                  position: 'absolute',
                  bottom: 1,
                  left: 0,
                  bg: 'blue.400',
                  zIndex: -1,
                }}>
                Find your friends from
              </Text>
              <br />{' '}
              <Text color={'blue.400'} as={'span'}>
                a lot of Spots
              </Text>{' '}
            </Heading>
            <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
            This project is a location-based SNS that connects Web3.0 and Web2.0 <br></br>
            Find your friends and start a trip together!
            </Text>
            <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
              <Button
                rounded={'full'}
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Download App
              </Button>
              <Button rounded={'full'}>Get your NFT</Button>
            </Stack>
          </Stack>
        </Flex>
        <Flex flex={1}>
          <Image
            alt={'Login Image'}
            objectFit={'cover'}
            src={
              '/image/earth3d.png'
            }
          />
        </Flex>
      </Stack>
      <Team/>
      <CardWithIllustration/>
      <Partners/>
      </>
    );
  }