import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";

const NFTGalleryCardano = () => {
  const stakeAddress = JSON.parse(localStorage.getItem("stakeAddress"));
  const changeAddress = JSON.parse(localStorage.getItem("changeAddress"));
  const [assets, setAssets] = useState([]);
  const [assetsMetadata, setAssetsMetadata] = useState([]);

  const getAssets = async () => {
    axios
      .get(
        `https://cardano-mainnet.blockfrost.io/api/v0/accounts/${stakeAddress}/addresses/assets`,
        {
          headers: {
            project_id: process.env.REACT_APP_PROJECT_ID,
          },
        }
      )
      .then((res) => {
        setAssets(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getMetadata = async (asset) => {
    axios
      .get(`https://cardano-mainnet.blockfrost.io/api/v0/assets/${asset}`, {
        headers: {
          project_id: process.env.REACT_APP_PROJECT_ID,
        },
      })
      .then((res) => {
        setAssetsMetadata((prevArray) => [...prevArray, res.data]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (stakeAddress !== "") {
      getAssets();
    }
  }, []);

  useEffect(() => {
    assets.map((asset) => getMetadata(asset.unit));
  }, [assets]);

  const countRitehNFTs = () => {
    let sum = 0;
    assetsMetadata.map((nft, i) => {
      if (
        nft.onchain_metadata.name.includes("RiTeh") ||
        nft.onchain_metadata.description.includes("RiTeh")
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

  // Remove ipfs:// from URL
  const removeIpfs = (url) => {
    return url.replace(/^ipfs?:\/\//, "");
  };

  const renderGallery = () => {
    const gallerySection = assetsMetadata.map((nft, i) => {
      if (
        nft.onchain_metadata.name.includes("RiTeh") ||
        nft.onchain_metadata.description.includes("RiTeh")
      ) {
        // Get ipfs link from metadata and strip down image CID
        const imageCID = removeIpfs(nft.onchain_metadata.image);
        const link = `/nft-gallery-cardano/${imageCID}`;

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
                  <h3>{nft.onchain_metadata.name}</h3>
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
          <h3>{changeAddress}</h3>
          <h5>{countRitehNFTs()}</h5>
        </div>
      </div>
      <div className="nftGallery__content">{renderGallery()}</div>
    </div>
  );
};

export default NFTGalleryCardano;
