import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import * as moment from "moment";
import "./styles.css";

import DesktopItem from "./components/DesktopItem";
import Notes from "./components/Notes";
import Directory from "./components/Directory";
import TextFile from "./components/TextFile";
import ImageFile from "./components/ImageFile";
import MenuBar from "./components/MenuBar";

const FILES_ENDPOINT = "/files/";
const DIRS_ENDPOINT = "/directories/";
const DESKTOP_DIRS_ENDPOINT = "/directories/?parent__isnull=true";
const DESKTOP_FILES_ENDPOINT = "/files/?parent__isnull=true";

export default function App() {
  const [selectedItem, setSelectedItem] = useState("");
  const [openWindows, setOpenWindows] = useState(["welcome.txt"]);
  const [activeWindow, setActiveWindow] = useState("welcome.txt");
  const [highestIndex, setHighestIndex] = useState(0);

  const [files, setFiles] = useState([]);
  const [dirs, setDirs] = useState([]);
  const [desktopDirs, setDesktopDirs] = useState([]);
  const [desktopFiles, setDesktopFiles] = useState([]);

  useEffect(() => {
    (async () => {
      // Get all files to render
      const filesRes = await axios.get(FILES_ENDPOINT);
      // Get all directories to render
      const dirsRes = await axios.get(DIRS_ENDPOINT);
      // Get desktop directories to display icons
      const desktopDirsRes = await axios.get(DESKTOP_DIRS_ENDPOINT);
      // Get desktop files to display icons
      const desktopFilesRes = await axios.get(DESKTOP_FILES_ENDPOINT);

      setFiles(filesRes.data);
      setDirs(dirsRes.data);
      setDesktopDirs(desktopDirsRes.data);
      setDesktopFiles(desktopFilesRes.data);
    })();
  }, []);

  function bringToFront(element) {
    element.style.zIndex = highestIndex + 1;
    setHighestIndex(highestIndex + 1);
  }

  function getWindowTypeByName(name) {
    if (name === "notes") return "NTS";

    let dirNames = dirs.map((dir) => dir.name);
    let fileNames = files.map((file) => file.name);
    let fileTypes = files.map((file) => file.type);

    return dirNames.includes(name) ? "DIR" : fileTypes[fileNames.indexOf(name)];
  }

  return (
    <div className="desktop">
      <div className="desktop-items">
        {desktopDirs.map((dir, i) => (
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
        <DesktopItem
          id="notes"
          name="notes"
          icon="notes"
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          openWindows={openWindows}
          setOpenWindows={setOpenWindows}
          activeWindow={activeWindow}
          setActiveWindow={setActiveWindow}
          bringToFront={bringToFront}
        />
        {desktopFiles.map((file, i) => (
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
      {dirs.map(
        (dir) =>
          openWindows.includes(dir.name) && (
            <Directory
              id={dir.id}
              name={dir.name}
              bringToFront={bringToFront}
              openWindows={openWindows}
              setOpenWindows={setOpenWindows}
              activeWindow={activeWindow}
              setActiveWindow={setActiveWindow}
            />
          )
      )}
      {files.map(
        (file) =>
          openWindows.includes(file.name) &&
          (file.type === "IMG" ? (
            <ImageFile
              key={file.id}
              id={file.id}
              name={file.name}
              body={file.content}
              openWindows={openWindows}
              setOpenWindows={setOpenWindows}
              bringToFront={bringToFront}
              activeWindow={activeWindow}
              setActiveWindow={setActiveWindow}
            />
          ) : (
            <TextFile
              key={file.id}
              id={file.id}
              name={file.name}
              body={file.content}
              openWindows={openWindows}
              setOpenWindows={setOpenWindows}
              bringToFront={bringToFront}
              activeWindow={activeWindow}
              setActiveWindow={setActiveWindow}
            />
          ))
      )}
      {openWindows.includes("notes") && (
        <Notes
          openWindows={openWindows}
          setOpenWindows={setOpenWindows}
          bringToFront={bringToFront}
          activeWindow={activeWindow}
          setActiveWindow={setActiveWindow}
        />
      )}
      <MenuBar
        openWindows={openWindows}
        getWindowTypeByName={getWindowTypeByName}
        activeWindow={activeWindow}
        setActiveWindow={setActiveWindow}
      />
    </div>
  );
}
