import apiClient from '@/modules/apiClient';

const get = () => apiClient.get(`/user/settings`);
const update = (payload) => apiClient.put(`/user/settings`, payload);

export default {
	update,
	get
};
