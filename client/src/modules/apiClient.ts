import axios from 'axios';

// const { VITE_API_URL: baseURL } = import.meta.env;
const baseURL = 'http://localhost:3000/api/v1';

const apiClient = axios.create({
	baseURL,
	withCredentials: true,
});

export default apiClient;
