import apiClient from '@/modules/apiClient';

const getUserProfile = (id = 'mine') => apiClient.get(`/user/${id}`);
const blockUser = userId => apiClient.post(`/user/block`, { userId });
const reportUser = id => apiClient.post(`/user/report/${id}`);
const updateUser = user => apiClient.put('/user', user);

const uploadAvatars = avatars => {
	const formData = new FormData();

	for (let i = 0; i < avatars.length; i++) {
		formData.append('avatar', avatars[i]);
	}

	const config = {
		headers: {
			'content-type': 'multipart/form-data',
		},
	};

	apiClient.put('/user/avatar', formData, config);
};

export default {
	getUserProfile,
	blockUser,
	reportUser,
	updateUser,
	uploadAvatars,
};
