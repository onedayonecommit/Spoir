import { useEffect, useRef, useState } from "react";
import Web3 from "web3";
import { MINT_NFT_ABI, MINT_NFT_CONTRACT, CLAIM_CONTRACT, CLAIM_ABI } from "../web3.config";

export const useObserve = () => {
  const [isObserved, setIsObserved] = useState<boolean>(false);

  const dom = useRef<HTMLDivElement>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  const observe = () => {
    if (dom.current) {
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) setIsObserved(true);
        else setIsObserved(false);
      });
      observer.current.observe(dom.current);

      return () => observer.current && observer.current.disconnect;
    }
  };

  useEffect(() => {
    observe();
  }, [dom]);

  return { isObserved, dom };
};

export const useWallet = () => {
  const [account, setAccount] = useState<string>("");

  const addBnbTestNet = async() => {
    try {
        await window.ethereum.request({
            mothod: 'wallet_addEthereumChain',
            params: [
                {
                    chainId: '0x61',
                    chainName: 'Smart Chain - Testnet',
                    nativeCurrency: {
                        name: 'tBNB',
                        symbol: 'tBNB',
                        decimals: 18
                    },
                    rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545'],
                    blockExplorerUrls: ['https:/testnet.bscscan.com'],
                },
            ],
        });
    } catch( err : any ) {
        console.error("network adding error - ", err)
    }
}

  const switchChainToBnb = async() => {
    try {
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x61' }],
        });
    } catch (err : any) {
        console.error(err)
        // 4092에러 : 네트워크 없음
        if (err.code === 4902) addBnbTestNet();
    }
  }

  const getAccount = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        // setAccount(accounts[0]);
        //커스텀
        if(window.ethereum.chainId === '0x61' || window.ethereum.chainId === 97) {
          setAccount(accounts[0]);
        }else {
          switchChainToBnb();
        }
      } else {
        alert("Install MetaMask!!!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { account, getAccount };
};

export const useWeb3 = () => {
  const [web3, setWeb3] = useState<any>();
  const [mintContract, setMintContract] = useState<any>();
  const [claimContract, setClaimContract] = useState<any>();

  useEffect(() => {
    if (!window.ethereum) return;

    setWeb3(new Web3(window.ethereum));
  }, []);
  useEffect(() => {
    if (!web3) return;

    setMintContract(new web3.eth.Contract(MINT_NFT_ABI, MINT_NFT_CONTRACT));
    setClaimContract(new web3.eth.Contract(CLAIM_ABI, CLAIM_CONTRACT));
  }, [web3]);

  return { web3, mintContract, claimContract };
};



interface locationType {
  loaded: boolean;
  coordinates: { lat: number; lng: number };
  error?: { code: number; message: string };
}

export const useGeolocation = () => {
  const [location, setLocation] = useState<locationType>({
    loaded: false,
    coordinates: { lat: 0, lng: 0, }
  })

  // 성공에 대한 로직
  const onSuccess = (location: { coords: { latitude: number; longitude: number; }; }) => {
    setLocation({
      loaded: true,
      coordinates: {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      }
    })
  }

  // 에러에 대한 로직
  const onError = (error: { code: number; message: string; }) => {
    setLocation({
      loaded: true,
      coordinates: {
        lat:0,
        lng:0
      },
      error,
    })
  }

  useEffect(() => {
    // navigator 객체 안에 geolocation이 없다면
    // 위치 정보가 없는 것.
    if (!("geolocation" in navigator)) {
      onError({
        code: 0,
        message: "Geolocation not supported",
      })
    }
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, [])

  return location;
}

export default useGeolocation