# Ethereum Smart Contracts: Demo-Usecase

This repository contains an Ethereum Contract to demonstrate a contract's functionality as well as the interaction with it. It is based on a truffle project which should do the whole deployment process for you. Nevertheless, some prerequisites need to be installed in advance. 

## Prerequisites 

### Install node.js 
For truffle to run, you need a working installation of node.js. Please follow the instructions for your Operating System: 

[Install Node.js](https://nodejs.org)

### Install Truffle and Ganache 
Ganache is a simulation environment for an Ethereum Blockchain. It will set up a private Ethereum Blockchain with a number of Demo-Accounts (who already have Ethers) and it has a tight truffle-integration (since it's a subproject of truffle). Truffle will compile the smart contract for you and deploy it to the ganache blockchain. 

Please follow the installation instructions for your operating system:
* [Truffle Home](https://www.trufflesuite.com/truffle)
* [Ganache Homepage](https://www.trufflesuite.com/ganache)

## Use case description 
1. Account A deploys a Smart Contract which requests some kind of product. Account A becomes the contract owner
2. Account B places a bid to the smart contract
3. Account C places a lower bid to the smart contract
4. Some account (not the owner) tries to accept the bid, which should not work: only the contract owner can accept the lowest bid
5. The owner tries to accept the bid, but without sending enough Ether to the contract. Contract rejects. 
6. The owner accepts the bid and sends the necessary amount of Ether to the contract 
7. Account C sets the serial number of the product to be shipped to the contract 
8. Contract owner signals that everything worked out fine to the contract. The contract now sends the Ethers to Account C.


## Running the Project
After installing node, truffle and ganache, clone this repository somewhere on your machine. Now do the following steps: 


1. Change to the truffle project directory you just cloned (using a shell or some command prompt tool)
2. Start Ganache, create a new workspace and link the truffle project to it (see Ganache User Interface) 
3. In the project directory, run `npm install truffle-assertions` [(also see here)](https://www.npmjs.com/package/truffle-assertions). This package is required to smoothely run the JavaScript test cases
4. In the project directory, run `truffle migrate`. This will compile the solidity contract and deploy it as the first demo account which was created by ganache. You should see the demo accounts and the contract in Ganache, too. _Ganache has to be running for this step!_ 
5. Run `truffle test`. This will start the Use Case implemented as JavaScript test cases. _Ganache has to be running for this step!_  

## Writing your own Ethereum interaction code 
I suggest you write your own code using `web3js`. [Read the docs for installation and some examples here](https://web3js.readthedocs.io/en/v1.2.1/). For a simple demo code, see the file `demo.js`, which contains a (very small) example connecting to an MQTT broker and executing a value transfer between two involved (fixed) parties.



