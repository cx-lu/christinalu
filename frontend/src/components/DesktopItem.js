import React, { useState } from "react";

import directory from "../static/pixel/directory.png";
import notes from "../static/pixel/notes.png";
import textfile from "../static/pixel/textfile.png";
import imagefile from "../static/pixel/imagefile.png";

let clickCount = 0;
let clickTimer = "";

export default function DesktopItem({
  name,
  icon,
  selectedItem,
  setSelectedItem,
  openWindows,
  setOpenWindows,
  setActiveWindow,
  bringToFront,
  menuBarWindows,
  setMenuBarWindows,
}) {
  function selectDesktopItem() {
    if (selectedItem == name) {
      setSelectedItem("");
    } else {
      setSelectedItem(name);
    }
  }

  function launchDesktopItem() {
    if (!openWindows.includes(name)) {
      setOpenWindows((openWindows) => [...openWindows, name]);
    }
    if (!menuBarWindows.includes(name)) {
      setMenuBarWindows((menuBarWindows) => [...menuBarWindows, name]);
    }
    setActiveWindow(name);
    bringToFront(name);
    setSelectedItem("");
  }

  // Enables double click on mobile
  function handleClicks() {
    clickCount++;
    if (clickCount === 1) {
      selectDesktopItem();
      clickTimer = setTimeout(() => {
        clickCount = 0;
      }, 300);
    } else if (clickCount === 2) {
      clearTimeout(clickTimer);
      clickCount = 0;
      launchDesktopItem();
    }
  }

  return (
    <div className="desktop-item noselect" onClick={handleClicks}>
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
