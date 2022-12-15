import apiClient from '@/modules/apiClient';

const getUserProfile = (id = 'mine') => apiClient.get(`/user/${id}`);

export default {
	getUserProfile,
};
