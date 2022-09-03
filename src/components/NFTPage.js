import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import { MdArrowBack } from "react-icons/md";

const NFTPage = () => {
  const location = useLocation();
  let navigate = useNavigate();
  const nft = location.state.nft;
  const imageCID = location.state.imageCID;
  const name = nft.onchain_metadata.name;
  const description = nft.onchain_metadata.description;
  const asset = nft.asset;
  const assetName = nft.asset_name;
  const policyID = nft.policy_id;
  const fingerprint = nft.fingerprint;

  return (
    <div className="nftPage">
      <div className="nftPage__header">
        <div className="nftPage__header__top">
          <MdArrowBack onClick={() => navigate(-1)} />
          <LogoutButton />
        </div>
        <div className="nftPage__header__bottom">
          <h3>{name}</h3>
        </div>
      </div>
      <div className="nftPage__content">
        <div className="nftPage__content__image">
          <img
            src={`https://gateway.pinata.cloud/ipfs/${imageCID}`}
            alt="nft"
          ></img>
        </div>
        <div className="nftPage__content__info">
          <div className="nftPage__content__info__section">
            <h3>Opis</h3>
            <h4>{description}</h4>
          </div>
          <div className="nftPage__content__info__section">
            <h3>Asset</h3>
            <h4>{asset}</h4>
          </div>
          <div className="nftPage__content__info__section">
            <h3>Asset name</h3>
            <h4>{assetName}</h4>
          </div>
          <div className="nftPage__content__info__section">
            <h3>Policy ID</h3>
            <h4>{policyID}</h4>
          </div>
          <div className="nftPage__content__info__section">
            <h3>Fingerprint</h3>
            <h4>{fingerprint}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTPage;
