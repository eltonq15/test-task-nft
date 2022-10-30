export interface NFTCardProps {
  name: string;
  description: string;
  customStyle?: any;
  image: string;
  level: string;
  metadata: string;
  disabled?: boolean;
  btnLabel?: string;
  tokenId?: string;
  onClick?: (tokenURI: string) => void;
}
