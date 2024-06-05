import React, { useState } from 'react';
import './AdviserMeetingForm.css'; // Замените на ваш путь к CSS-файлу
import axios from 'axios';

function AdviserMeetingForm() {
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
      .post('http://localhost:3001/adviser/meeting', jsonData, {
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
    <form onSubmit={handleSubmit} className="adviser-meeting-form">
      <h2>Создать встречу советника</h2>
      <div className="form-group">
        <label htmlFor="title">Название встречи:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={meetingData.title}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Описание:</label>
        <textarea
          id="description"
          name="description"
          value={meetingData.description}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="date">Дата:</label>
        <input
          type="date"
          id="date"
          name="date"
          value={meetingData.date}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="location">Место проведения:</label>
        <input
          type="text"
          id="location"
          name="location"
          value={meetingData.location}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="organizer">Организатор:</label>
        <input
          type="text"
          id="organizer"
          name="organizer"
          value={meetingData.organizer}
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
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Создать встречу</button>
    </form>
  );
}

export default AdviserMeetingForm;
