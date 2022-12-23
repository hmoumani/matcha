import apiClient from '../modules/apiClient';

export const login = (username: string, password: string) =>
	apiClient.post('/auth/login', {
		username,
		password,
	});

export const registerUser = newUser =>
	apiClient.post('/auth/register', { ...newUser });
