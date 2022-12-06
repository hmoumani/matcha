import { defineStore } from 'pinia';
import { login, registerUser } from '../services/authService';

export const useAuthStore = defineStore('auth', {
	state: () => ({
		user: null,
	}),
	actions: {
		logIn(username: string, password: string) {
			console.log(username, password);
			login(username, password);
		},
		register(newUser){
			registerUser(newUser);
		}
	},
});
