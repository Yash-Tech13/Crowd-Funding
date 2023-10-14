# Crypto King Crowdfunding Application

## Project Description
Crypto King Crowdfunding Application is a decentralized application (Dapp) built on the Ethereum blockchain. It allows users to create and donate to various crowdfunding campaigns securely and transparently.

## Features
- Create and manage crowdfunding campaigns.
- Contribute to campaigns using cryptocurrency (Ethereum).
- Transparent tracking of campaign funds using blockchain technology.
- Decentralized and secure smart contract functionality.

## Installation Instructions
1. Clone the project repository
```shell
git clone https://github.com/Yash-Tech13/Crowd-Funding.git
```

2. Navigate to the project directory
```shell
cd Crowd-Funding
```
3. Install project dependencies
```shell
npm install
```
4. Start a local Hardhat blockchain(keep running)
```shell
npx hardhat node
```
5. Deploy smart contract to local blockchain
```shell
npx hardhat run --network localhost scripts/deploy.js
```
6. Run the application locally
```shell
npm run dev
```

## Technology Stack
- Ethereum Smart Contracts
- ethers.js: Ethereum JavaScript library
- Hardhat: Ethereum development environment for smart contracts
- Next.js 13: React framework for building the user interface
- Solidity: Ethereum smart contract programming language
