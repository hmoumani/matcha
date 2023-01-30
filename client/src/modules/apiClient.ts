import axios from 'axios';

const { VITE_API_URL: baseURL } = import.meta.env;

const apiClient = axios.create({
	baseURL,
	withCredentials: true,
});

export default apiClient;
