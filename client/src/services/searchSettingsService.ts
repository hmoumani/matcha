import apiClient from '@/modules/apiClient';

const getSearchSettings = () => apiClient.get(`/user/settings`);

export default {
	getSearchSettings
};
