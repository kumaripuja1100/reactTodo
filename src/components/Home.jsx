import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from 'axios';
import { collection, deleteDoc, getDocs, query, where, updateDoc, doc } from 'firebase/firestore';
import { db } from './Firebase';

function Home() {
  const [notes, setNotes] = useState([]);
  const [name, setName] = useState('TodoList');

  function addNote(newNote) {
    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    });
  }

  const deleteRequest = async (backendId) => {

    if (localStorage.getItem('useFireBaseApis') === 'true')
    {
      try
      {
        const docRef = doc(db, 'TodoList', backendId);  
        await deleteDoc(docRef);
      }
      catch(error)
      {
        console.log('Error deleting data:', error.message);
      }
    }
    else
    {
      try {
        await axios.delete(`https://mytodolist-rlgg.onrender.com/api/todo/delete_ToDo/${backendId}`);
  
      } catch (error) {
        console.error('Error deleting data:', error);
      }
    }
  };

  const updateRequest = async(backendId,updatedHeading, updatedContent) => {

    if (localStorage.getItem('useFireBaseApis') === 'true')
    {
      try
      {
        const docRef = doc(db, 'TodoList', backendId);
        const newData = {
          content : updatedContent,
          heading : updatedHeading
        }
  
        await updateDoc(docRef, newData);
      }
      catch(error)
      {
        console.log('Error posting data:', error.message);
      }
    }
    else
    {
      try {
        await axios.put(`https://mytodolist-rlgg.onrender.com/api/todo/update_ToDo/${backendId}`,
        {heading: updatedHeading, content : updatedContent, style: "", color : ""});
      }catch(error) {
        console.log('Error posting data:', error.message);
      }
    }
  }

  const handleEditButton = async(backendId, id,updatedHeading, updatedContent) => {
    setNotes(prevNotes => {
      return prevNotes.map((noteItem, index) => {
        if(index === id){
          return({heading: updatedHeading, content: updatedContent, id: id});
        }
        else {
          return noteItem;
        }
      });
    });
    await updateRequest(backendId,updatedHeading, updatedContent);
  }

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
      const userId = localStorage.getItem('userId');
      const response = await axios.get(`https://mytodolist-rlgg.onrender.com/api/todo/viewAll_ToDo/${userId}`);

      setNotes(prevNotes => {
        return [...prevNotes, ...response.data]
      });

    } catch (error) {
      console.log('Error posting data:', error.message);
    }
  };
  const getUserName = async () => {

    try {
      const userId = localStorage.getItem('userId');
      const response = await axios.get(`https://mytodolist-rlgg.onrender.com/api/todo/view_user/${userId}`);
      const data = response.data;
      setName("Hi " + data.firstName);

    }catch(error) {
      console.log(error.message);
    }
  }
const getFirebaseUserName = async() => {
  try{
    const userId = localStorage.getItem('userId');
    const q = query(collection(db, "TodoListUser"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    var firstname;
    querySnapshot.forEach((doc) => {
      firstname = doc.data().firstName;
    });
    setName("Hi " + firstname); 
  }catch(error){
    console.log(error.message);
  }
 
}
  const getFirebaseRequest = async () => {

    try {
      const userId = localStorage.getItem('userId');

      const q = query(collection(db, "TodoList"), where("userId", "==", userId));

      const dataArray = [];
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        dataArray.push({ id: doc.id, heading : doc.data().heading, content : doc.data().content });
      });

      setNotes(prevNotes => {
        return [...prevNotes, ...dataArray]
      });

    } catch (error) {
      console.log('Error posting data:', error.message);
    }
  };

  useEffect(() => {
    // Fetch data when the component mounts
    if (localStorage.getItem('useFireBaseApis') === 'true')
    {
      getFirebaseRequest();
      getFirebaseUserName();
    }
    else
    {
      getRequest(); 
      getUserName();
    }

  }, []);

  return (
    <div >
    <Header show={true} name={name} />
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
            onEdit={handleEditButton}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default Home;
