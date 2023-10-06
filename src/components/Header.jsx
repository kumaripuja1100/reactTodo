import React from "react";
import Logout from "./Logout";
import IconButton from '@material-ui/core/IconButton';
import { useNavigate } from 'react-router-dom';

function Header(props) {

  const navigate = useNavigate();

  const handleClick = async(e) => {
    e.preventDefault();

    if (localStorage.getItem('isAuthenticated') === 'true')
    {
      navigate('/home');
    }
    else
    {
      navigate('/login');
    }
  }

  return (
    <header>
          {props.show && <Logout />}
      <IconButton onClick={handleClick}>
      <h1>{props.name}</h1>
      </IconButton>
    </header>
  );
}

export default Header;
