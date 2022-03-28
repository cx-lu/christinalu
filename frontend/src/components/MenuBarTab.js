import React from "react";

import directory from "../static/pixel/directory.png";
import notes from "../static/pixel/notes.png";
import textfile from "../static/pixel/textfile.png";
import imagefile from "../static/pixel/imagefile.png";

export default function MenuBarTab({
  name,
  type,
  activeWindow,
  setActiveWindow,
  bringToFront,
}) {
  return (
    <div
      className={activeWindow == name ? "active-open-file" : "open-file"}
      key={name}
      onMouseDown={() => {
        setActiveWindow(name);
        bringToFront(name);
      }}
    >
      <img
        draggable="false"
        src={
          type === "NTS"
            ? notes
            : type === "IMG"
            ? imagefile
            : type === "DIR"
            ? directory
            : textfile
        }
        height="15px"
      />
      &nbsp;{name}
    </div>
  );
}
