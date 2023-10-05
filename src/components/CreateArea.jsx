import React, { useState } from "react";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import axios from 'axios';
import { collection, addDoc } from 'firebase/firestore';
import { db } from './Firebase';

function CreateArea(props) {

  const [note, setNote] = useState({
    heading: "",
    content: "",
    id : null
  });


  var [expandState, SetExpand] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  const postNoteRequest = async () => {

    var id = 0;
    try {
      const userIds = localStorage.getItem('userId');
      const response = await axios.post('https://mytodolist-rlgg.onrender.com/api/todo/add_ToDo', 
      { heading: note.heading, content : note.content, style: "", color : "", userId : userIds });
      console.log(response);

      id = response.data;

    } catch (error) {
      console.error('Error posting data:', error);
    }

    props.onAdd({heading: note.heading, content : note.content, id : id});

  };

  const postFirebaseNoteRequest = async () => {

    var id = 0;
    try
    {
      const docRef = await addDoc(collection(db, 'TodoList'), {
        color : '',
        content : note.content,
        heading : note.heading,
        style : '',
        userId : localStorage.getItem('userId')
      });

      id = docRef.id;
    }
    catch(error)
    {
      console.error('Error posting data:', error);
    }
    props.onAdd({heading: note.heading, content : note.content, id : id});
  };


  const submitNote = async(event) => {

    event.preventDefault();

    if (localStorage.getItem('useFireBaseApis') === 'true')
    {
      await postFirebaseNoteRequest();
    }
    else
    {
      await postNoteRequest();
    }

    setNote({
      heading: "",
      content: "",
      id : 0
    });
  };

  return (
    <div>
      <form className="create-note">
        {expandState && (
          <input
            name="heading"
            onChange={handleChange}
            value={note.heading}
            placeholder="Title"
          />
        )}
        <textarea
          name="content"
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows={expandState ? "3" : "1"}
          onClick={() => SetExpand(true)}
        />
        <Zoom in={expandState}>
          <Fab onClick={submitNote}>
            <AddCircleIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
