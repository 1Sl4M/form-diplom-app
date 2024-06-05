import axios from 'axios';

export const fetchUser = async () => {
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

    const response = await axios.get(`http://localhost:3001/student/api/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};
