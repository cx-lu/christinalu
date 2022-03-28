import React, { useState, useEffect } from "react";
import axios from "axios";
import * as moment from "moment";

import Draggable from "react-draggable";
import notesIcon from "../static/pixel/notes.png";

const NOTES_ENDPOINT = "/notes/";

export default function Notes({
  openWindows,
  setOpenWindows,
  bringToFront,
  activeWindow,
  setActiveWindow,
  menuBarWindows,
  setMenuBarWindows,
  zIndex,
}) {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState({});
  const [selectedNoteIndex, setSelectedNoteIndex] = useState(0);

  useEffect(() => {
    axios
      .get(NOTES_ENDPOINT)
      .then((res) => {
        setNotes(res.data);
        if (res.data.length !== 0) {
          setSelectedNote(res.data[0]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Draggable bounds="parent">
      <div
        style={{ zIndex: zIndex }}
        className={activeWindow === "notes" ? "window active" : "window"}
        id="notes"
        onPointerDown={() => {
          bringToFront("notes");
          setActiveWindow("notes");
        }}
      >
        <div className="window-header">
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <img draggable="false" src={notesIcon} height="15px" />
            &nbsp;notes
          </div>
          <button
            className="x-button"
            onClick={() => {
              setOpenWindows(openWindows.filter((item) => item !== "notes"));
              setMenuBarWindows(
                menuBarWindows.filter((item) => item !== "notes")
              );
            }}
          >
            X
          </button>
        </div>
        <div className="window-body" id="notes-body">
          <div className="notes-sidebar">
            {notes.map((note, i) => (
              <div
                key={i}
                className={
                  selectedNoteIndex === i
                    ? "selected-notes-preview"
                    : "notes-preview"
                }
                onClick={() => {
                  setSelectedNote(notes[i]);
                  setSelectedNoteIndex(i);
                }}
              >
                {note.title}
                <br />
                <span>
                  {moment(note.date).utc().format("MM/DD/YY")}
                  &nbsp;
                  {note.content}
                </span>
              </div>
            ))}
          </div>
          <div className="notes-content">
            <div className="notes-date">
              {moment(selectedNote.date)
                .utc()
                .format("MMMM D, YYYY [at] h:mm A")}
            </div>
            {selectedNote.title}
            <br />
            {selectedNote.content}
          </div>
        </div>
      </div>
    </Draggable>
  );
}
