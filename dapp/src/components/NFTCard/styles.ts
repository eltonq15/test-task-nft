import { styled } from '@material-ui/styles';

export const StyledCard = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-evenly',
  width: '350px',
  minHeight: '350px',
  padding: '20px',
  borderRadius: '20px',
  margin: '20px',
  boxShadow: '0px 0px 10px rgba(0,0,0,0.35)',
  transition: 'all 0.2s ease-in-out',
  userSelect: 'none',
  color: (props: any) => (props.lightText ? '#fff' : '#000'),

  '&:hover': {
    transform: 'scale(1.01)'
  }
});

export const StyledTokenId = styled('div')({
  fontSize: '1rem',
  color: 'red'
});

export const StyledP = styled('p')({
  margin: '0',
  fontSize: '1.5rem'
});

export const StyledButton = styled('button')({
  height: '32px',
  borderRadius: '8px',
  fontSize: '1rem',
  letterSpacing: '1.5px',
  cursor: 'pointer',
  backgroundColor: '#000',
  color: '#fff',
  transition: 'all 0.2s ease-in-out',

  '&:hover': {
    backgroundColor: '#fff',
    color: '#000'
  },

  '&:disabled': {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: 'rgba(255, 255, 255, 0.5)',
    cursor: 'not-allowed'
  }
});

export const StyledConnectButton = styled(StyledButton)({
  maxWidth: '350px',
  margin: '30px'
});

export const StyledImg = styled('img')({
  width: '200px',
  height: '200px',
  borderRadius: '50%',
  userDrag: 'none'
});
