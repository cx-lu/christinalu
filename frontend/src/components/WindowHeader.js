import React from "react";

import textfile from "../static/pixel/textfile.png";
import imagefile from "../static/pixel/imagefile.png";
import notes from "../static/pixel/notes.png";
import directory from "../static/pixel/directory.png";

export default function WindowHeader({ type, name, xFunction }) {
  return (
    <div className="window-header">
      <div className="window-header-label">
        <img
          draggable="false"
          src={
            type === "TXT"
              ? textfile
              : type === "IMG"
              ? imagefile
              : type === "DIR"
              ? directory
              : notes
          }
          height="15px"
        />
        &nbsp;{name}
      </div>
      <button
        className="x-button noselect"
        onClick={xFunction}
        onTouchEnd={xFunction}
      >
        X
      </button>
    </div>
  );
}
