import React from "react";

import directory from "../static/pixel/directory.png";
import notes from "../static/pixel/notes.png";
import textfile from "../static/pixel/textfile.png";
import imagefile from "../static/pixel/imagefile.png";

export default function DesktopItem({
  id,
  name,
  icon,
  selectedItem,
  setSelectedItem,
  openWindows,
  setOpenWindows,
  activeWindow,
  setActiveWindow,
  bringToFront,
}) {
  return (
    <div
      className="desktop-item noselect"
      onClick={() => {
        if (selectedItem == name) {
          setSelectedItem("");
        } else {
          setSelectedItem(name);
        }
      }}
      onDoubleClick={() => {
        if (!openWindows.includes(name)) {
          setOpenWindows((openWindows) => [...openWindows, name]);
        }
        setActiveWindow(name);
        bringToFront(name);
        setSelectedItem("");
      }}
    >
      <div
        className={
          selectedItem == name ? "selected-desktop-icon" : "desktop-icon"
        }
      >
        {icon == "DIR" ? (
          <img draggable="false" src={directory} />
        ) : icon == "notes" ? (
          <img draggable="false" src={notes} />
        ) : icon == "textfile" ? (
          <img draggable="false" src={textfile} />
        ) : icon == "imagefile" ? (
          <img draggable="false" src={imagefile} />
        ) : (
          <img />
        )}
      </div>
      <div
        className={
          selectedItem == name ? "selected-desktop-label" : "desktop-label"
        }
      >
        <span>{name}</span>
      </div>
    </div>
  );
}
