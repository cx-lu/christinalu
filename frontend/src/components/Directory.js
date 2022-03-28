import React, { useState, useEffect } from "react";
import axios from "axios";
import Draggable from "react-draggable";
import DesktopItem from "./DesktopItem";
import directory from "../static/pixel/directory.png";

const DIRS_ENDPOINT = "/directories/?parent=";
const FILES_ENDPOINT = "/files/?parent=";

export default function Directory({
  id,
  name,
  bringToFront,
  openWindows,
  setOpenWindows,
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
    <Draggable bounds="parent">
      <div
        style={{ zIndex: zIndex }}
        className={
          activeWindow == name ? "window active directory" : "window directory"
        }
        id={id}
        onPointerDown={() => {
          bringToFront(name);
          setActiveWindow(name);
        }}
      >
        <div className="window-header">
          <div className="window-header-label">
            <img draggable="false" src={directory} height="15px" />
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
        <div
          className="window-body"
          style={{
            display: "flex",
            flexFlow: "row wrap",
            justifyContent: "flex-start",
            alignContent: "flex-start",
            overflow: "scroll",
          }}
        >
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
