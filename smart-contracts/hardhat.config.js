require('@nomiclabs/hardhat-waffle');
require('@nomiclabs/hardhat-etherscan');
require('dotenv').config();

//configuration used for deployment to testnet
module.exports = {
  solidity: '0.8.4',
  networks: {
    goerli: {
      url: process.env.GOERLI_INFURA_NODE_URL,
      accounts: [process.env.ACCOUNT_PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  }
};
