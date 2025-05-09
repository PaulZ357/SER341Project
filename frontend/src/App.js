
import Home from "./pages/home.jsx"
import React, { useState } from "react";
import SelectCourse from './pages/selectcourse.jsx'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from './login.jsx'
import Table from "./table.jsx"
import Profile from "./profile.jsx";
import Givefeedback from "./givefeedback.jsx"
import './App.css';
import SeeFeedback from "./seefeedback.jsx";
import AddCourse from "./addCourse.jsx";
import AddLesson from "./addLesson.jsx";
import AddStudent from "./addStudent.jsx";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="container">
    <Router>
        <Routes>
          {/* Login Route */}
          <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          
          {/* SelectCourse Route */}
          <Route path="/selectcourse" element={<SelectCourse />} />

          {/* Home Route */}
          <Route path="/home" element={isLoggedIn ? <Home /> : <Navigate to="/" />} />

          <Route path="/profile" element={<Profile />} />

          <Route path="/givefeedback" element={<Givefeedback/>} />

          <Route path="/seefeedback" element={<SeeFeedback/>} />

          {/* Table Route */}
          <Route path="/table" element={<Table />} />

          <Route path="/addcourse" element={<AddCourse />} />
          <Route path="/addlesson" element={<AddLesson />} />
          <Route path="/addstudent" element={<AddStudent />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;