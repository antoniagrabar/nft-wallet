import './App.scss';
import { Routes, Route } from "react-router-dom";
import Dashboard from './components/Dashboard';
import NFTGalleryEth from './components/NFTGalleryEth';
import NFTGalleryCardano from './components/NFTGalleryCardano';
import NFTPage from './components/NFTPage';

function App() {
  const stakeAddress = JSON.parse(localStorage.getItem("stakeAddress"));
  const walletAddressEth = JSON.parse(localStorage.getItem("walletAddressEth"));

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        {walletAddressEth && <Route path="nft-gallery-eth" element={<NFTGalleryEth />} />}
        {walletAddressEth && <Route path="nft-gallery-eth/:cid" element={<NFTPage/>} />}
        {stakeAddress && <Route path="nft-gallery-cardano" element={<NFTGalleryCardano />} />}
        {stakeAddress && <Route path="nft-gallery-cardano/:cid" element={<NFTPage />} />}
      </Routes>
    </div>
  );
}

export default App;
