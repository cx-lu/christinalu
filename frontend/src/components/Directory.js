import React, { useState, useEffect } from "react";
import axios from "axios";
import Draggable from "react-draggable";
import DesktopItem from "./DesktopItem";
import WindowHeader from "./WindowHeader";

const DIRS_ENDPOINT = "/directories/?parent=";
const FILES_ENDPOINT = "/files/?parent=";

export default function Directory({
  id,
  name,
  bringToFront,
  openWindows,
  setOpenWindows,
  menuBarWindows,
  setMenuBarWindows,
  activeWindow,
  setActiveWindow,
  zIndex,
}) {
  const [selectedItem, setSelectedItem] = useState("");
  const [files, setFiles] = useState([]);
  const [dirs, setDirs] = useState([]);

  useEffect(() => {
    (async () => {
      // Get subdirectories in directory to display icons
      const dirsRes = await axios.get(DIRS_ENDPOINT + id);
      // Get files in directory to display icons
      const filesRes = await axios.get(FILES_ENDPOINT + id);

      setDirs(dirsRes.data);
      setFiles(filesRes.data);
    })();
  }, []);

  return (
    <Draggable cancel=".desktop-item" bounds="parent">
      <div
        id={id}
        style={{ zIndex: zIndex }}
        className={
          activeWindow == name ? "window active directory" : "window directory"
        }
        onPointerDown={() => {
          bringToFront(name);
          setActiveWindow(name);
        }}
      >
        <WindowHeader
          type="DIR"
          name={name}
          xFunction={() => {
            setOpenWindows(openWindows.filter((item) => item !== name));
            setMenuBarWindows(menuBarWindows.filter((item) => item !== name));
          }}
        />
        <div className="window-body directory-body">
          {dirs.map((dir, i) => (
            <DesktopItem
              id={dir.id}
              name={dir.name}
              key={i}
              icon="DIR"
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
              openWindows={openWindows}
              setOpenWindows={setOpenWindows}
              menuBarWindows={menuBarWindows}
              setMenuBarWindows={setMenuBarWindows}
              activeWindow={activeWindow}
              setActiveWindow={setActiveWindow}
              bringToFront={bringToFront}
            />
          ))}
          {files.map((file, i) => (
            <DesktopItem
              id={file.id}
              name={file.name}
              key={i}
              icon={file.type === "TXT" ? "textfile" : "imagefile"}
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
              openWindows={openWindows}
              setOpenWindows={setOpenWindows}
              menuBarWindows={menuBarWindows}
              setMenuBarWindows={setMenuBarWindows}
              activeWindow={activeWindow}
              setActiveWindow={setActiveWindow}
              bringToFront={bringToFront}
            />
          ))}
        </div>
      </div>
    </Draggable>
  );
}
