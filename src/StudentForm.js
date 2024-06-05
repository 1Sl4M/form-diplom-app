import React, { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';
import axios from 'axios';
import { fetchUser } from './Api';
import './StudentForm.css';
import Cookies from 'js-cookie';
import './LoginSignUpForm.css';

const courses = [1, 2, 3, 4];

const StudentForm = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const id = searchParams.get('id');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    course: '',
    institut: '',
    phoneNumber: '',
  });

  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('bam'); // Получаем токен из localStorage
    if (token) {
      fetchUser()
        .then((userData) => {
          setFormData((prevState) => ({
            ...prevState,
            name: userData.name || '',
            email: userData.email || '',
            course: userData.course || '',
            institut: userData.institut || '',
            phoneNumber: userData.phoneNumber || '',
          }));
          setAuthenticated(true);
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
          setAuthenticated(false);
        });
    } else {
      setAuthenticated(false);
    }
  }, [id, navigate]);

  const [formErrors, setFormErrors] = useState({
    name: false,
    email: false,
    course: false,
    phoneNumber: false,
    institut: false,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormErrors({ ...formErrors, [e.target.name]: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newFormErrors = {};
    Object.keys(formData).forEach((key) => {
      if (formData[key] === '') {
        newFormErrors[key] = true;
      }
    });

    if (formData.phoneNumber.length < 11) {
      newFormErrors.phoneNumber = true;
    }

    setFormErrors(newFormErrors);

    if (Object.values(newFormErrors).some((error) => error)) {
      return;
    }

    try {
      const token = localStorage.getItem('bam');
      if (!token) {
        throw new Error('Token not found.');
      }

      const tokenParts = token.split('.');
      const encodedPayload = tokenParts[1];
      const decodedPayload = atob(encodedPayload);
      const payload = JSON.parse(decodedPayload);
      const userId = payload.id;

      if (!userId) {
        throw new Error(`User id not found `);
      }
      await axios.post(`http://localhost:3001/student/form/${id}`, formData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        },
      });
      alert('Data sent successfully!');
    } catch (error) {
      alert('Error sending data. Please try again later.');
      console.error('Error sending data:', error);
    }
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleLoginSuccess = async (data) => {
    const token = data.token;
    Cookies.set('bim', token);
    setAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('bam');
    setFormData({
      name: '',
      email: '',
      course: '',
      institut: '',
      phoneNumber: '',
    });
    setAuthenticated(false);
  };

  return (
    <div className="tudasuda">
      <div>
        {!authenticated ? (
          <div>
            <LoginForm onLoginSuccess={handleLoginSuccess} />
          </div>
        ) : (
          <div className="form-wrapper title-text wrapper">
            <div
              className="title forms title login"
              style={{ width: '100%', marginBottom: '30px' }}
            >
              {' '}
              Заполните форму
            </div>
            <div className="form-header">
              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>
              <button onClick={handleRefresh} className="refresh-button">
                Заполнить данные
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  placeholder="Name"
                  onChange={handleChange}
                  className={formErrors.name ? 'error' : ''}
                />
              </label>
              <br />
              <label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  placeholder="Email Address"
                  onChange={handleChange}
                  className={formErrors.email ? 'error' : ''}
                />
              </label>
              <br />
              <label>
                <select
                  name="course"
                  value={formData.course}
                  placeholder="Course"
                  onChange={handleChange}
                  className={formErrors.course ? 'error' : ''}
                >
                  <option value="">Select Course</option>
                  {courses.map((course) => (
                    <option key={course} value={course}>
                      {course}
                    </option>
                  ))}
                </select>
              </label>
              <br />
              <label>
                Phone Number:
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="+7"
                  className={formErrors.phoneNumber ? 'error' : ''}
                />
                {formErrors.phoneNumber && (
                  <span className="error-message">Phone number must be at least 11 digits</span>
                )}
              </label>
              <br />
              <label>
                <input
                  type="text"
                  name="institut"
                  value={formData.institut}
                  onChange={handleChange}
                  placeholder="Institut"
                  className={formErrors.institut ? 'error' : ''}
                />
              </label>

              <button type="submit">Submit</button>
            </form>
          </div>
        )}
      </div>
      <div className='area'>
      <ul className="circles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      </div>
    </div>
  );
};

export default StudentForm;
