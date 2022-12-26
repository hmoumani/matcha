import userService from '@/services/userService';
import { defineStore } from 'pinia';

export const useMessagesStore = defineStore('messages', {
	state: () => ({
		showUserProfile: true,
	}),
});
