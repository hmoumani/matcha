// const profilesQueue = ref(shufflePeople());

// const showNextProfile = () => {
//     profilesQueue.value.shift();
//     if (profilesQueue.value.length <= 3) {
//         // get new list
//         profilesQueue.value = shufflePeople();
//     }
// };

// const currentUser = computed(() => profilesQueue.value[0]);

import { getNewProfiles } from '@/services/feedService';
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
				let newPeople = await getNewProfiles(); //.catch(e => {});
				this.profilesQueue = this.profilesQueue.concat(newPeople);
				console.log('new ppl list got', this.profilesQueue.length);
			}
			this.currentProfile = this.profilesQueue[0];
		},
		async likeUser() {
			this.showNextProfile();
		},
		async unLikeUser() {
			this.showNextProfile();
		},
		async reportUser(){
			
		}
	},
});
