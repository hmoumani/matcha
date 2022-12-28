import chatService from '@/services/chatService';
import { defineStore } from 'pinia';

export const useChatStore = defineStore('chat', {
	state: () => ({
		showUserProfile: true,
		conversations: [],
		currentConversation: null,
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
	},
});
