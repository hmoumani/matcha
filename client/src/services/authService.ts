import apiClient from '../modules/apiClient';

export const login = async (username: string, password: string) =>
	apiClient.post('/auth/login', {
		username,
		password,
	});
