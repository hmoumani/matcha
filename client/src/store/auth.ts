import { defineStore } from 'pinia';

export const useStore = defineStore('auth', {
	state: () => ({
		user: null,
	}),
	actions: {
		login() {},
	},
});
