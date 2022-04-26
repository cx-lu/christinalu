import React from "react";

import Draggable from "react-draggable";
import WindowHeader from "./WindowHeader";

export default function TextFile({
  id,
  name,
  body,
  width,
  height,
  openWindows,
  setOpenWindows,
  menuBarWindows,
  setMenuBarWindows,
  bringToFront,
  activeWindow,
  setActiveWindow,
  zIndex,
}) {
  return (
    <Draggable bounds="parent" handle=".window-header">
      <div
        style={{
          zIndex: zIndex,
          width: width + "px",
          height: height + "px",
          top: "calc(50% - " + height / 2 + "px)",
          left: "calc(50% - " + width / 2 + "px)",
        }}
        className={
          activeWindow === name ? "window active text-file" : "window text-file"
        }
        id={id}
        onPointerDown={() => {
          bringToFront(name);
          setActiveWindow(name);
        }}
      >
        <WindowHeader
          type="TXT"
          name={name}
          xFunction={() => {
            setOpenWindows(openWindows.filter((item) => item !== name));
            setMenuBarWindows(menuBarWindows.filter((item) => item !== name));
          }}
        />
        <div className="window-body text-body">{body}</div>
      </div>
    </Draggable>
  );
}
