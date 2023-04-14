import abi from "../utils/BuyMeACoffee.json";
import { ethers } from "ethers";
import Head from "next/head";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  // Contract Address & ABI
  const contractAddress = "0xbbe7a0dE24b7057C4e2d9362986699ef31280936";
  const contractABI = abi.abi;

  // Component state
  const [currentAccount, setCurrentAccount] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [memos, setMemos] = useState([]);

  const onNameChange = (event) => {
    setName(event.target.value);
  };

  const onMessageChange = (event) => {
    setMessage(event.target.value);
  };

  // Wallet connection logic
  const isWalletConnected = async () => {
    try {
      const { ethereum } = window;

      const accounts = await ethereum.request({ method: "eth_accounts" });
      console.log("accounts: ", accounts);

      if (accounts.length > 0) {
        const account = accounts[0];
        console.log("wallet is connected! " + account);
      } else {
        console.log("make sure MetaMask is connected");
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("please install MetaMask");
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const buyCoffee = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum, "any");
        const signer = provider.getSigner();
        const buyMeACoffee = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        console.log("buying coffee..");
        const coffeeTxn = await buyMeACoffee.buyCoffee(
          name ? name : "anon",
          message ? message : "Enjoy your coffee!",
          { value: ethers.utils.parseEther("0.001") }
        );

        await coffeeTxn.wait();

        console.log("mined ", coffeeTxn.hash);

        console.log("coffee purchased!");

        // Send mailchain message to ENS Address
        const recipientAddress = document.querySelector(
          'input[name="ensAddress"]'
        ).value;
        if (recipientAddress) {
          const { data, error } = await mailchain.sendMail({
            from: "pskinnertech@mailchain.com",
            to: [`${recipientAddress}@ethereum.mailchain.xyz`],
            subject: "Coffee Received",
            content: {
              text: `Thank you for buying me a coffee, ${name}!`,
              html: `<p>Thank you for buying me a coffee, ${name}!</p>`,
            },
          });

          if (error) {
            console.warn("Mailchain error", error);
          } else {
            console.log("Mail sent successfully:", data);
          }
        }

        if (error) {
          console.warn("Mailchain error", error);
        } else {
          console.log("Mail sent successfully:", data);
        }

        // Clear the form fields.
        setName("");
        setMessage("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Function to fetch all memos stored on-chain.
  const getMemos = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const buyMeACoffee = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        console.log("fetching memos from the blockchain..");
        const memos = await buyMeACoffee.getMemos();
        console.log("fetched!");
        setMemos(memos);
      } else {
        console.log("Metamask is not connected");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let buyMeACoffee;
    isWalletConnected();
    getMemos();

    // Create an event handler function for when someone sends
    // us a new memo.
    const onNewMemo = (from, timestamp, name, message) => {
      console.log("Memo received: ", from, timestamp, name, message);
      setMemos((prevState) => [
        ...prevState,
        {
          address: from,
          timestamp: new Date(timestamp * 1000),
          message,
          name,
        },
      ]);
    };

    const { ethereum } = window;

    // Listen for new memo events.
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum, "any");
      const signer = provider.getSigner();
      buyMeACoffee = new ethers.Contract(contractAddress, contractABI, signer);

      buyMeACoffee.on("NewMemo", onNewMemo);
    }

    return () => {
      if (buyMeACoffee) {
        buyMeACoffee.off("NewMemo", onNewMemo);
      }
    };
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Buy Patrick a Coffee!</title>
        <meta name="description" content="Tipping site" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Buy Patrick a Coffee!</h1>

        {currentAccount ? (
          <div>
            <form>
              <div>
                <label>Name</label>
                <br />

                <input
                  id="name"
                  type="text"
                  placeholder="anon"
                  onChange={onNameChange}
                />
              </div>
              <br />
              <div>
                <label>Send Patrick a message</label>
                <br />

                <textarea
                  rows={3}
                  placeholder="Enjoy your coffee!"
                  id="message"
                  onChange={onMessageChange}
                  required
                ></textarea>
              </div>
              <div>
                <button type="button" onClick={buyCoffee}>
                  Send 1 Coffee for 0.001ETH
                </button>
              </div>
            </form>
          </div>
        ) : (
          <button onClick={connectWallet}> Connect your wallet </button>
        )}

        {currentAccount && (
          <>
            <div>
              <h3>Want to Receive a Receipt to your ENS Address?</h3>
            </div>
            <form>
              <div>
                <label>Enter your ENS Address:</label>
                <input type="text" name="ensAddress" />
              </div>
              <br />
            </form>
          </>
        )}
        <div>
          <p>
            A Receipt will be sent directly to your ENS Address. How does that
            work? We use a specialized web3 communication layer called{" "}
            <b>
              <a href="https://mailchain.com/" target="_blank" rel="noreferrer">
                Mailchain
              </a>
            </b>
            . If you don't have a mailchain account, don't worry. You can finish
            your transaction, set up a free mailchain account, and your receipt
            will generate after setting up your account. Its that easy.
          </p>
        </div>
      </main>

      {currentAccount && <h1>Memos received</h1>}

      {currentAccount &&
        memos.map((memo, idx) => {
          return (
            <div
              key={idx}
              style={{
                border: "2px solid",
                borderRadius: "5px",
                padding: "5px",
                margin: "5px",
              }}
            >
              <p style={{ fontWeight: "bold" }}>"{memo.message}"</p>
              <p>
                From: {memo.name} at {memo.timestamp.toString()}
              </p>
            </div>
          );
        })}

      <footer className={styles.footer}>
        <a
          href="https://alchemy.com/?a=roadtoweb3weektwo"
          target="_blank"
          rel="noopener noreferrer"
        >
          Created by @PSkinnerTech for a Maillchain Hackathon
        </a>
      </footer>
    </div>
  );
}
