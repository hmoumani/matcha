import apiClient from '@/modules/apiClient';

const get = () => apiClient.get(`/user/settings`);
const update = () => apiClient.put(`/user/settings`);

export default {
	update,
	get
};
