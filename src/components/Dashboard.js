import React from "react";
import { Link } from "react-router-dom";
import SelectWallet from "./modals/SelectWallet";

function Dashboard() {
  return (
    <Link to="/">
      <div className="dashboard">
        <div className="dashboard__container">
          {
            <img
              src={require("../images/riteh_logo_transparent.png")}
              alt="logo"
              className="dashboard__container__logo"
            ></img>
          }
          <SelectWallet />
        </div>
      </div>
    </Link>
  );
}

export default Dashboard;
