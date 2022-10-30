import { styled } from '@material-ui/styles';

export const NFTContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-evenly',
  width: '100%',
  flexWrap: 'wrap'
});

export const AccountContainer = styled('div')({
  position: 'absolute',
  height: '50px',
  fontSize: '1rem',
  color: 'navy',
  top: '10px',
  right: '10px'
});

export const StyledHeader = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  fontSize: '3rem',
  height: '50px',
  margin: '30px',
  marginTop: '60px'
});

export const NFTList = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-evenly',
  width: '100%',
  flexWrap: 'wrap'
});

export const StyledNFTHeader = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-evenly',
  width: '100%',
  flexWrap: 'wrap',
  background:
    'linear-gradient(90deg, rgba(210,194,161,1) 16%, rgba(237,208,164,1) 50%, rgba(235,174,173,1) 84%)'
});

export const StyledNFTBody = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-evenly',
  width: '100%',
  flexWrap: 'wrap',
  background: 'linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)'
});
