import React, { useState, useEffect } from "react";
import { bech32 } from "bech32";
const axios = require("axios");
let Buffer = require("buffer/").Buffer;

const Test = () => {
  const [walletName, setWalletName] = useState("");
  const [stakeAddress, setStakeAddress] = useState("");
  const [API, setAPI] = useState(undefined);

  const checkBrowserWallets = () => {
    const wallets = [];
    window.cardano &&
      Object.keys(window.cardano).map(function (key, index) {
        key !== "ccvault" && wallets.push(key);
      });
    return wallets;
  };

  const enableWallet = async (wallet) => {
    try {
      const api = await eval(`window.cardano.${wallet}.enable()`);
      setAPI(api);
      console.log(API);
    } catch (err) {
      console.log(err);
    }
  };

  const getChangeAddress = async () => {
    try {
      const address = await API.getChangeAddress();

      const addressEncoded = bech32.encode(
        "addr",
        bech32.toWords(Uint8Array.from(Buffer.from(address, "hex"))),
        1000
      );

      const addressWords = bech32.decode(addressEncoded, 1000);
      const payload = bech32.fromWords(addressWords.words);
      const addressDecoded = `${Buffer.from(payload).toString("hex")}`;

      const stakeAddressDecoded =
        "e1" + addressDecoded.substr(addressDecoded.length - 56);

      const stakeAddress = bech32.encode(
        "stake",
        bech32.toWords(
          Uint8Array.from(Buffer.from(stakeAddressDecoded, "hex"))
        ),
        1000
      );

      setStakeAddress(stakeAddress);
    } catch (err) {
      console.log(err);
    }
  };

  const getMetadata = async () => {
    axios
      .get("https://cardano-mainnet.blockfrost.io/api/v0/assets/3f1481f35851b6c134c5905c41f428f64a5baf57ecfb54843909d612617474656e6465722337", {
        headers: {
          project_id: process.env.REACT_APP_PROJECT_ID,
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const connectToWallet = (wallet) => {
    setWalletName(wallet);
    enableWallet(wallet);
    getChangeAddress();
    getMetadata();
  };

  return (
    <div style={{ paddingTop: "10px" }}>
      <div style={{ marginBottom: 15 }}>Select wallet:</div>
      {console.log(process.env.REACT_APP_PROJECT_ID)}

      {window.cardano &&
        checkBrowserWallets().map((wallet) => (
          <button onClick={() => connectToWallet(wallet)}>{wallet}</button>
        ))}
    </div>
  );
};

export default Test;
