import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { bech32 } from "bech32";
let Buffer = require("buffer/").Buffer;

const SelectWallet = () => {
  const [modal, setModal] = useState(false);

  let navigate = useNavigate();

  const connectMetamask = async () => {
    if (typeof window.ethereum !== "undefined") {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      localStorage.setItem("walletAddressEth", JSON.stringify(accounts[0]));
      navigate("/nft-gallery-eth");
    }
  };

  const connectCardanoWallet = async (wallet) => {
    try {
      const api = await eval(`window.cardano.${wallet}.enable()`);
      console.log(api);
      const address = await api.getChangeAddress();
      console.log(address)

      const addressEncoded = bech32.encode(
        "addr",
        bech32.toWords(Uint8Array.from(Buffer.from(address, "hex"))),
        1000
      );

      console.log(addressEncoded)

      const stakeAddressDecoded = "e1" + address.substr(address.length - 56);
      console.log(stakeAddressDecoded)

      const stakeAddress = bech32.encode(
        "stake",
        bech32.toWords(
          Uint8Array.from(Buffer.from(stakeAddressDecoded, "hex"))
        ),
        1000
      );

      console.log(stakeAddress)

      localStorage.setItem("changeAddress", JSON.stringify(addressEncoded));
      localStorage.setItem("stakeAddress", JSON.stringify(stakeAddress));
      navigate("/nft-gallery-cardano");
    } catch (err) {
      console.log(err);
    }
  };

  const checkCardanoBrowserWallets = () => {
    const wallets = [];
    window.cardano &&
      Object.keys(window.cardano).map(function (key) {
        key !== "ccvault" &&
          wallets.push(key.charAt(0).toUpperCase() + key.slice(1));
      });
    return wallets;
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <>
      <button onClick={toggleModal}>
        <h3>Poveži novčanik</h3>
      </button>
      <Modal
        ariaHideApp={false}
        isOpen={!!modal}
        className="modal"
        overlayClassName="modal__overlay"
      >
        <div className="modal__wrapper">
          <div className="modal__header">
            <h2>Poveži novčanik</h2>
            <MdClose
              className="modal__header__close"
              onClick={() => {
                toggleModal();
              }}
            />
          </div>
          <div className="modal__content">
            <div className="modal__content__wallet" onClick={connectMetamask}>
              <img
                src={require("../../images/metamask.png")}
                alt="wallet-logo"
                className="modal__content__wallet__logo"
              ></img>
              <h3>Metamask</h3>
            </div>

          

            {window.cardano &&
              checkCardanoBrowserWallets().map((wallet) => (
                <div
                  className="modal__content__wallet"
                  onClick={() => connectCardanoWallet(wallet.toLowerCase())}
                >
                  <img
                    src={require(`../../images/${wallet}.png`)}
                    alt="wallet-logo"
                    className="modal__content__wallet__logo"
                  ></img>
                  <h3>{wallet}</h3>
                </div>
              ))}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default SelectWallet;
