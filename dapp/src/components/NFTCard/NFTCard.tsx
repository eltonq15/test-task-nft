import { StyledButton, StyledCard, StyledImg, StyledP, StyledTokenId } from './styles';
import { NFTCardProps } from './types';

export const NFTCard = ({
  tokenId,
  name,
  description,
  customStyle,
  btnLabel,
  image,
  level,
  metadata,
  disabled = false,
  onClick
}: NFTCardProps) => {
  return (
    <StyledCard style={customStyle}>
      {tokenId && (
        <StyledTokenId>
          <code>TOKEN ID: {tokenId}</code>
        </StyledTokenId>
      )}
      <StyledImg src={image} alt={description} title={description} />
      <StyledP>{name}</StyledP>
      <StyledP>Level: {level}</StyledP>
      <StyledButton onClick={() => onClick?.(metadata)} disabled={disabled}>
        {btnLabel}
      </StyledButton>
    </StyledCard>
  );
};
