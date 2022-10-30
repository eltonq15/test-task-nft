import { useState, useEffect } from 'react';
import './App.css';
import { NFTBody } from './view/NFTBody';
import { NFTHeader } from './view/NFTHeader';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [account, setAccount] = useState('');
  const [nftType, setNftType] = useState('');

  const onAccountChange = (acc: string) => {
    setAccount(acc);
  };

  useEffect(() => {
    //Add small delay to make sure that window.ethereum is loaded
    setTimeout(() => {
      if ((window as any).ethereum.selectedAddress) {
        onAccountChange((window as any).ethereum.selectedAddress);
      }
      (window as any).ethereum.on('accountsChanged', onAccountChange);
    }, 200);
  }, []);

  return (
    <div className='App'>
      <NFTHeader onAccountChange={onAccountChange} account={account} nftType={nftType} />
      <NFTBody account={account} setNftType={setNftType} />
      <ToastContainer limit={5} />
    </div>
  );
}

export default App;
