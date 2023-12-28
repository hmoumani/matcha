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

export const verifyEmail = payload =>
	apiClient.post('/auth/verifyEmail', { ...payload });

export const firstAuth = (user: object) => apiClient.post('/auth/firstLogin', { ...user });

export const logout = () => apiClient.post('/auth/logout');

export const loginWithFakeUser = () => apiClient.post('/auth/loginWithFakeUser')