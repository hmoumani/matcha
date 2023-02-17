// const profilesQueue = ref(shufflePeople());

// const showNextProfile = () => {
//     profilesQueue.value.shift();
//     if (profilesQueue.value.length <= 3) {
//         // get new list
//         profilesQueue.value = shufflePeople();
//     }
// };

// const currentUser = computed(() => profilesQueue.value[0]);

import feedService from '@/services/feedService';
import userService from '@/services/userService';
import { defineStore } from 'pinia';

export const useFeedStore = defineStore('feed', {
	state: () => ({
		profilesQueue: [],
		currentProfile: null,
	}),
	actions: {
		async showNextProfile() {
			this.profilesQueue.shift();
			if (this.profilesQueue.length <= 3) {
				// get new list
				let newPeople = await feedService.getNewProfiles(); //.catch(e => {});
				this.profilesQueue = this.profilesQueue.concat(newPeople);
			}
			this.currentProfile = this.profilesQueue[0];
		},
		async likeUser() {
			await this.showNextProfile();
			const { id } = this.currentProfile;
			feedService.likeUser(id);
		},
		async unLikeUser() {
			this.showNextProfile();
			const { id } = this.currentProfile;
			feedService.unLikeUser(id);
		},
		async reportUser(userId) {
			userService.reportUser(userId);
		},
	},
});
