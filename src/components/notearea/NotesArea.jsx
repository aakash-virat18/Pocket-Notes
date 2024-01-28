import React, { useContext, useEffect, useState } from "react";
import styles from "./notesarea.module.css";
import NotesContext from "../../context/NotesContext";
import enable from "../../assets/send.svg";
import disable from "../../assets/send-disable.svg";
import people from "../../assets/image.svg";
import back from "../../assets/back.svg";

const GroupIcon = ({ note }) => {
  const arr = note.groupName.split(" ");
  let initals = "";
  if (arr.length > 1) {
    initals = arr[0][0].toUpperCase() + arr[1][0].toUpperCase();
  } else {
    initals = arr[0][0].toUpperCase();
  }
  return (
    <div className={styles.groupname}>
      <div className={`${styles.groupicon} ${note.color}`}>{initals}</div>
      <p>{note.groupName}</p>
    </div>
  );
};

const TextBox = ({ text, date }) => {
  return (
    <div className={styles.textbox}>
      <p>{text}</p>
      <div>{date}</div>
    </div>
  );
};

const NotesArea = () => {
  const { selectedGroup, addNote, handleSelectedGroup } =
    useContext(NotesContext);
  const [text, setText] = useState("");

  return (
    <>
      {selectedGroup ? (
        <div className={styles.notesarea}>
          <div className={styles.upper}>
            <img
              src={back}
              className={styles.back}
              onClick={() => handleSelectedGroup("")}
            />
            <GroupIcon note={selectedGroup} />
          </div>
          <div className={styles.notessection}>
            {selectedGroup.notesText.map((note, id) => {
              return <TextBox key={id} text={note.text} date={note.date} />;
            })}
          </div>
          <div className={styles.lower}>
            <textarea
              className={styles.textarea}
              placeholder="Enter text"
              onChange={(e) => setText(e.target.value)}
              value={text}
            />
            <button
              className={styles.send}
              onClick={() => {
                if (text) {
                  addNote(text);
                  setText("");
                }
              }}
            >
              {text ? <img src={enable} /> : <img src={disable} />}
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.home}>
          <img src={people} />
          <h1>Pocket Notes</h1>
          <p>
            Send and receive messages without keeping your phone online. <br />
            Use Pocket Notes on up to 4 linked devices and 1 mobile phone
          </p>
          <div className={styles.encrypt}></div>
        </div>
      )}
    </>
  );
};

export default NotesArea;
