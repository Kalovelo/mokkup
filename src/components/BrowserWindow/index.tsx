import React from "react";
import "./BrowserWindow.css";

const BrowserWindow: React.FC = () => {
  return (
    <div className="BrowserWindow">
      <div className="BrowserWindow__row">
        <div className="BrowserWindow__column BrowserWindow__left">
          <span className="dot" style={{ background: "#ED594A" }}></span>
          <span className="dot" style={{ background: "#FDD800" }}></span>
          <span className="dot" style={{ background: "#5AC05A" }}></span>
        </div>
        <div className="BrowserWindow__column BrowserWindow__middle">
          <input className="BrowserWindow__input" type="text" />
        </div>
        <div className="BrowserWindow__column BrowserWindow__right">
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </div>
  );
};

export default React.memo(BrowserWindow);
