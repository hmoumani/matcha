import chatService from '@/services/chatService';
import { defineStore } from 'pinia';
import { useUserStore } from '@/store/user';
import { now } from '@vueuse/core';
import app from '@/main';
import { router } from '@/router';

const getConversationUserID = conversation => conversation.user.id;

export const useChatStore = defineStore('chat', {
	state: () => ({
		showUserProfile: false,
		conversations: [],
		currentConversation: null as null | {},
		msg: '',
	}),
	actions: {
		async fetchConversations() {
			this.conversations = await chatService.fetchConversations();
			// const {
			// 	user: { id: userID },
			// } = this.conversations[0];
			const firstConversation = this.conversations[0];
			if (firstConversation) {
				this.showConversationMessages(firstConversation);
			}
		},
		async showConversationMessages(conversation) {
			// const conversation: Object | undefined = this.conversations.find(
			// 	conversation => getConversationUserID(conversation) === userID
			// );
			// if (!conversation) {
			// 	return;
			// }
			const userID = conversation?.user?.id;
			const messages = await chatService.fetchConversationMessages(
				userID
			);
			this.currentConversation = {
				...messages,
				...conversation,
			};
		},
		sendMessage() {
			const socket = app.config.globalProperties.$socket;
			if (!socket || !this.msg) {
				return;
			}
			const { currentUser } = useUserStore();
			if (!this.currentConversation || !currentUser) {
				return;
			}

			const { id } = currentUser;
			const {
				user: { id: sender_id },
				messages,
			} = this.currentConversation;

			const newMessage = {
				message: this.msg,
				sender_id: id,
				receiver_id: sender_id,
				created_at: now(),
			};

			socket.emit('sendMessage', newMessage);
			this.msg = '';
		},
		listenForChats() {
			const socket = app.config.globalProperties.$socket;
			if (!socket) {
				return;
			}

			socket.on('receiveMessage', data => {
				if (!this.currentConversation) return;
				const { user } = this.currentConversation;
				if (data.sender_id === user?.id || data.receiver_id === user?.id) {
					this.currentConversation.messages.push(data);
				}
			});
		},
	},
});
