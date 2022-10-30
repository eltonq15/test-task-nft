import { NFTCardProps } from '../components/NFTCard/types';

export interface Attribute {
  trait_type: string;
  value: string | number;
  max_value?: number;
}

export interface NFTProps {
  attributes: Attribute[];
  description: string;
  name: string;
  image: string;
  tokenId: string;
  owner: string;
  initialTokenURI: string;
  currentTokenURI: string;
  evolveCount: string;
}

export interface NFTHeaderProps {
  account: string;
  onAccountChange: (account: string) => void;
  nftType: string;
}
