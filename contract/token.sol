// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";

contract SPOToken is ERC20 {

    struct SpotStruct{
        uint256 lat;  
        uint256 lng; 
        string spotName;
        string spotDesc;
        address register;
    }

    struct Time {
        uint256 spot;
        uint256 time;
    }

    SpotStruct[] SpotStructs;

    mapping (uint256 => mapping(uint256=>bool)) private _spots;
    mapping (address => uint256[]) private _visitedSpot;
    mapping(string => Time[]) private _isVisited;



    mapping (address => bool) private _isClaimed;
    address private owner;
    uint256 private _totalSupply;
    mapping (address => uint256) private _tokenStack;

    constructor(uint256 maxSupply) ERC20("tops", "TOPS") {
        _totalSupply = maxSupply;
    }

    function setSpot(uint256 x,uint256 y, string memory _sn, string memory _sd) public {
        require(!checkSpotExist(x, y), "This place is already registed the spot.");
        SpotStructs.push(SpotStruct(x, y, _sn, _sd, msg.sender ));
        _spots[x][y] = true;
    }

    function getAllSpot() public view returns(SpotStruct[] memory) {
        return SpotStructs;
    }

    function getSpotInfo(uint256 spotNo) public view returns(SpotStruct memory) {
        require(SpotStructs[spotNo].lat != 0, "This place is not a spot");
        return SpotStructs[spotNo];
    }


    function checkIsVisited(string memory macAddress, uint256 spotNo) private view returns(bool){
        if(_isVisited[macAddress].length == 0) {
                return true;
        }
        for(uint i=0;i<_isVisited[macAddress].length; i++) {
            if(_isVisited[macAddress][i].time == 0){
                return true;
            }
            if(_isVisited[macAddress][i].spot==spotNo 
            && _isVisited[macAddress][i].time + 1 days <= block.timestamp) {
                return true;
            }
        }
        return false;

    }

    function hasSpotVisited(uint256 spotNo, string memory macAddress) view private returns(bool, int){
        for(uint i=0;i<_isVisited[macAddress].length;i++) {
            if(_isVisited[macAddress][i].spot == spotNo) {
                return (true, int(i));
            }
        }
        return (false, -1);
    }

    function claim() public {
        _mint(msg.sender, _tokenStack[msg.sender]);
        removeTokenStack();
    }
    


    function addTokenStack(uint256 amount, uint256 spotNo,string memory macAddress, uint256 x, uint256 y) public {
        require(checkSpotExist(x,y),"Spot Is Not Exist.");
        require(totalSupply()+10<=_totalSupply, "The limit has been exceeded.");
        require(checkIsVisited(macAddress, spotNo), "You already claim from this spot.");

        (bool has, int256 i) = hasSpotVisited(spotNo, macAddress);

        if(has) {
            _isVisited[macAddress][uint256(i)].spot = spotNo;
        } 
        else {
            _isVisited[macAddress].push(Time(spotNo, block.timestamp));
        }

        _visitedSpot[msg.sender].push(spotNo);
        _tokenStack[msg.sender] += amount;
    }
    
    function removeTokenStack() private {
        _tokenStack[msg.sender] = 0;
    }

    function getTokenStack() public view returns(uint256){
        return _tokenStack[msg.sender];
    }


    function checkSpotExist(uint256 x, uint256 y) private view returns(bool){
        return _spots[x][y];
    }


}
