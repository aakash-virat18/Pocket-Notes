import { createContext, useEffect, useState } from "react";
import { months } from "../constants/constant";

const NotesContext = createContext();

const Provider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notes, setNotes] = useState(JSON.parse(localStorage.getItem("notes")));
  const [selectedGroup, setSelectedGroup] = useState("");

  const handleModalOpen = () => {
    setIsModalOpen((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const handleNotesCreation = (obj) => {
    if (!notes) {
      setNotes([obj]);
      return;
    }
    setNotes((prev) => [...prev, obj]);
  };

  const addNote = (text) => {
    const d = new Date();
    const day = Number(d.getHours()) > 11 ? "PM" : "AM";
    let hour =
      Number(d.getHours()) > 12
        ? Number(d.getHours()) - 12
        : Number(d.getHours());
    hour = hour < 10 ? "0" + hour : hour;
    const minute =
      Number(d.getMinutes()) < 10 ? "0" + d.getMinutes() : d.getMinutes();
    const date =
      d.getDate() +
      " " +
      months[d.getMonth()] +
      " " +
      d.getFullYear() +
      " | " +
      hour +
      ":" +
      minute +
      " " +
      day;

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
