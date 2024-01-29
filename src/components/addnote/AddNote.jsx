import React, { useContext, useState } from "react";
import styles from "./addnote.module.css";
import { colorOptions } from "../../constants/constant";
import NotesContext from "../../context/NotesContext";

const AddNote = () => {
  const { handleNotesCreation, handleModalOpen } = useContext(NotesContext);

  const [selectedColor, setSelectedColor] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState({ nameError: false, colorError: false });

  const handleSubmit = () => {
    if (!name) {
      setError((prev) => {
        return {
          ...prev,
          nameError: true,
        };
      });
    }
    if (!selectedColor) {
      setError((prev) => {
        return {
          ...prev,
          colorError: true,
        };
      });
    }
    if (selectedColor && name) {
      let notesObj = {
        groupName: name,
        color: selectedColor,
        notesText: [],
        id: new Date().getTime(),
      };

      handleNotesCreation(notesObj);
      handleModalOpen();
    }
  };

  const renderedColors = colorOptions.map((color) => {
    return (
      <div
        key={color}
        className={`xs:h-8 xs:w-8 h-6 w-6 ${color} rounded-full cursor-pointer ${
          selectedColor === color ? "border-[1.5px] border-black" : ""
        }`}
        onClick={() => {
          setSelectedColor(color);
          setError((prev) => {
            return {
              ...prev,
              colorError: false,
            };
          });
        }}
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
            onChange={(e) => {
              setError((prev) => {
                return {
                  ...prev,
                  nameError: false,
                };
              });
              setName(e.target.value);
            }}
          />
        </div>
        {error.nameError && (
          <p className={styles.error}>Group name is required</p>
        )}
        <div className={styles.colorsField}>
          <label>Choose color</label>
          <div className={styles.colors}>{renderedColors}</div>
        </div>
        {error.colorError && <p className={styles.error}>Color is required</p>}
        <button className={styles.createButton} onClick={handleSubmit}>
          Create
        </button>
      </div>
    </div>
  );
};

export default AddNote;
