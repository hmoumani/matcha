import apiClient from '@/modules/apiClient';

const getUserProfile = (id = 'mine') => apiClient.get(`/user/${id}`);
const blockUser = blockedId => apiClient.post(`/user/block`, { blockedId });
const reportUser = reportedId => apiClient.post(`/user/report`, {reportedId});
const updateUser = user => apiClient.put('/user', user);

const uploadAvatars = async avatars => {
	const formData = new FormData();

	for (let i = 0; i < avatars.length; i++) {
		formData.append('avatar', avatars[i]);
	}

	const config = {
		headers: {
			'content-type': 'multipart/form-data',
		},
	};

	await apiClient.put('/user/avatar', formData, config);
};

export default {
	getUserProfile,
	blockUser,
	reportUser,
	updateUser,
	uploadAvatars,
};
