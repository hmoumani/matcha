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
import { useUserStore } from '@/store/user';
import { useToast } from 'vue-toastification';
const toast = useToast();


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
				let { data:{message: newPeople} } = await feedService.getNewProfiles(); //.catch(e => {});
				this.profilesQueue = this.profilesQueue.concat(newPeople);
			}
			this.currentProfile = this.profilesQueue[0];
		},
		async getNewProfiles() {
			if (this.profilesQueue.length > 0) {
				return;
			}
			let { data:{message: people} } = await feedService.getNewProfiles(); //.catch(e => {});,
			this.profilesQueue = people;
			this.currentProfile = this.profilesQueue[0];
		},
		async likeUser() {
			const {currentUser} = useUserStore();
			if (currentUser.avatars.length < 1) {
				toast.error('You need to upload at least one photo to like someone');
				return ;
			}
			const { id } = this.currentProfile;
			await this.showNextProfile();
			feedService.likeUser(id);
		},
		async unLikeUser() {
			const {currentUser} = useUserStore();
			if (currentUser.avatars.length < 1) {
				toast.error('You need to upload at least one photo to dislike someone');
				return ;
			}
			const { id } = this.currentProfile;
			this.showNextProfile();
			feedService.unLikeUser(id);
		},
		async reportUser(userId) {
			userService.reportUser(userId);
		},
	},
});
