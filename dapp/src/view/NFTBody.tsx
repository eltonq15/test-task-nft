import { useState, useEffect } from 'react';
import { NFTCard } from '../components/NFTCard/NFTCard';
import { evolveNFT, getNFTsByAddress } from '../Web3Client';
import { getCustomStyle, getEvolveUrl, getMetadataAttribute } from './helper';
import { NFTList, StyledHeader, StyledNFTBody } from './styles';
import { NFTProps } from './types';

export const NFTBody = ({ account, setNftType }: any) => {
  const [NFTs, setNFTs] = useState<any>([]);
  const [previousAccount, setPreviousAccount] = useState('');
  const [refreshNFTs, setRefreshNFTs] = useState(false);

  useEffect(() => {
    const accountHasChanged = account && previousAccount !== account;
    if (accountHasChanged || refreshNFTs) {
      try {
        (async () => {
          const nfts = await getNFTsByAddress();
          setNftType(nfts[0]?.initialTokenURI);
          setNFTs(nfts);
          setPreviousAccount(account);
          setRefreshNFTs(false);
        })();
      } catch (error) {
        console.log(error);
      }
    }
  }, [account, previousAccount, NFTs, setNftType, refreshNFTs]);

  useEffect(() => {
    //Add listeners to refresh NFTs list after mint or evolve
    window.addEventListener('nftMinted', () => setRefreshNFTs(true));
    window.addEventListener('nftEvolved', () => setRefreshNFTs(true));
  }, []);

  return (
    <StyledNFTBody>
      <StyledHeader>My NFTs: {NFTs.length}</StyledHeader>
      {NFTs && (
        <NFTList>
          {NFTs.map((nft: NFTProps) => {
            const customStyle = getCustomStyle(
              getMetadataAttribute(nft.attributes, 'Color'),
              getMetadataAttribute(nft.attributes, 'Level')
            );

            return (
              <NFTCard
                key={nft.tokenId}
                tokenId={nft.tokenId}
                image={nft.image}
                metadata={nft.currentTokenURI}
                name={nft.name}
                customStyle={customStyle}
                description={nft.description}
                level={nft.evolveCount}
                btnLabel='EVOLVE'
                disabled={nft.evolveCount === '2'}
                onClick={() => evolveNFT(nft.tokenId, getEvolveUrl(nft.name) || '')}
              />
            );
          })}
        </NFTList>
      )}
    </StyledNFTBody>
  );
};
