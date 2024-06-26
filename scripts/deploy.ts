import { ethers } from "hardhat";

async function main() {
  const contract = await ethers.getContractFactory("wIOTA");
  const deployed_contract = await contract.deploy();

  await deployed_contract.deployed();

  console.log(
    `wIOTA deployed to ${deployed_contract.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
