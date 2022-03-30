import React from "react";

import Draggable from "react-draggable";
import WindowHeader from "./WindowHeader";

export default function ImageFile({
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
          activeWindow == name
            ? "window active image-file"
            : "window image-file"
        }
        id={id}
        onPointerDown={() => {
          bringToFront(name);
          setActiveWindow(name);
        }}
      >
        <WindowHeader
          type="IMG"
          name={name}
          xFunction={() => {
            setOpenWindows(openWindows.filter((item) => item !== name));
            setMenuBarWindows(menuBarWindows.filter((item) => item !== name));
          }}
        />
        <div className="window-body">
          <img
            draggable="false"
            src={body}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "fill",
              marginBottom: "-5px",
            }}
          />
        </div>
      </div>
    </Draggable>
  );
}
