import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import './AdviserForm.css';

const AdviserForm = () => {
  const [searchParams] = useSearchParams();

  const id = searchParams.get('id');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    affiliation: '',
    phoneNumber: '',
  });

  const [formErrors, setFormErrors] = useState({
    name: false,
    email: false,
    affiliation: false,
    phoneNumber: false,
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
      await axios.post(`http://localhost:3001/adviser/form/${id}`, formData);

      alert('Data sent successfully!');
    } catch (error) {
      alert('Error sending data. Please try again later.');
      console.error('Error sending data:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={formErrors.name ? 'error' : ''}
        />
      </label>
      <br />
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={formErrors.email ? 'error' : ''}
        />
      </label>
      <br />
      <label>
        Affiliation:
        <input
          type="text"
          name="affiliation"
          value={formData.affiliation}
          onChange={handleChange}
          className={formErrors.affiliation ? 'error' : ''}
        />
      </label>
      <br />
      <label>
        Phone Number:
        <input
          type="tel"
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

      <button type="submit">Submit</button>
    </form>
  );
};

export default AdviserForm;
