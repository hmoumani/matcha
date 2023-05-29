import axios from 'axios';
import { useToast } from 'vue-toastification';
import { router } from '../router';

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
		if (error.response.status === 418) {
			router.push('/firstAuth');
		}
		const toast = useToast();
		if (error.response.data?.message !== ""
			&& error.response.data.message !== 'No token provided!') {
			toast.error(error.response.data.message);
		}
		return Promise.reject(error);
	  }
);



export default apiClient;
