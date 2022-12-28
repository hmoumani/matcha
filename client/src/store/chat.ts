import chatService from '@/services/chatService';
import { defineStore } from 'pinia';
import { useUserStore } from '@/store/user';
import { now } from '@vueuse/core';

export const useChatStore = defineStore('chat', {
	state: () => ({
		showUserProfile: true,
		conversations: [],
		currentConversation: null as null | {},
		msg: '',
	}),
	actions: {
		async fetchConversations() {
			this.conversations = await chatService.fetchConversations();
			const {
				user: { id: userID },
			} = this.conversations[0];
			this.showConversationMessages(userID);
		},
		async showConversationMessages(userID) {
			this.currentConversation =
				chatService.fetchConversationMessages(userID);
		},
		sendMessage() {
			const { currentUser } = useUserStore();
			if (!this.currentConversation || !currentUser) {
				return;
			}

			const { id } = currentUser;

			const newMessage = {
				message: this.msg,
				sender_id: id,
				receiver_id: 3, // TODO : change
				created_at: now(),
			};
			console.log({ newMessage, t : this.msg });
			this.currentConversation.messages.push(newMessage);
			// this.msg = '';
		},
	},
});
