const hardhat = require('hardhat');

async function main() {
  const PufferFish = await hardhat.ethers.getContractFactory('PufferFish');
  const pufferFish = await PufferFish.deploy();

  await pufferFish.deployed();

  console.log('PufferFish deployed to:', pufferFish.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
