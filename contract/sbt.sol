// SPDX-License-Identifier: MIT
 
 pragma solidity ^0.8.7;

 import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
 import "@openzeppelin/contracts/utils/Strings.sol";

 contract MintNFT is ERC721Enumerable {
    string public metadataURI;
    uint constant public TOTAL_NFT = 500;
    mapping(address => bool) _isMint;

    constructor(string memory _metadataURI) ERC721("[TRIPOT] BNB-Chain innovation hackathon", "SPBNB") {
        metadataURI = _metadataURI;
    }

    function mintNFT() public {
        require(TOTAL_NFT > totalSupply(), "No more mint.");
        require(_isMint[msg.sender] != true, "Already minted.");

        uint tokenId = totalSupply();

        _mint(msg.sender, tokenId);
        _isMint[msg.sender] = true;
    }


    function tokenURI(uint) public override view returns(string memory) {
        return string(abi.encodePacked(metadataURI));
    }

    function _transfer(address, address, uint256) internal pure override {
        revert("Can not transfer SBT");
    }


    

 }