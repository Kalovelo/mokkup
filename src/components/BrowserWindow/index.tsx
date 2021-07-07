import { DeviceContext } from "contexts/Device";
import { BrowserOptions } from "contexts/Device/types";
import React from "react";
import "./BrowserWindow.css";
import { INPUT_PLACEHOLDER } from "./constants";

const BrowserWindow: React.FC = () => {
  const context = React.useContext(DeviceContext)!;

  const options = context.device.options as BrowserOptions;
  React.useEffect(() => console.log(options));

  return (
    <div className="BrowserWindow">
      <div style={{ background: options.isDark ? "#353D44" : "#f1f1f1" }} className="BrowserWindow__row">
        <div className="BrowserWindow__column BrowserWindow__left">
          <span className="dot" style={{ background: options.isStealth ? "#969696" : "#ED594A" }}></span>
          <span className="dot" style={{ background: options.isStealth ? "#969696" : "#FDD800" }}></span>
          <span className="dot" style={{ background: options.isStealth ? "#969696" : "#5AC05A" }}></span>
        </div>
        <div className="BrowserWindow__column BrowserWindow__middle">
          <input
            style={{
              display: options.isBarHidden ? "none" : "",
              background: options.isDark ? "#3D464F" : "#fff",
              color: options.isDark ? "#fff" : "#000",
            }}
            className="BrowserWindow__input"
            type="text"
            defaultValue={INPUT_PLACEHOLDER}
          />
        </div>
        <div style={{ display: options.isToggleHidden ? "none" : "" }} className="BrowserWindow__column BrowserWindow__right">
          <span style={{ background: options.isDark ? "#807e7e" : "#aaa" }} className="bar"></span>
          <span style={{ background: options.isDark ? "#807e7e" : "#aaa  " }} className="bar"></span>
          <span style={{ background: options.isDark ? "#807e7e" : "#aaa" }} className="bar"></span>
        </div>
      </div>
    </div>
  );
};

export default React.memo(BrowserWindow);