import React from 'react';
import ExitToAppTwoToneIcon from '@material-ui/icons/ExitToAppTwoTone';
import { auth } from './Firebase';
import { signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
function Logout() {

    const navigate = useNavigate();

    const handleClick = async(e) => {
        try{
            await signOut(auth);
            localStorage.setItem('isAuthenticated', 'false');
            navigate('/login');
        }
        catch(error) {
            console.log(error);
        }
    }
    return(
        <div className='logout'>        <Tooltip title="logout">
        <IconButton aria-label="logout" onClick={handleClick}>
        <ExitToAppTwoToneIcon />
        </IconButton>
        </Tooltip>
        </div>
        
    );
}

export default Logout;