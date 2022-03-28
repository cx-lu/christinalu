import React from "react";

import Draggable from "react-draggable";
import imagefile from "../static/pixel/imagefile.png";

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
          activeWindow == name ? "window active text-file" : "window text-file"
        }
        id={id}
        onPointerDown={() => {
          bringToFront(name);
          setActiveWindow(name);
        }}
      >
        <div className="window-header">
          <div className="window-header-label">
            <img draggable="false" src={imagefile} height="15px" />
            &nbsp;{name}
          </div>
          <button
            className="x-button"
            onClick={() => {
              setOpenWindows(openWindows.filter((item) => item !== name));
              setMenuBarWindows(menuBarWindows.filter((item) => item !== name));
            }}
          >
            X
          </button>
        </div>
        <div className="window-body">
          <img src={body} />
        </div>
      </div>
    </Draggable>
  );
}
