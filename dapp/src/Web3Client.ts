import Web3 from 'web3';
import { notifyAllMints, notifyOnError, notifyOnLoad, notifyOnSuccess } from './notificationHelper';
import PufferFishContractABI from './PufferFishContractABI.json';
import { NFTProps } from './view/types';

let selectedAccount: string;
let web3: any;
let contract: any;
let isInitialized = false;

const checkInitialization = async () => {
  if (!isInitialized) {
    await initWebClient();
  }
};

export const addContractEventListeners = () => {
  contract.events.NftMinted({}, (emptyParam: any, transaction: any) => {
    const msg = `User ${transaction.returnValues.sender
      .slice(0, 7)
      .concat('...')} has just minted token with ID: ${transaction.returnValues.tokenId} 🐡💦`;
    notifyAllMints(msg);
    //create and dispatch local event in order to refetch the NFTs and display them in UI
    let event = new Event('nftMinted');
    window.dispatchEvent(event);
  });

  contract.events.NftEvolved({}, () => {
    //create and dispatch local event in order to refetch the NFTs and display them in UI
    let event = new Event('nftEvolved');
    window.dispatchEvent(event);
  });
};

export const initWebClient = async () => {
  let provider = (window as any).ethereum;
  if (typeof provider !== 'undefined') {
    try {
      const accounts = await provider.request({ method: 'eth_requestAccounts' });
      selectedAccount = accounts[0];
      web3 = new Web3(provider);

      contract = new web3.eth.Contract(
        PufferFishContractABI as any,
        process.env.REACT_APP_GOERLI_CONTRACT_ADDRESS
      );
      addContractEventListeners();
      isInitialized = true;
    } catch (error) {
      console.log(error);
    }

    (window as any).ethereum.on('accountsChanged', (accounts: string[]) => {
      selectedAccount = accounts[0];
    });
  }
};

export const safeMint = async (tokenURI: string) => {
  await checkInitialization();
  try {
    notifyOnLoad('Minting NFT, almost there! 🚀');
    const tx = await contract.methods.safeMint(tokenURI).send({
      from: selectedAccount,
      gas: 1000000,
      value: web3.utils.toWei('1', 'finney')
    });
    console.log('tx: ', tx);
    notifyOnSuccess('NFT minted successfully! 🐡💦');
    return tx;
  } catch (error: any) {
    notifyOnError('Something went wrong! 🐞');
    console.log(error);
  }
};

export const getNFTsByAddress = async () => {
  await checkInitialization();

  const rawData = await contract.methods.getNFTsByAddress(selectedAccount).call();
  const nfts: NFTProps[] = await rawData.map(async (nft: any) => {
    const [tokenId, owner, initialTokenURI, currentTokenURI, evolveCount] = nft;
    const response = await fetch(currentTokenURI);
    const data = await response.json();
    return { ...data, tokenId, owner, initialTokenURI, currentTokenURI, evolveCount };
  });

  return Promise.all(nfts);
};

export const evolveNFT = async (tokenId: string, uri: string) => {
  await checkInitialization();

  try {
    notifyOnLoad('Evolving NFT, almost there! 🧬');
    const tx = await contract.methods
      .evolveNFT(tokenId, uri)
      .send({ from: selectedAccount, gas: 1000000, value: web3.utils.toWei('0.5', 'finney') });
    console.log('tx: ', tx);
    notifyOnSuccess('NFT evolved successfully! 💎');
    return tx;
  } catch (error: any) {
    notifyOnError('Something went wrong! 🐞');
    console.log(error);
  }
};
