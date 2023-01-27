import logo from "./logo_512x512.jpg";
import "./App.css";
import ConnectWallet from "./components/ConnectWallet";
import ContractCallVote from "./components/ContractCallVote";
import { useEffect, useState } from "react";
import axios from 'axios';

function App() {
  const [mdData, setMdData] = useState();
  axios.get(window.location.origin + '/README.md').then(({ data }) => {
    setMdData(data);
  })

  useEffect(() => {

  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <h2>Riddimz</h2>

        {/* ConnectWallet file: `./src/components/ConnectWallet.js` */}
        <ConnectWallet />

        {/* ContractCallVote file: `./src/components/ContractCallVote.js` */}
        <ContractCallVote mdData={mdData} />

        <p>

        </p>
      </header>
    </div>
  );
}

export default App;
