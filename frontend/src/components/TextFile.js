import React from "react";

import Draggable from "react-draggable";
import WindowHeader from "./WindowHeader";

export default function TextFile({
  id,
  name,
  body,
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
    <Draggable bounds="parent">
      <div
        style={{ zIndex: zIndex }}
        className={
          activeWindow == name ? "window active text-file" : "window text-file"
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
