# **Buy Me a Coffee using Mailchain - A Step-by-Step Tutorial**


[<img width="1296" alt="Screenshot 2023-04-17 at 10 06 36 AM" src="https://user-images.githubusercontent.com/78289253/232527328-fd417fd2-f127-4383-8f58-464e82e0a462.png">](https://www.loom.com/share/049f205e96c74569ace1a60b956d503d)


In this tutorial, you'll learn how to create a web application that allows users to buy you a coffee using Ethereum and send a thank you message using Mailchain. We'll be using React, Next.js, and the Mailchain SDK.

## **Prerequisites**

- Basic knowledge of JavaScript, React, and Next.js
- Node.js and npm installed on your system
- MetaMask browser extension installed and set up

## **Setting up the project**

1. Create a new Next.js project using the following command:

```bash
vbnetCopy codenpx create-next-app buy-me-a-coffee
cd buy-me-a-coffee
```

1. Install the required dependencies:

```bash
perlCopy codenpm install ethers @mailchain/sdk next dotenv
```

## **Creating the Smart Contract**

We'll create a simple Ethereum smart contract that allows users to buy a coffee and store a memo on the blockchain.

1. Install the required development dependencies:

```bash
bashCopy codenpm install -D hardhat @nomiclabs/hardhat-waffle ethereum-waffle chai @nomiclabs/hardhat-ethers ethers
```

1. Initialize the Hardhat project:

```bash
Copy codenpx hardhat
```

1. Create a `contracts` directory and a `BuyMeACoffee.sol` file inside it:

```bash
bashCopy codemkdir contracts
cd contracts
touch BuyMeACoffee.sol
```

1. Add the following smart contract code to `BuyMeACoffee.sol`:

```bash
solidityCopy codepragma solidity ^0.8.0;

contract BuyMeACoffee {
    event NewMemo(
        address indexed from,
        uint256 timestamp,
        string name,
        string message
    );

    function buyCoffee(string memory name, string memory message)
        public
        payable
    {
        require(msg.value >= 0.001 ether, "Insufficient amount");
        emit NewMemo(msg.sender, block.timestamp, name, message);
    }
}
```

1. Compile the smart contract:

```bash
pythonCopy codenpx hardhat compile
```

1. Deploy the smart contract to a local Ethereum network using Hardhat or to a testnet/mainnet using Remix or any other deployment tool. Note the deployed contract address.

## **Building the Frontend**

1. Create a new file `utils/BuyMeACoffee.json` and store the smart contract ABI in it. You can find the ABI in the `artifacts/contracts/BuyMeACoffee.sol/BuyMeACoffee.json` file.
2. Create a new `pages/index.jsx` file and replace its content with the provided code in your initial question.
3. Update the `contractAddress` variable in `index.jsx` with the address of your deployed smart contract.
4. Modify the `index.jsx` file as suggested in the previous answers to conditionally render the ENS address input field and send the Mailchain message.

## **Configuring Mailchain**

1. Create a new file `mailchain.jsx` and add the following code:

```bash
javascriptCopy codeimport { Mailchain } from "@mailchain/sdk";
import * as dotenv from "dotenv";
dotenv.config();

const secretRecoveryPhrase = process.env.SECRET_RECOVERY_PHRASE;

const mailchain = Mailchain.fromSecretRecoveryPhrase(secretRecoveryPhrase);
```

1. Replace `SECRET_RECOVERY_PHRASE` with your own recovery phrase.
2. Create a `.env.local` file in the root of your project and add your recovery phrase:

```bash
makefileCopy codeSECRET_RECOVERY_PHRASE=your_secret_recovery_phrase_here
```

## **Running the Application**

1. Start the development server:

```bash
arduinoCopy codenpm run dev
```

1. Open your browser and navigate to [`http://localhost:3000`](http://localhost:3000).

## **Using the Application**

1. With the development server running, open your browser and navigate to [`http://localhost:3000`](http://localhost:3000).
2. Make sure your MetaMask extension is connected to the appropriate network (local, testnet, or mainnet) and has some Ether for transactions.
3. Click on the "Connect your wallet" button to connect your MetaMask wallet.
4. Once connected, you can enter your name, an optional message, and your ENS address (if you have one) in the provided input fields.
5. Click on the "Send 1 Coffee for 0.001ETH" button to send a transaction for buying a coffee.
6. MetaMask will prompt you to confirm the transaction. Confirm it and wait for the transaction to be mined.
7. Once the transaction is successful, the application will send a thank you message to the provided ENS address using Mailchain.
8. The recipient can then check their Mailchain inbox to see the thank you message.

## **Conclusion**

Congratulations! You have successfully created a web application that allows users to buy you a coffee using Ethereum and send a thank you message using Mailchain. This tutorial demonstrated how to integrate Ethereum transactions and Mailchain messaging in a React application. You can further customize this application and add more features based on your requirements.
