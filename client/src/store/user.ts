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
import { defineStore, storeToRefs } from 'pinia';
import { useChatStore } from '@/store/chat';

function removeItemOnce(arr, value) {
	var index = arr.indexOf(value);
	if (index > -1) {
		arr.splice(index, 1);
	}
	return arr;
}

const getConversationUserID = conversation => conversation.user.id;

export const useUserStore = defineStore('user', {
	state: () => ({
		currentUser: null,
	}),
	actions: {
		async getCurrentUser() {
			let { data } = await userService.getUserProfile();
			this.currentUser = data.data.user;
			// console.log(data.data.user);
		},
		async reportUser(userID) {
			await userService.reportUser(userID);
		},
		async blockUser(userID) {
			try {
				await userService.blockUser(userID);
			} catch (e) {
				// return; TODO uncomment this line
			}

			const messagesStore = useChatStore();
			const { conversations } = storeToRefs(messagesStore);
			const conversationWithBlockedUser = conversations.value.find(
				conversation => getConversationUserID(conversation) === userID
			);
			console.log({ conversationWithBlockedUser });
			if (conversationWithBlockedUser) {
				conversations.value = removeItemOnce(
					conversations.value,
					conversationWithBlockedUser
				);
			}
		},
	},
	getters:{
		currentUserFullName(){
			if (!this.currentUser){
				return;
			}
			const {first_name, last_name} = this.currentUser;
			return first_name + '' + last_name
		}
	}
});