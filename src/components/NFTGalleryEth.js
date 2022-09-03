import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import LogoutButton from "./LogoutButton";

const NFTGalleryEth = () => {
  const [assetsMetadata, setAssetsMetadata] = useState([]);
  const [walletAddress, setWalletAddress] = useState("");

  // Alchemy api key
  const apiKey = "HUp7fkpEemxEsjS4-nN9jy2XOP8VYSez";

  const getMetadata = async (wallet) => {
    let config = {
      method: "get",
      url: `https://eth-goerli.g.alchemy.com/v2/${apiKey}/getNFTs/?owner=${wallet}`,
    };

    axios(config)
      .then((response) => setAssetsMetadata(response.data.ownedNfts))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    const wallet = JSON.parse(localStorage.getItem("walletAddressEth"));
    if (wallet !== "") {
      setWalletAddress(wallet);
      getMetadata(wallet);
    }
  }, []);

  // Remove ipfs:// from URL
  const removeIpfs = (url) => {
    return url.replace(/^ipfs?:\/\//, "");
  };

  const countRitehNFTs = () => {
    let sum = 0;
    assetsMetadata.map((nft, i) => {
      if (
        nft.metadata.name.includes("RiTeh") ||
        nft.metadata.name.includes("RBT") ||
        nft.metadata.description.includes("RiTeh")
      ) {
        if (sum < i + 1) sum = i + 1;
      }
    });
    switch (sum) {
      case 1:
        return "1 RiTeh bedž";
      case 2:
      case 3:
      case 4:
        return `${sum} RiTeh bedža`;
      default:
        return `${sum} RiTeh bedževa`;
    }
  };

  const renderGallery = () => {
    const gallerySection = assetsMetadata.map((nft, i) => {
      console.log(i+1);
      if (
        nft.metadata.name.includes("RiTeh") ||
        nft.metadata.name.includes("RBT") ||
        nft.metadata.description.includes("RiTeh")
      ) {
        // Get ipfs link from metadata and strip down image CID
        const imageCID = removeIpfs(nft.metadata.image);
        const link = `/nft-gallery-eth/${imageCID}`;

        const data = {
          nft: nft,
          imageCID: imageCID,
        };

        return (
          <div className="nftGallery__content__nftCardWrapper">
            <Link to={link} state={data}>
              <div className="nftGallery__content__nftCardWrapper__nftCard">
                <div className="nftGallery__content__nftCardWrapper__nftCard__image">
                  <img
                    src={`https://gateway.pinata.cloud/ipfs/${imageCID}`}
                    alt="nft"
                  ></img>
                </div>
                <div className="nftGallery__content__nftCardWrapper__nftCard__info">
                  <h3>{nft.metadata.name}</h3>
                </div>
              </div>
            </Link>
          </div>
        );
      }
    });
    return gallerySection;
  };

  return (
    <div className="nftGallery">
    <div className="nftGallery__header">
      <div className="nftGallery__header__top">
        <img
          src={require("../images/riteh_logo_transparent.png")}
          alt="logo"
          className="nftGallery__header__top__logo"
        ></img>
        <LogoutButton />
      </div>
      <div className="nftGallery__header__bottom">
        <h3>{walletAddress}</h3>
        <h5>{countRitehNFTs()}</h5>
      </div>
    </div>
    <div className="nftGallery__content">{renderGallery()}</div>
  </div>
  );
};

export default NFTGalleryEth;
