import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import PR from './ProtectedRoute';

const App = () => {

  return (
    <Router>
      <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
        <Route
          path="/home"
          element={<PR />}
        />
      </Routes>
    </Router>
  );
};

export default App;
