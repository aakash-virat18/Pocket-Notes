import React, { useContext } from "react";
import styles from "./sidebar.module.css";
import NotesContext from "../../context/NotesContext";

const GroupIcon = ({ note }) => {
  const { selectedGroup, handleSelectedGroup } = useContext(NotesContext);

  const arr = note.groupName.split(" ");
  let initals = "";
  if (arr.length > 1) {
    initals = arr[0][0].toUpperCase() + arr[1][0].toUpperCase();
  } else {
    initals = arr[0][0].toUpperCase();
  }
  return (
    <div
      className={`${styles.groupname} ${
        selectedGroup.id === note.id ? "bg-[#2F2F2F] bg-opacity-[17%]" : ""
      }`}
      onClick={() => handleSelectedGroup(note)}
    >
      <div className={`${styles.groupicon} ${note.color}`}>{initals}</div>
      <p>{note.groupName}</p>
    </div>
  );
};

const SideBar = () => {
  const { handleModalOpen, notes, selectedGroup } = useContext(NotesContext);

  return (
    <div className={`${selectedGroup ? styles.sidebarHidden : styles.sidebar}`}>
      <div className={styles.headingContainer}>
        <h3>Pocket Notes</h3>
      </div>
      <div className={styles.groups}>
        {notes?.map((note) => {
          return <GroupIcon note={note} key={note.id} />;
        })}
      </div>
      <div className={styles.addButton} onClick={handleModalOpen}>
        <p className={styles.add}>+</p>
      </div>
    </div>
  );
};

export default SideBar;
