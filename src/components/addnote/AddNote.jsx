import React, { useContext, useState } from "react";
import styles from "./addnote.module.css";
import { colorOptions } from "../../constants/constant";
import NotesContext from "../../context/NotesContext";

const AddNote = () => {
  const { handleNotesCreation, handleModalOpen } = useContext(NotesContext);

  const [selectedColor, setSelectedColor] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = () => {
    if (!name || !selectedColor) {
      return;
    }
    let notesObj = {
      groupName: name,
      color: selectedColor,
      notesText: [],
      id: new Date().getTime(),
    };

    handleNotesCreation(notesObj);
    handleModalOpen();
  };

  const renderedColors = colorOptions.map((color) => {
    return (
      <div
        key={color}
        className={`xs:h-8 xs:w-8 h-6 w-6 ${color} rounded-full cursor-pointer ${
          selectedColor === color ? "border-[1.5px] border-black" : ""
        }`}
        onClick={() => setSelectedColor(color)}
      ></div>
    );
  });

  return (
    <div className={styles.overlay} onClick={handleModalOpen}>
      <div className={styles.addnote} onClick={(e) => e.stopPropagation()}>
        <h4>Create New group</h4>
        <div className={styles.nameInput}>
          <label htmlFor="name">Group Name</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter group name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={styles.colorsField}>
          <label>Choose color</label>
          <div className={styles.colors}>{renderedColors}</div>
        </div>
        <button className={styles.createButton} onClick={handleSubmit}>
          Create
        </button>
      </div>
    </div>
  );
};

export default AddNote;
