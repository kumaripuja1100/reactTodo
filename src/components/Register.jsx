import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from './Firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";
import EmailInput from './EmailInput';
import PasswordInput from './PasswordInput';
import { TextField } from '@material-ui/core';
import axios from 'axios';
import Header from './Header';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  button: {
    padding: theme.spacing(2),
    fontSize: '1.2em',
    width: '100%',
  },
  formContainer: {
    padding: theme.spacing(2),
    margin: '20px',  // Adjust margin around the form
  },
  textField: {
    marginBottom: theme.spacing(2),  // Adjust margin below each input field
    padding: '10px',  // Adjust padding to create space from all sides
  },
}));


const Register = () => {
  const classes = useStyles();
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showError, setshowError] = useState(false);
  const [messageToShow, setmessageToShow] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [emailInvalidError, setEmailInvalidError] = useState('');
  
  const delay = (ms) => new Promise(res => setTimeout(res, ms));

  const navigate = useNavigate();

  const PostRegisteredUserRequest = async (userId) => {

    try {
      await axios.post('https://mytodolist-rlgg.onrender.com/api/todo/add_user', 
      { userId: userId, firstName : firstName, lastName: lastName});

    }catch(error) {
      setshowError(true);
      setmessageToShow(error.message);
    }
  }
  const emailHandler = (e) => {
    setEmail(e.target.value);
    setEmailInvalidError('');
    setshowError(false);
    setIsValidEmail(true);
  }

  const passwordHadler = (e) => {
    setPassword(e.target.value); 
    setshowError(false); 
    setmessageToShow('');

  }
  const confirmPasswordHadler = (e) => {
    setConfirmPassword(e.target.value); 
    setshowError(false); 
    setmessageToShow('');


  }

  const handleRegister = async (e) => {
    e.preventDefault();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailPattern.test(email);
    if(!isValid ){
      setEmailInvalidError('invalid email format');
      setIsValidEmail(false);
      return;
    }else{
      setEmailInvalidError('');
      setIsValidEmail(true);
    }

    if (password !== confirmPassword) {
      setshowError(true);
      setmessageToShow('Passwords do not match.');
        return;
      }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        PostRegisteredUserRequest(userCredential.user.uid);
        setmessageToShow('Created User successfully! \n Redirecting to login');
        await delay(5000);
        navigate('/login');
        
      } catch (error) {
        setshowError(true);
      setmessageToShow(error.message);
      }
  };


  return (
    <div>
      <div>    <Header show={false} name="TodoList" /> </div>
    
    <div className='mycontainer'>
      <form onSubmit={handleRegister} className={classes.formContainer}>
      <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
          <TextField type="text" label="First Name" variant="outlined" fullWidth value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          </Grid>
          <Grid item xs={12} sm={6}>
          <TextField type="text" label="Last Name" variant="outlined" fullWidth value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </Grid>
          <Grid item xs={12} sm={6}>
          <EmailInput value={email} showError={!isValidEmail} messageText={emailInvalidError} onChange={emailHandler} />
          </Grid>
          <Grid item xs={12} sm={6}>
          <PasswordInput puja="Password" value={password} onChange={passwordHadler} />
          </Grid>
          <Grid item xs={12} sm={6}>
          <PasswordInput puja="Confirm Password" errorText={messageToShow} showError={showError} value={confirmPassword} onChange={confirmPasswordHadler} />
          </Grid>
          </Grid>
         
          <div className='button-container'>
          <button type="submit" className='mb'>Register</button>
          </div>
      </form>
    </div>
    </div>
  );
};

export default Register;
