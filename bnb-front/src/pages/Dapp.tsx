import { Button, Flex, Grid, Image, Text } from '@chakra-ui/react';
import axios from 'axios';
import useGeolocation, { useWallet, useWeb3 } from '../hooks';
import React, { FC, useEffect, useState } from 'react'
import SimpleSidebar from '../components/layout/SideBar';

const Dapp  = () => {
  const [myNftArray, setMyNftArray] = useState<any[]>();
    // const [balance, setBalance] = useState<any>();
    const { account, getAccount } = useWallet();
    const onClickWallet = () => {
      getAccount();
    };
    
    const { mintContract, claimContract } = useWeb3();
    const location = useGeolocation();
    const [message, setMessage] = useState<String>('');

    const getMyNfts = async () => {
      try {
        const balanceLength = await mintContract.methods.balanceOf(account).call();
        console.log("balanceLegnth", balanceLength)
        const tmpMyNftArray: any[] = [];
  
        for(let i = 0; i< parseInt(balanceLength, 10); i++) {
          const nftTokenId = await mintContract.methods.tokenOfOwnerByIndex(account, i).call();
          const myMetaDataURI = await mintContract.methods.metadataURIs(nftTokenId).call();
          console.log('myMetadataURI ' + i + " : " + myMetaDataURI);
          await axios.get(myMetaDataURI)
          .then((response) => {
            tmpMyNftArray.push('https://ipfs.io/ipfs/'+response.data.image.substring(7, response.data.image.length))
          })
        }
        setMyNftArray(tmpMyNftArray);
      }catch(err) {
        console.error(err);
      }
    }

    const onClickClaim = async() => {
      try {
        const response = 
        await claimContract.methods.claim(
          Math.floor(location.coordinates.lat*100), Math.floor(location.coordinates.lng*100))
            .send({ from: account })
            console.log(response)
            // setMessage('Success')
            if(response.status) {
              alert('100 $TOPS 클레임 완료!')
              // const balanceLength = await claimContract.methods
              // .balanceOf(account)
              // .call();
              // setBalance(balanceLength)
              
          }
      }catch(err) {
        console.error(err)
      }
    }

 
    const onClickMint = async() => {
        try {
            if(!account) return;

            const response = await mintContract.methods.mintNFT()
            .send({ from: account })
            console.log(response)

            if(response.status) {
                alert('민팅 완료');
                const balanceLength = await mintContract.methods
                .balanceOf(account)
                .call();

                const nftTokenId = await mintContract.methods
                .tokenOfOwnerByIndex(account, parseInt(balanceLength.length, 10)-1).call();
                
            }

        }catch(err) {
            console.log(err)
        }
    }

    

    return (
        
        <SimpleSidebar>
        <Flex
        //   minH="100vh"
          justifyContent="center"
          alignItems="center"
          pt={24}
          flexDir="column"
        >
          
              
            {account ? 
            <div>
                {/* <Text mb={8} fontWeight="bold" fontSize="4xl"> */}
                <Text>Your Account : {account}</Text>
                {/* <Text>$TOPS Balance : {balance}</Text> */}
                <Text>민팅하고 같이 여행을 떠나요!</Text>
                <Button onClick={onClickMint}>Mint</Button>
                <br></br>
                {/* </Text> */}
                <Button onClick={onClickClaim} disabled={!location.loaded} mt={10}>Claim</Button>
                <Text>{message}</Text>
                <div>
                {location.loaded
                    ? "위도 : "+location.coordinates?.lat + " 경도 : " + location.coordinates?.lng
                : "GPS 미확인"}
                
                </div>
                
                
            </div>
            :
            <div>
                <Text>지갑을 먼저 연결하세요!</Text>
                <Button onClick={onClickWallet}>Connect Wallet</Button>
            </div>}
            {/* <Grid templateColumns="repeat(4, 1fr)" gap={8}>
                
            </Grid> */}
        
        
      </Flex>
          </SimpleSidebar>
    )
}

export default Dapp;