// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";


contract PufferFish is Ownable, ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    event NftMinted(address sender, uint256 tokenId);
    event NftEvolved(uint256 tokenId);

    uint256 public MINT_PRICE = 0.001 ether;
    uint256 public EVOLVE_PRICE = 0.0005 ether;

    constructor() ERC721("PufferFish", "PFF") {}

    struct Fish {
        uint256 tokenId;
        address owner;
        string initialTokenURI;
        string currentTokenURI;
        uint32 evolveCount;
    }

    mapping(address => mapping(uint => Fish)) public NFTs;
    mapping(address => Fish[]) public NFTsByAddress;
    mapping(address => uint) public lastTokenIdByAddress;
    mapping(uint => Fish) public NFTById;
    uint256 public lastTokenIdMinted;

    //NFT methods
    function safeMint(string memory uri) public payable {
        require(msg.value >= MINT_PRICE, "Not enough ETH sent");
        // Sender can mint several NFTs, but they must be of the same type
        require(keccak256(bytes(NFTs[msg.sender][lastTokenIdByAddress[msg.sender]].initialTokenURI)) == keccak256(bytes("")) || 
                keccak256(bytes(NFTs[msg.sender][lastTokenIdByAddress[msg.sender]].initialTokenURI)) == keccak256(bytes(uri)),
                "Only NFTs of the same type can be minted");
        _safeMint(msg.sender, _tokenIds.current());
        _setTokenURI(_tokenIds.current(), uri);
        fillNFT(msg.sender, _tokenIds.current(), uri, uri, 1);
        emit NftMinted(msg.sender, _tokenIds.current());
        _tokenIds.increment();
    }

    function upgradeNftByAddressArray(uint256 _tokenId, string memory _uri, uint32 _evolveCount) private {
        NFTs[ownerOf(_tokenId)][_tokenId].currentTokenURI = _uri;
        NFTs[ownerOf(_tokenId)][_tokenId].evolveCount = _evolveCount;
        NFTById[_tokenId].currentTokenURI = _uri;
        NFTById[_tokenId].evolveCount = _evolveCount;

        // iterate in NFTsByAddress and update the currentTokenURI and evolveCount by the correct tokenId
        for (uint i = 0; i < NFTsByAddress[ownerOf(_tokenId)].length; i++) {
            if (NFTsByAddress[ownerOf(_tokenId)][i].tokenId == _tokenId) {
                NFTsByAddress[ownerOf(_tokenId)][i].currentTokenURI = _uri;
                NFTsByAddress[ownerOf(_tokenId)][i].evolveCount = _evolveCount;
                break;
            }
        }
    }

    function evolveNFT(uint256 tokenId, string memory uri) public payable {
        require(_isApprovedOrOwner(msg.sender, tokenId), "Caller is not owner nor approved");
        require(keccak256(bytes(tokenURI(tokenId))) != keccak256(bytes(uri)), "New URI is the same as the old one");
        require(NFTs[ownerOf(tokenId)][tokenId].evolveCount < 2, "The NFT has already been evolved");
        require(msg.value >= EVOLVE_PRICE, "Not enough ETH sent");
        _setTokenURI(tokenId, uri);
        upgradeNftByAddressArray(tokenId, uri, 2);
        emit NftEvolved(tokenId);
    }

    function burn(uint256 tokenId) public {
        require(_isApprovedOrOwner(msg.sender, tokenId), "Caller is not owner nor approved");
        _burn(tokenId);
    }

    // Contract methods
    function withdraw() public onlyOwner {
        require(address(this).balance > 0, "No ETH to withdraw");
        payable(owner()).transfer(address(this).balance);
    }

    function getBalance() public onlyOwner view returns (uint256) {
        return address(this).balance;
    }

    function destroy() public onlyOwner {
        selfdestruct(payable(owner()));
    }

    // helper methods
    function fillNFT(address _owner, uint256 _tokenId, string memory _initialTokenURI, string memory _currentTokenURI, uint32 _evolveCount) internal {
        Fish memory fish = Fish(_tokenId, _owner, _initialTokenURI, _currentTokenURI, _evolveCount);
        NFTs[_owner][_tokenId] = fish;
        NFTById[_tokenId] = fish;
        lastTokenIdByAddress[_owner] = _tokenId;
        lastTokenIdMinted = _tokenId;
        NFTsByAddress[_owner].push(fish);
    }

    function getNFTsByAddress(address _owner) public view returns (Fish[] memory) {
        return NFTsByAddress[_owner];
    }

    function getNFTById(uint256 _tokenId) public view returns (Fish memory) {
        return NFTById[_tokenId];
    }
}