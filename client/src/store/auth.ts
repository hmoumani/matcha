import { defineStore } from 'pinia';
import { login } from '../services/authService';

export const useAuthStore = defineStore('auth', {
	state: () => ({
		user: null,
	}),
	actions: {
		logIn(username: string, password: string) {
			console.log(username, password);
			login(username, password);
		},
	},
});
