import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";

import DesktopItem from "./components/DesktopItem";
import Notes from "./components/Notes";
import Directory from "./components/Directory";
import TextFile from "./components/TextFile";
import ImageFile from "./components/ImageFile";
import MenuBar from "./components/MenuBar";

const FILES_ENDPOINT = "/api/files/";
const DIRS_ENDPOINT = "/api/directories/";
const DESKTOP_DIRS_ENDPOINT = "/api/directories/?parent__isnull=true";
const DESKTOP_FILES_ENDPOINT = "/api/files/?parent__isnull=true";

export default function App() {
  const [selectedItem, setSelectedItem] = useState("");
  const [openWindows, setOpenWindows] = useState(["welcome.txt"]);
  const [menuBarWindows, setMenuBarWindows] = useState(["welcome.txt"]);
  const [activeWindow, setActiveWindow] = useState("welcome.txt");

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

  function bringToFront(name) {
    let newOpenWindows = openWindows.filter((window) => window !== name);
    newOpenWindows.push(name);
    setOpenWindows(newOpenWindows);
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
      <div className="desktop-items noselect">
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
            menuBarWindows={menuBarWindows}
            setMenuBarWindows={setMenuBarWindows}
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
          menuBarWindows={menuBarWindows}
          setMenuBarWindows={setMenuBarWindows}
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
            menuBarWindows={menuBarWindows}
            setMenuBarWindows={setMenuBarWindows}
            activeWindow={activeWindow}
            setActiveWindow={setActiveWindow}
            bringToFront={bringToFront}
          />
        ))}
      </div>
      {dirs.map(
        (dir, i) =>
          openWindows.includes(dir.name) && (
            <Directory
              id={dir.id}
              name={dir.name}
              key={i}
              bringToFront={bringToFront}
              openWindows={openWindows}
              setOpenWindows={setOpenWindows}
              menuBarWindows={menuBarWindows}
              setMenuBarWindows={setMenuBarWindows}
              activeWindow={activeWindow}
              setActiveWindow={setActiveWindow}
              zIndex={openWindows.indexOf(dir.name)}
            />
          )
      )}
      {files.map(
        (file, i) =>
          openWindows.includes(file.name) &&
          (file.type === "IMG" ? (
            <ImageFile
              id={file.id}
              name={file.name}
              key={i}
              body={file.content}
              width={file.width}
              height={file.height}
              openWindows={openWindows}
              setOpenWindows={setOpenWindows}
              menuBarWindows={menuBarWindows}
              setMenuBarWindows={setMenuBarWindows}
              bringToFront={bringToFront}
              activeWindow={activeWindow}
              setActiveWindow={setActiveWindow}
              zIndex={openWindows.indexOf(file.name)}
            />
          ) : (
            <TextFile
              id={file.id}
              name={file.name}
              key={i}
              body={file.content}
              width={file.width}
              height={file.height}
              openWindows={openWindows}
              setOpenWindows={setOpenWindows}
              menuBarWindows={menuBarWindows}
              setMenuBarWindows={setMenuBarWindows}
              bringToFront={bringToFront}
              activeWindow={activeWindow}
              setActiveWindow={setActiveWindow}
              zIndex={openWindows.indexOf(file.name)}
            />
          ))
      )}
      {openWindows.includes("notes") && (
        <Notes
          openWindows={openWindows}
          setOpenWindows={setOpenWindows}
          menuBarWindows={menuBarWindows}
          setMenuBarWindows={setMenuBarWindows}
          bringToFront={bringToFront}
          activeWindow={activeWindow}
          setActiveWindow={setActiveWindow}
          zIndex={openWindows.indexOf("notes")}
        />
      )}
      <MenuBar
        menuBarWindows={menuBarWindows}
        getWindowTypeByName={getWindowTypeByName}
        activeWindow={activeWindow}
        setActiveWindow={setActiveWindow}
        bringToFront={bringToFront}
        zIndex={openWindows.length}
      />
    </div>
  );
}
