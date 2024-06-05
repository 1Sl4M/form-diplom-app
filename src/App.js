import React from 'react';
import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';
import StudentForm from './StudentForm';
import StudentMeetingForm from './StudentMeetingForm';
import AdviserForm from './AdviserForm';
import AdviserMeetingForm from './AdviserMeetingForm';
import './App.css';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';

const App = () => {
  return (
    <Router>
      <div>
        <hr />

        <Routes>
          <Route path="/" element={<h1>Домашняя страница</h1>} />
          <Route path="/student-form" element={<StudentForm />} />
          <Route path="/registration" element={<RegistrationForm />} />
          {/* <Route path="/login" element={<LoginForm />} /> */}
          <Route path="/adviser-form" element={<AdviserForm />} />
          <Route path="/student/meeting-form" element={<StudentMeetingForm />} />
          <Route path="/adviser/meeting-form" element={<AdviserMeetingForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
