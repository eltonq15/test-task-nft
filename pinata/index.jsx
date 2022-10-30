const pinataSDK = require('@pinata/sdk');
require('dotenv').config();
const fs = require('fs');

const pinata = pinataSDK(process.env.PINATA_API_KEY, process.env.PINATA_SECRET_API_KEY);

const pinFileToIPFS = async (filePath) => {
  const readableStreamForFile = fs.createReadStream(filePath);
  const options = {
    pinataMetadata: {
      name: 'Red Puffer Fish (evolved)'
    },
    pinataOptions: {
      cidVersion: 0
    }
  };
  try {
    const result = await pinata.pinFileToIPFS(readableStreamForFile, options);
    return `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`;
  } catch (err) {
    console.log(err);
  }
};

const pinJSONToIPFS = async (body) => {
  return pinata
    .pinJSONToIPFS(body)
    .then((result) => {
      return `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`;
    })
    .catch((err) => {
      console.log(err);
    });
};

const getMetadata = async () => {
  const assetUrl = await pinFileToIPFS('./assets/puffer-fish-evolved-red.jpg');
  const body = {
    name: 'Red Puffer Fish (evolved)',
    description: 'A Beautiful Evolved Red Puffer Fish',
    attributes: [
      {
        trait_type: 'Level',
        value: 2,
        max_value: 2
      },
      {
        trait_type: 'Color',
        value: 'Red'
      }
    ],
    image: assetUrl,
    external_link: assetUrl
  };
  const metadataUrl = await pinJSONToIPFS(body);
  console.log(metadataUrl);
};

getMetadata();
