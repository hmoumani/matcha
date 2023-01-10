import apiClient from '../modules/apiClient';

export const login = (username: string, password: string) =>
	apiClient.post('/auth/login', {
		username,
		password,
	});

export const registerUser = newUser =>
	apiClient.post('/auth/register', { ...newUser });

export const requestPasswordReset = email =>
	apiClient.post('/auth/resetPasswordEmail', { email });

export const changePassword = payload =>
	apiClient.post('/auth/resetPassword', { ...payload });

export const logout = () => apiClient.post('/auth/logout');
