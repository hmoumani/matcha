import { defineStore } from 'pinia';
import {
	changePassword,
	login,
	registerUser,
	requestPasswordReset,
} from '../services/authService';

export const useAuthStore = () => {
	const router = useRouter();
	return defineStore('auth', {
		state: () => ({
			user: null,
		}),
		actions: {
			logIn(username: string, password: string) {
				login(username, password);
			},
			async register(newUser) {
				await registerUser(newUser);
				router.push({ path: '/ConfirmationEmailSent' });
			},
			async requestPasswordReset(email: string) {
				await requestPasswordReset(email);
				router.push({ path: '/ResetEmailSent' });
			},
			async changePassword(newPassword, token) {
				try {
					await changePassword({ newPassword, token });
				} catch (e) {}
				router.push({ path: '/ResetPassword/success' });
			},
		},
	})();
};
