import { safeMint } from '../Web3Client';
import { Attribute } from './types';

// ===== NFTHeader helper functions ===== //

//mint token
export const mint = async (tokenURI: string) => {
  try {
    safeMint(tokenURI);
  } catch (error) {
    console.log(error);
  }
};

//Connect wallet
export const connectWallet = async (onAccountChange: (account: string) => void) => {
  try {
    await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
    onAccountChange((window as any).ethereum.selectedAddress);
  } catch (error) {
    console.log(error);
  }
};

// ===== NFTBody helper functions ===== //
export const getCustomStyle = (colorDescription: string, level: string) => {
  switch (colorDescription) {
    case 'Light Brown':
      return {
        background:
          level === '1'
            ? '#d2c2a1'
            : 'linear-gradient(0deg, rgba(137,140,139,1) 15%, rgba(72,77,81,1) 60%, rgba(63,68,73,1) 90%)',
        color: level === '1' ? '#000' : '#fff'
      };
    case 'Yellow':
      return {
        background:
          level === '1'
            ? '#edd0a4'
            : 'linear-gradient(0deg, rgba(28,48,56,1) 15%, rgba(61,74,64,1) 60%, rgba(121,131,84,1) 100%)',
        color: level === '1' ? '#000' : '#fff'
      };
    case 'Red':
      return {
        background:
          level === '1'
            ? '#ebaead'
            : 'linear-gradient(0deg, rgba(28,0,153,1) 0%, rgba(0,0,55,1) 66%, rgba(65,7,6,1) 100%)',
        color: level === '1' ? '#000' : '#fff'
      };
    default:
      return '#fff';
  }
};

export const getEvolveUrl = (NFTName: string) => {
  switch (NFTName) {
    case 'Light Brown Puffer Fish':
      return process.env.REACT_APP_EVOLVE_URL_LIGHT_BROWN;
    case 'Yellow Puffer Fish':
      return process.env.REACT_APP_EVOLVE_URL_YELLOW;
    case 'Red Puffer Fish':
      return process.env.REACT_APP_EVOLVE_URL_RED;
    default:
      return '';
  }
};

export const getMetadataAttribute = (attributes: Attribute[], name: string) => {
  return attributes.find((attribute: Attribute) => attribute.trait_type === name)?.value.toString() || '';
};
