const hre = require("hardhat");
// 0x5FbDB2315678afecb367f032d93F642f64180aa3
async function main() {

  const crowdfunding = await hre.ethers.deployContract("Crowdfunding");

  await crowdfunding.waitForDeployment();

  console.log(
    `Crowdfunding deployed to ${crowdfunding.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
