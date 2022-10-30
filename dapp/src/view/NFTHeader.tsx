import { NFTCard } from '../components/NFTCard/NFTCard';
import { StyledConnectButton } from '../components/NFTCard/styles';
import { FISH } from './constants';
import { connectWallet, mint } from './helper';
import { AccountContainer, NFTContainer, StyledHeader, StyledNFTHeader } from './styles';
import { NFTHeaderProps } from './types';

export const NFTHeader = ({ onAccountChange, account, nftType }: NFTHeaderProps) => {
  return (
    <StyledNFTHeader>
      <StyledHeader>Please select your NFT</StyledHeader>
      <code>(Choose wisely! After your first purchase, only NFTs of the same type can be purchased)</code>
      <NFTContainer>
        <NFTCard
          image={FISH.SIMPLE_LIGHT_BROWN.IMAGE_URL}
          metadata={FISH.SIMPLE_LIGHT_BROWN.METADATA_URL}
          name='Light Brown Puffer Fish'
          customStyle={{ background: '#d2c2a1' }}
          description='A beautiful and happy light brown puffer fish'
          level='1'
          btnLabel='MINT'
          disabled={!account || (nftType?.length > 0 && nftType !== FISH.SIMPLE_LIGHT_BROWN.METADATA_URL)}
          onClick={mint}
        />
        <NFTCard
          image={FISH.SIMPLE_YELLOW.IMAGE_URL}
          metadata={FISH.SIMPLE_YELLOW.METADATA_URL}
          name='Yellow Puffer Fish'
          description='A beautiful and happy yellow puffer fish'
          customStyle={{ background: '#edd0a4' }}
          level='1'
          btnLabel='MINT'
          disabled={!account || (nftType?.length > 0 && nftType !== FISH.SIMPLE_YELLOW.METADATA_URL)}
          onClick={mint}
        />
        <NFTCard
          image={FISH.SIMPLE_RED.IMAGE_URL}
          metadata={FISH.SIMPLE_RED.METADATA_URL}
          name='Red Puffer Fish'
          description='A beautiful and happy red puffer fish'
          customStyle={{ background: '#ebaead' }}
          level='1'
          btnLabel='MINT'
          disabled={!account || (nftType?.length > 0 && nftType !== FISH.SIMPLE_RED.METADATA_URL)}
          onClick={mint}
        />
      </NFTContainer>

      {account && <AccountContainer>{`Connected account: ${account}`}</AccountContainer>}
      {!account && (
        <AccountContainer>
          <StyledConnectButton onClick={() => connectWallet(onAccountChange)}>
            CONNECT WALLET
          </StyledConnectButton>
        </AccountContainer>
      )}
    </StyledNFTHeader>
  );
};
