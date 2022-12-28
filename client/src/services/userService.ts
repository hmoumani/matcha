import apiClient from '@/modules/apiClient';

const getUserProfile = (id = 'mine') => apiClient.get(`/user/${id}`);
const blockUser = id => apiClient.post(`/user/block/${id}`);

export default {
	getUserProfile,
	blockUser,
};
