import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from './Firebase';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import Header from "./Header";
import EmailInput from "./EmailInput";
import PasswordInput from './PasswordInput';
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

const Login = () => {
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [emailInvalidError, setEmailInvalidError] = useState('');

  const delay = (ms) => new Promise(res => setTimeout(res, ms));

  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setShowMessage(false);
    setMessage('');
    setEmailInvalidError('');
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value); 
    setShowMessage(false); 
    setMessage('');
    setEmailInvalidError('');
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailPattern.test(email);
    if(!isValid){
      setEmailInvalidError('invalid email format');
      setShowMessage(true);
      return;
    }else{
      setEmailInvalidError('');
      setShowMessage(false);
    }

    try {
        await signInWithEmailAndPassword(auth, email, password);
        const user = auth.currentUser; // Get the currently signed-in user
        if (user) {
          localStorage.setItem('userId', user.uid);
          localStorage.setItem('isAuthenticated', 'true');
        } 
        navigate('/home');
      } catch (error) {
        localStorage.setItem('isAuthenticated', 'false');
        setMessage(error.message);
        setShowMessage(true);
      }
  };

  const handleForgetPassword = async (e) => {
    e.preventDefault();

    try {
        await sendPasswordResetEmail(auth, email);
        setShowMessage(false);
        setMessage('Mail sent for password reset!');
        await delay(5000);
        navigate('/login');
        
      } catch (error) {
        setShowMessage(true);
        setMessage(error.message);
        
      }
  };


  return (
    <div>
    <div>    <Header show={false} name="TodoList" /> </div>
    <div className='mycontainer'>
      <form onSubmit={handleLogin} className={classes.formContainer}>
      <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
          <EmailInput value={email} showError={showMessage} messageText={emailInvalidError}  onChange={handleEmailChange} />
      </Grid>
      <Grid item xs={12} sm={6}>
          <PasswordInput puja="Password" errorText={message} showError={showMessage} value={password} onChange={handlePasswordChange} />
          </Grid>
          </Grid>
          <div className='button-container'>
          <button type="submit" className='mb'>Login</button>
          <button onClick={handleForgetPassword} className='mb'> Forget Password </button>
          </div>
      </form>
      <div>
      <p>Don't have an account? <br /><Link to="/register">Register here</Link></p>
      </div> 
    </div>
    </div>
  );
};

export default Login;
