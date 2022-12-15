import apiClient from '@/modules/apiClient';

// const getUserProfile = (id = 'mine') => apiClient.get(`/profile/${id}`);
const getUserProfile = (id = 'mine') => {
	return {
		first_name: 'senko',
		last_name: 'von doom',
		age: '567',
		address: 'CNS shore 14',
	};
};

export default {
	getUserProfile,
};
