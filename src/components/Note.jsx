import React,{useState} from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from '@material-ui/icons/Edit';
import CustomizedDialogs from "./PopUpNote";

function Note(props) {

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  

  const handleDialogOpen = () => {
    console.log("world");
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };
  function handleClick() {
    props.onDelete(props.id, props.backendId);
  }
  
  return (
    <div className="note" >
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={handleClick}>
        <DeleteIcon />
      </button>
      <button onClick={handleDialogOpen} className="edit-button">
        <EditIcon />
       
      </button>
      {isDialogOpen && (
        <CustomizedDialogs title={props.title} onEdit={props.onEdit} content={props.content} onClose={handleDialogClose} id={props.id} backendId={props.backendId}/>
      )}
    
    
    </div>
  );
}
export default Note;