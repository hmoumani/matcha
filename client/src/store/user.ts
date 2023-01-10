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
			const { conversations, currentConversation } =
				storeToRefs(messagesStore);
			const { showConversationMessages } = messagesStore;
			const conversationWithBlockedUser = conversations.value.find(
				conversation => getConversationUserID(conversation) === userID
			);
			if (conversationWithBlockedUser) {
				conversations.value = removeItemOnce(
					conversations.value,
					conversationWithBlockedUser
				);
				if (conversations.value.length) {
					showConversationMessages(conversations.value[0]);
				} else {
					currentConversation.value = null;
				}
			}
		},
	},
	getters: {
		currentUserFullName() {
			if (!this.currentUser) {
				return;
			}
			const { first_name, last_name } = this.currentUser;
			return first_name + '' + last_name;
		},
	},
});
