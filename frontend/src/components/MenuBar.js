import React, { useState, useEffect } from "react";
import "../styles.css";
import * as moment from "moment";
import MenuBarTab from "./MenuBarTab";

import cactus from "../static/pixel/cactus.png";

export default function MenuBar({
  openWindows,
  getWindowTypeByName,
  activeWindow,
  setActiveWindow,
}) {
  const [now, setNow] = useState(moment());

  // Get current time for display
  useEffect(() => {
    let timer = setInterval(() => {
      setNow(moment());
    }, 1000); // every second
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="menu-bar">
      <div className="menu-bar-content">
        <div className="menu-bar-left">
          <div className="menu-bar-start">
            <img src={cactus} />
            <strong>&nbsp;C</strong>/<strong>LU</strong>
          </div>
          <div className="menu-bar-windows">
            {openWindows.map((window, i) => (
              <MenuBarTab
                key={i}
                name={window}
                type={getWindowTypeByName(window)}
                activeWindow={activeWindow}
                setActiveWindow={setActiveWindow}
              />
            ))}
          </div>
        </div>
        <div className="menu-bar-time">{now.format("h:mm A")}</div>
      </div>
    </div>
  );
}
