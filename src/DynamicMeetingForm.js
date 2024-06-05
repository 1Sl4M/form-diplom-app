import React, { useState, useEffect } from 'react';
import './DynamicMeetingForm.css';
import axios from 'axios';

const DynamicMeetingForm = () => {
  const [formData, setFormData] = useState({
    // Здесь вы можете указать поля формы и их начальные значения
  });

  useEffect(() => {
    // Запрос на сервер для получения данных пользователя
    axios.get('http://localhost:3001/user/data') // Замените на ваш URL и метод запроса
      .then(response => {
        // Обновляем состояние формы с полученными данными пользователя
        setFormData(prevFormData => ({
          ...prevFormData,
          // Здесь вы можете указать, какие поля формы нужно заполнить данными пользователя
          name: response.data.name,
          email: response.data.email,
          // Другие поля формы...
        }));
      })
      .catch(error => {
        console.error('Ошибка получения данных пользователя:', error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Отправляем данные формы на сервер для сохранения
      const response = await axios.post('http://localhost:3001/student/meeting', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Ответ сервера:', response.data);
      alert('Данные успешно сохранены!');
    } catch (error) {
      console.error('Ошибка сохранения данных:', error.response.data);
      alert('Ошибка сохранения данных!');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Имя:
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
      </label>
      <label>
        Email:
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
      </label>
      {/* Другие поля формы */}
      <button type="submit">Сохранить</button>
    </form>
  );
};

export default DynamicMeetingForm;
