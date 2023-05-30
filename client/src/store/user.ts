import userService from '@/services/userService';
import { defineStore, storeToRefs } from 'pinia';
import { useChatStore } from '@/store/chat';
import app from '@/main';
import socketIO from '../plugins/socketIO';
import userToken from '../helpers/userToken';
import { listenForEvents } from '@/notifications'
import { router } from '@/router';

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
			const messagesStore = useChatStore();
			const { listenForChats } = messagesStore;	
			let {
				data: { message },
			} = await userService.getUserProfile();
			this.currentUser = message;
				// SETUP GATEWAY
			app.use(socketIO, {
				connection: `${
					process.env.NODE_ENV == 'development'
						? 'ws://localhost:1574' // TODO change
						: 'htt5Bop://PROD'
				}?token=${await userToken()}`,
			});
			listenForEvents();
			listenForChats();
	
		},
		async reportUser(userID) {
			await userService.reportUser(userID);
		},
		async blockUser(userID) {
			try {
				await userService.blockUser(userID);
				router.push('/messages');
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
			const { firstName, lastName } = this.currentUser;
			return firstName + '' + lastName;
		},
	},
});
