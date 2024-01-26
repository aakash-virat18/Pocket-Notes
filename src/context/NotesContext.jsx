import { createContext, useState } from "react";
import { months } from "../constants/constant";

const NotesContext = createContext();

const Provider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notes, setNotes] = useState(JSON.parse(localStorage.getItem("notes")));
  const [selectedGroup, setSelectedGroup] = useState("");

  const handleModalOpen = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleNotesCreation = (obj) => {
    if (!notes) {
      setNotes([obj]);
      return;
    }
    setNotes((prev) => [...prev, obj]);
  };

  const addNote = (text) => {
    const d = new Date();
    const date =
      d.getDate() +
      " " +
      months[d.getMonth()] +
      " " +
      d.getFullYear() +
      " | " +
      d.getHours() +
      ":" +
      d.getMinutes();

    setNotes((prev) => {
      return prev.map((note) => {
        if (note.id === selectedGroup.id) {
          note.notesText.unshift({
            text,
            date,
          });
        }
        return note;
      });
    });
    localStorage.setItem("notes", JSON.stringify(notes));
  };

  const handleSelectedGroup = (group) => {
    setSelectedGroup(group);
  };

  return (
    <NotesContext.Provider
      value={{
        isModalOpen,
        handleModalOpen,
        notes,
        handleNotesCreation,
        selectedGroup,
        handleSelectedGroup,
        addNote,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export default NotesContext;

export { Provider };
