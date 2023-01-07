import apiClient from '@/modules/apiClient';

const getUserProfile = (id = 'mine') => apiClient.get(`/user/${id}`);
const blockUser = id => apiClient.post(`/user/block/${id}`);
const reportUser = id => apiClient.post(`/user/report/${id}`);


export default {
	getUserProfile,
	blockUser,
	reportUser
};
