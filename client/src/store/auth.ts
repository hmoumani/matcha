import userService from '../services/userService';
import { defineStore, storeToRefs } from 'pinia';

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
			async getPositionWrapper(currentUserRef) {
				let UserLocation = await getCurrentUserPosition();
				currentUserRef.location = UserLocation;
			},
			async logIn(username: string, password: string) {
				await login(username, password);
				const { getCurrentUser,} = useUserStore();
				const {currentUser} = storeToRefs(useUserStore());

				await getCurrentUser();
				let currentUserRef = currentUser?.value;
				console.log(currentUserRef);
				if (currentUserRef?.isAutoLocatorEnabled) {
					let UserLocation = await getLocationFromIP();
					currentUserRef.location = UserLocation;
					await userService.updateUser({location: UserLocation});
					this.getPositionWrapper(currentUserRef);
				}
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
			async FirstAuth(user: object) {
				const { getCurrentUser } = useUserStore();
				await firstAuth(user);
				const {currentUser} = storeToRefs(useUserStore());

				await getCurrentUser();
				let currentUserRef = currentUser?.value;
				if (currentUserRef?.isAutoLocatorEnabled) {
					let UserLocation = await getLocationFromIP();
					currentUserRef.location = UserLocation;
					await userService.updateUser({location: UserLocation});
					this.getPositionWrapper(currentUserRef);
				}
				router.push({ path: '/' });
			},
		},
	})();
};
