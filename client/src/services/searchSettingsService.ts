import apiClient from '@/modules/apiClient';

const get = () => apiClient.get(`/user/settings`);
const update = async (payload) => await apiClient.put(`/user/settings`, payload);

export default {
	update,
	get
};
