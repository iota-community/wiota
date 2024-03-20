import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-chai-matchers";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  etherscan: {
    apiKey:
    {
      testnet: "xxx"
    },
    customChains: [
      {
        network: "testnet",
        chainId: 1073,
        urls: {
          apiURL: "https://explorer.evm.testnet.shimmer.network/api",
          browserURL: "https://explorer.evm.testnet.shimmer.network/"
        }
      }
    ]
  },
  networks: {
    testnet: {
      url: 'https://json-rpc.evm.testnet.shimmer.network',
      chainId: 1073,
      timeout: 60000,
    }
  }
};

export default config;
