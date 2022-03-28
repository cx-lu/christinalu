import React from "react";

import Draggable from "react-draggable";
import imagefile from "../static/pixel/imagefile.png";

export default function ImageFile({
  id,
  name,
  body,
  openWindows,
  setOpenWindows,
  bringToFront,
  activeWindow,
  setActiveWindow,
}) {
  return (
    <Draggable bounds="parent">
      <div
        className={
          activeWindow == name ? "window active text-file" : "window text-file"
        }
        id={id}
        onPointerDown={(e) => {
          bringToFront(e.currentTarget);
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
