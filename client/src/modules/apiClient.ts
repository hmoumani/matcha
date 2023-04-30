import axios from 'axios';
import { useToast } from 'vue-toastification';

const { VITE_API_URL: baseURL } = import.meta.env;


const apiClient = axios.create({
	baseURL,
	withCredentials: true,
});

apiClient.interceptors.response.use(
	function (response) {
		// Any status code that lie within the range of 2xx cause this function to trigger
		// Do something with response data
		return response;
	  }, function (error) {
		const toast = useToast();
		toast.error(error.response.data.message);
		return Promise.reject(error);
	  }
);



export default apiClient;
