import React from "react";
import { Navigate } from "react-router-dom";
import Home from './Home';

const PR = () => {

  const myvar = localStorage.getItem('isAuthenticated');

  if (myvar === 'true')  {

    return <Home />;
  }

  return <Navigate to="/login" />;

};

export default PR;