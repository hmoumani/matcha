import { defineStore } from 'pinia';
import {
	changePassword,
	login,
	logout,
	registerUser,
	requestPasswordReset,
	firstAuth,
} from '../services/authService';
import { useUserStore } from './user';
import app from '@/main';
import getCurrentUserPosition, { getLocationFromIP } from '@/helpers/getCurrentUserPosition';

export const useAuthStore = () => {
	const router = useRouter();
	return defineStore('auth', {
		state: () => ({}),
		actions: {
			async logIn(username: string, password: string) {
				await login(username, password);
				const { getCurrentUser, currentUser} = useUserStore();

				await getCurrentUser();
				let currentUserRef = currentUser?.value;
				if (!currentUserRef?.isAutoLocatorEnabled) {
					return;
				}
				let UserLocation = await getLocationFromIP();
				currentUserRef.location = UserLocation;
				UserLocation = await getCurrentUserPosition();
				currentUserRef.location = UserLocation;
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
				} catch (e) {}
				router.push({ path: '/ResetPassword/success' });
			},
			async FirstAuth(user: object) {
				const { getCurrentUser } = useUserStore();
				await firstAuth(user);
				await getCurrentUser();
				router.push({ path: '/' });
			},
		},
	})();
};
