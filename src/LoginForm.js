// LoginForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginSignUpForm.css';
import './App.css';
import Cookies from 'js-cookie';

const LoginForm = ({ onLoginSuccess }) => {
  // const [formData, setFormData] = useState({
  //   email: '',
  //   password: '',
  // });

  // useEffect(() => {
  //   setFormData({
  //     email: '',
  //     password: '',
  //   });
  // }, []);

  // const navigate = useNavigate();

  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post('http://localhost:3001/auth/login', formData);
  //     alert('Login successful');
  //     const token = response.data.access_token;
  //     localStorage.setItem('bam', token);
  //     if (typeof onLoginSuccess === 'function') {
  //       onLoginSuccess(response.data);
  //     }
  //   } catch (error) {
  //     console.error('Error logging in:', error);
  //     alert('Failed to login. Please try again.');
  //   }
  // };

  // return (
  //   <div className="form-container">
  //     <h2>Login</h2>
  //     <form onSubmit={handleSubmit}>
  //       <label>Email:</label>
  //       <input type="email" name="email" value={formData.email} onChange={handleChange} />
  //       <label>Password:</label>
  //       <input type="password" name="password" value={formData.password} onChange={handleChange} />
  //       <button type="submit">Login</button>
  //     </form>
  //   </div>
  // );
  const [registerData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    course: '',
    address: '',
    institut: '',
  });
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loginEmailError, setLoginEmailError] = useState('');
  const [loginPasswordError, setLoginPasswordError] = useState('');
  const [signupEmailError, setSignupEmailError] = useState('');
  const [signupPasswordError, setSignupPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const handleSignupClick = () => {
    const loginForm = document.querySelector('.form-inner form.login');
    const loginText = document.querySelector('.title-text .login');
    loginForm.style.marginLeft = '-150%';
    loginText.style.marginLeft = '-50%';
    // Reset login form values
    setFormData({
      name: '',
      email: '',
      password: '',
      course: '',
      address: '',
      institut: '',
    });
    setLoginEmail('');
    setLoginPassword('');
    setLoginEmailError('');
    setLoginPasswordError('');
  };

  const handleLoginClick = () => {
    const loginForm = document.querySelector('.form-inner form.login');
    const loginText = document.querySelector('.title-text .login');
    loginForm.style.marginLeft = '0%';
    loginText.style.marginLeft = '0%';
    // Reset signup form values
    setSignupEmail('');
    setSignupPassword('');
    setConfirmPassword('');
    setSignupEmailError('');
    setSignupPasswordError('');
    setConfirmPasswordError('');
  };

  const handleSignupLinkClick = (e) => {
    e.preventDefault();
    document.getElementById('signup').checked = true;
    handleSignupClick();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...registerData, [name]: name === 'course' ? parseInt(value, 10) : value });
  };

  const validateLoginEmail = () => {
    if (!loginEmail) {
      setLoginEmailError('Please enter your email address');
      return false;
    }
    const isValid = /\S+@\S+\.\S+/.test(loginEmail);
    setLoginEmailError(isValid ? '' : 'Email is invalid');
    return isValid;
  };

  const validateLoginPassword = () => {
    if (!loginPassword) {
      setLoginPasswordError('Please enter your password');
      return false;
    }
    const isValid = loginPassword.length >= 6;
    setLoginPasswordError(isValid ? '' : 'Password must be at least 6 characters');
    return isValid;
  };

  const validateSignupEmail = () => {
    if (!signupEmail) {
      setSignupEmailError('Please enter your email address');
      return false;
    }
    const isValid = /\S+@\S+\.\S+/.test(signupEmail);
    setSignupEmailError(isValid ? '' : 'Email is invalid');
    return isValid;
  };

  const validateSignupPassword = () => {
    if (!signupPassword) {
      setSignupPasswordError('Please enter your password');
      return false;
    }
    const isValid = signupPassword.length >= 6;
    setSignupPasswordError(isValid ? '' : 'Password must be at least 6 characters');
    return isValid;
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    let data = {
      name: registerData.name,
      email: signupEmail,
      password: signupPassword,
      course: registerData.course,
      address: registerData.address,
      institut: registerData.institut,
    };
    console.log(data);
    try {
      const response = await axios.post('http://localhost:3001/auth/register', data);
      const token = response.data.access_token;
      localStorage.setItem('bam', token);
      alert('Signup successful');
      handleLoginClick();
      console.log('Signup form submitted');
    } catch (error) {
      console.error('Error signing up:', error);
      alert('Failed to signup. Please try again.');
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (validateLoginEmail() && validateLoginPassword()) {
      let formData = {
        email: loginEmail,
        password: loginPassword,
      };
      try {
        const response = await axios.post('http://localhost:3001/auth/login', formData);
        alert('Login successful');
        const token = response.data.access_token;
        localStorage.setItem('bam', token);
        if (typeof onLoginSuccess === 'function') {
          onLoginSuccess(response.data);
        }
      } catch (error) {
        console.error('Error logging in:', error);
        alert('Failed to login. Please try again.');
      }
    } else {
      console.log('Login form has errors');
    }
  };

  return (
    <div className="tudasuda">
      <div className="wrapper">
        <div className="title-text">
          <div className="title login">Login Form</div>
          <div className="title signup">Signup Form</div>
        </div>
        <div className="form-container">
          <div className="slide-controls">
            <input type="radio" name="slide" id="login" defaultChecked />
            <input type="radio" name="slide" id="signup" />
            <label htmlFor="login" className="slide login" onClick={handleLoginClick}>
              Login
            </label>
            <label htmlFor="signup" className="slide signup" onClick={handleSignupClick}>
              Signup
            </label>
            <div className="slider-tab"></div>
          </div>
          <div className="form-inner">
            <form action="#" className="login" onSubmit={handleLoginSubmit}>
              <div className="field">
                <input
                  type="text"
                  placeholder="Email Address"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  onBlur={validateLoginEmail}
                />
                {loginEmailError && <div className="error">{loginEmailError}</div>}
              </div>
              <div className="field">
                <input
                  type="password"
                  placeholder="Password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
                {loginPasswordError && <div className="error">{loginPasswordError}</div>}
              </div>
              <div className="field btn">
                <div className="btn-layer"></div>
                <input type="submit" value="Login" />
              </div>
              <div className="signup-link">
                Not a member?{' '}
                <a href="" onClick={handleSignupLinkClick}>
                  Signup now
                </a>
              </div>
            </form>
            <form action="#" className="signup" onSubmit={handleSignupSubmit}>
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={registerData.name}
                style={{ fontFamily: 'Poppins' }}
                onChange={handleChange}
              />
              <div className="field">
                <input
                  type="text"
                  placeholder="Email Address"
                  required
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  onBlur={validateSignupEmail}
                />
                {signupEmailError && <div className="error">{signupEmailError}</div>}
              </div>
              <div className="field">
                <input
                  type="password"
                  placeholder="Password"
                  required
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  onBlur={validateSignupPassword}
                />
                {signupPasswordError && <div className="error">{signupPasswordError}</div>}
              </div>
              <input
                type="number"
                placeholder="Course"
                name="course"
                value={registerData.course}
                style={{ marginTop: '15px', fontFamily: 'Poppins' }}
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="Address"
                name="address"
                value={registerData.address}
                style={{ fontFamily: 'Poppins' }}
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="Institut"
                name="institut"
                value={registerData.institut}
                style={{ fontFamily: 'Poppins' }}
                onChange={handleChange}
              />
              <div className="field btn">
                <div className="btn-layer"></div>
                <input type="submit" value="Signup" />
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="area">
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

export default LoginForm;
