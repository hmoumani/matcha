<script setup lang="ts">
	import { useChatStore } from '@/store/chat';
	import { storeToRefs } from 'pinia';

	const messagesStore = useChatStore();
	const { conversations, currentConversation } = storeToRefs(messagesStore);
	const { fetchConversations, showConversationMessages } = messagesStore;

	fetchConversations();
</script>
<template>
	<div class="mt-8">
		<div
			class="flex gap-x-4 mt-2 mb-6 py-2 text-2xl text-[#3C444B] font-medium"
		>
			<img class="h-8 w-auto" src="/assets/logo.svg" alt="" />
			Your Matches
		</div>

		<searchconversations />
		<!-- <h1 class="py-4 text-xl text-[#3C444B] font-medium">Last Chats</h1> -->
		<div
			class="mt-9 overflow-y-scroll overflow-hidden h-[calc(100vh-16rem)]"
		>
			<div
				v-for="(conversation, index) of conversations"
				@click="showConversationMessages(conversation)"
				class="flex py-6 px-6 rounded-xl cursor-pointer shadow-sm"
				:class="{
					'bg-[#EDF0F4]':
						conversation.user.id == currentConversation?.user?.id,
				}"
			>
				<img
					class="w-12 h-12 bg-red-300 rounded-full"
					:src="conversation.user.avatar"
				/>
				<div class="flex flex-col pl-4">
					<h1 class="font-medium">
						{{
							conversation.user.firstName +
							' ' +
							conversation.user.lastName
						}}
					</h1>
					<p class="text-black-color font-bold w-[80%] truncate">
						{{ conversation.lastMessage.content || '' }}
					</p>
				</div>
			</div>
		</div>
	</div>
</template>
