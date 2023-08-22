import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from 'axios';

function App() {
  const [notes, setNotes] = useState([]);

  function addNote(newNote) {
    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    });
  }

  const deleteRequest = async (backendId) => {

    try {
      const response = await axios.delete(`https://mytodolist-rlgg.onrender.com/api/todo/delete_ToDo/${backendId}`);
      console.log(response);

    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const  deleteNote = async (id, backendId) => {
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });

    await deleteRequest(backendId);
  }

  const getRequest = async () => {

    try {
      const response = await axios.get('https://mytodolist-rlgg.onrender.com/api/todo/viewAll_ToDo');
      console.log(response);

      setNotes(prevNotes => {
        return [...prevNotes, ...response.data]
      });

    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  useEffect(() => {
    // Fetch data when the component mounts
    getRequest();
  }, []);

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            backendId={noteItem.id}
            title={noteItem.heading}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
