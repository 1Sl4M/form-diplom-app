import React, { useState } from 'react';
import './StudentMeetingForm.css';
import axios from 'axios';

function StudentMeetingForm() {
  const [meetingData, setMeetingData] = useState({
    title: '',
    description: '',
    date: new Date(),
    location: '',
    organizer: '',
    startTime: new Date(),
    endTime: new Date(),
  });

  const handleChange = (event) => {
    setMeetingData({ ...meetingData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const isFormValid = Object.values(meetingData).every((value) => value !== '');

    if (!isFormValid) {
      alert('Заполните все поля формы!');
      return;
    }

    const jsonData = JSON.stringify(meetingData);

    console.log(jsonData);
    axios
      .post('http://localhost:3001/student/meeting', jsonData, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log(response);
        alert('Данные успешно сохранены!');
      })
      .catch((error) => {
        console.log(error.response.data);
        alert('Ошибка сохранения данных!');
      });
  };

  return (
    <div class="area">
      <ul class="circles">
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
      <form onSubmit={handleSubmit} className="students-meeting-form">
      <h2 style={{fontSize: '30px', fontWeight: '600', marginBottom: '20px', fontFamily: 'Poppins'}}>Создать встречу студентов</h2>
      <div className="form-group">
        <input
          type="text"
          id="title"
          name="title"
          value={meetingData.title}
          placeholder='Название встречи'
          style={{ fontFamily: 'Poppins' }}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <textarea
          id="description"
          name="description"
          value={meetingData.description}
          style={{ fontFamily: 'Poppins' }}
          placeholder='Описание'
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <p style={{marginTop: '-10px'}}>Дата:</p>
        <input
          type="date"
          id="date"
          name="date"
          value={meetingData.date}
          placeholder='Дата'
          onChange={handleChange}
          style={{ fontFamily: 'Poppins' }}
          required
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          id="location"
          name="location"
          value={meetingData.location}
          placeholder='Место проведения'
          style={{ fontFamily: 'Poppins' }}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          id="organizer"
          name="organizer"
          value={meetingData.organizer}
          placeholder='Организатор'
          style={{ fontFamily: 'Poppins' }}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="startTime">Время начала:</label>
        <input
          type="time"
          id="startTime"
          name="startTime"
          value={meetingData.startTime}
          style={{ fontFamily: 'Poppins' }}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="endTime">Время окончания:</label>
        <input
          type="time"
          id="endTime"
          name="endTime"
          value={meetingData.endTime}
          style={{ fontFamily: 'Poppins' }}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Создать встречу</button>
    </form>
    </div>
  );
}

export default StudentMeetingForm;
