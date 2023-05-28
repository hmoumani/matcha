import { defineStore } from 'pinia';
import {
	changePassword,
	login,
	logout,
	registerUser,
	requestPasswordReset,
	firstAuth
} from '../services/authService';
import { useUserStore } from './user';
import app from '@/main';

export const useAuthStore = () => {
	const router = useRouter();
	return defineStore('auth', {
		state: () => ({}),
		actions: {
			async logIn(username: string, password: string) {
				await login(username, password);
				const { getCurrentUser } = useUserStore();

				await getCurrentUser();
				router.push({ path: '/' });
			},
			async register(newUser) {
				await registerUser(newUser);
				router.push({ path: '/ConfirmationEmailSent' });
			},
			async logout() {
				await logout();
				app.config.globalProperties.$socket.disconnect();
				window.location = '/login';
			},
			async requestPasswordReset(email: string) {
				await requestPasswordReset(email);
				router.push({ path: '/ResetEmailSent' });
			},
			async changePassword(newPassword, token) {
				try {
					await changePassword({ password: newPassword, token });
					router.push({ path: '/ResetPassword/success' });
				} catch (e) {}
			},
			async FirstAuth(user: object){
				const { getCurrentUser } = useUserStore();
				await firstAuth(user);
				await getCurrentUser();
				router.push({ path: '/' });
			}
		},
	})();
};
