import { fetchUserRequest, fetchUserSuccess, fetchUserFailure } from './actions';
import axios from 'axios';

export const fetchUser = async () => {
  return async (dispatch) => {
    dispatch(fetchUserRequest());
    try {
      const token = localStorage.getItem('token');
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

      // Запрашиваем данные о пользователе с использованием полученного id
      const response = await axios.get(`http://localhost:3001/student/api/${userId}`);

      // Обновляем состояние хранилища с полученными данными пользователя
      dispatch(fetchUserSuccess(response.data));
    } catch (error) {
      // Обрабатываем ошибку при получении данных о пользователе
      dispatch(fetchUserFailure(error.message));
    }
  };
};
