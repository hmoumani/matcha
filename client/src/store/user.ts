// const profilesQueue = ref(shufflePeople());

// const showNextProfile = () => {
//     profilesQueue.value.shift();
//     if (profilesQueue.value.length <= 3) {
//         // get new list
//         profilesQueue.value = shufflePeople();
//     }
// };

// const currentUser = computed(() => profilesQueue.value[0]);

import userService from '@/services/userService';
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
	state: () => ({
		currentUser: null,
	}),
	actions: {
		async getCurrentUser() {
			let {
				data
			} = await userService.getUserProfile();
			this.currentUser = data.data.user;
			// console.log(data.data.user);
		},
	},
});
