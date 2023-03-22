import { useContext } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Navbar from './components/Navbar';
import Login from "./components/Login";
import Register from "./components/Register";
import AuthContext from './context/authContext';
import Home from './components/Books';

function App() {

  const authCtx = useContext(AuthContext);
  const {isAdmin} = authCtx;

  return (
    <>
      <Router>
          <Navbar />
          <div className="container">
              <Routes>
                  <Route exact path="/" element={<Home />} />
                  <Route exact path="/login" element={!isAdmin ? <Login /> : <Navigate to="/" ></Navigate>} />
                  <Route exact path="/register" element={<Register />} />
              </Routes>
          </div>
      </Router>
    </>
  );
}

export default App;
