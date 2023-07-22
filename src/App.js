import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";
import Resturant from "./components/Resturant";
import Signup from "./components/Signup";
import Signin from "./components/Signin";

function App() {
  const [token, setToken] = useState(
    localStorage.AuthKey != undefined || localStorage.AuthKey != ""
  );

  function abc(status) {
    setToken(status);
  }
  if (!token) {
    return (
      <Router>
        <Routes>
          <Route exact path="/" element={<Signin setToken={abc} />} />
          <Route exact path="/SignUp" element={<Signup />} />
        </Routes>
      </Router>
    );
  }
  if (!token) {
    return (
      <Router>
        <Routes>
          <Route exact path="/" element={<Signin />} setToken={setToken} />
          <Route exact path="/SignUp" element={<Signup />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <div className="app-container">
        <Header className="" />
        <div className="main-container">
          <Sidebar />
          <Routes>
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route path="/resturant" element={<Resturant />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
