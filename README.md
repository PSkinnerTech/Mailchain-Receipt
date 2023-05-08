// This project is licensed under the terms of the MIT license.

# **Buy Me a Coffee using Mailchain - A Step-by-Step Tutorial**


[<img width="1296" alt="Screenshot 2023-04-17 at 10 06 36 AM" src="https://user-images.githubusercontent.com/78289253/232527328-fd417fd2-f127-4383-8f58-464e82e0a462.png">](https://www.loom.com/share/049f205e96c74569ace1a60b956d503d)


## **Build a Next.js dApp to Buy Coffee and Send Receipts via Mailchain**

In this tutorial, you will learn how to build a Next.js decentralized application (dApp) that enables users to buy coffee using Ethereum and receive a receipt sent to their ENS address using Mailchain. Next.js is a popular React framework that simplifies the creation of server-rendered React applications.

### **Prerequisites**

Before you start, make sure you have the following installed:

* Node.js (&gt;=12.x)
    
* npm or yarn
    
* A code editor such as Visual Studio Code
    
* MetaMask browser extension
    
* A basic understanding of React, Next.js, and Ethereum
    

### **Step 1: Set up the Next.js project**

1. Install the `create-next-app` CLI using npm or yarn:
    
    ```bash
    luaCopy codenpm install -g create-next-app
    ```
    
    or
    
    ```bash
    sqlCopy codeyarn global add create-next-app
    ```
    
2. Create a new Next.js project:
    
    ```bash
    luaCopy codenpx create-next-app buy-me-a-coffee
    ```
    
3. Change to the newly created project directory:
    
    ```bash
    bashCopy codecd buy-me-a-coffee
    ```
    
4. Install the necessary dependencies:
    
    ```bash
    bashCopy codenpm install ethers @mailchain/sdk dotenv
    ```
    
    or
    
    ```bash
    sqlCopy codeyarn add ethers @mailchain/sdk dotenv
    ```
    

### **Step 2: Create the Mailchain file**

Create a new file named `mailchain.js` in the `js` folder of your project directory. This file will handle the Mailchain integration.

```bash
javascriptCopy codeimport { Mailchain } from "@mailchain/sdk";
import * as dotenv from "dotenv";
dotenv.config();

const secretRecoveryPhrase = process.env.SECRET_RECOVERY_PHRASE;

const mailchain = Mailchain.fromSecretRecoveryPhrase(secretRecoveryPhrase);

export default mailchain;
```

This file imports the Mailchain SDK, reads your Secret Recovery Phrase from the environment variables (`.env` file), and exports a Mailchain instance.

### **Step 3: Create the main application file**

Replace the content of `pages/index.js` with the provided code snippet in your initial question. This file contains the main logic for the dApp, including connecting to the wallet, buying coffee, sending receipts via Mailchain, and displaying the received memos.

### **Step 4: Set up the environment variables**

Create a `.env.local` file in the root of your project directory, and add the following line:

```bash
makefileCopy codeSECRET_RECOVERY_PHRASE=your_secret_recovery_phrase_here
```

Replace `your_secret_recovery_phrase_here` with your actual Secret Recovery Phrase.

### **Step 5: Deploy your smart contract**

To interact with your smart contract, you will need to deploy it on a test network, such as Goerli or Rinkeby. You can use Remix, Truffle, or Hardhat to deploy your contract. Once deployed, replace the `contractAddress` value in `pages/index.js` with your deployed contract address.

### **Step 6: Run the application**

1. Start the development server:
    
    ```bash
    npm run dev
    ```
    
    or
    
    ```bash
    yarn dev
    ```
    
2. Open your browser and navigate to [`http://localhost:3000`](http://localhost:3000). You should see the "Buy Patrick a Coffee!" application.
    
3. Connect your MetaMask wallet and interact with the dApp. When you buy a coffee, a receipt will be sent to your ENS address via Mailchain.
    

### **Conclusion**

In this tutorial, you have built a Next.js dApp that allows users to buy coffee using Ethereum and receive a receipt via Mailchain. This demonstrates how to integrate a decentralized application with Mailchain to send messages to ENS addresses. You can further extend this application to add more features, such as integrating with other decentralized services, adding more types of items for purchase, or enhancing the UI/UX. This tutorial should serve as a starting point for building more sophisticated dApps that leverage the Mailchain protocol for web3 communication. Happy coding!

As always! Feel free to connect with me on [Twitter](https://twitter.com/PSkinnerTech).
