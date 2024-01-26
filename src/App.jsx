import { useContext } from "react";
import SideBar from "../src/components/sidebar/SideBar";
import AddNote from "./components/addnote/AddNote";
import NotesContext from "./context/NotesContext";
import NotesArea from "./components/notearea/NotesArea";

function App() {
  const { isModalOpen } = useContext(NotesContext);

  return (
    <div className="h-screen w-screen flex">
      <SideBar />
      <NotesArea />
      {isModalOpen && <AddNote />}
    </div>
  );
}

export default App;
