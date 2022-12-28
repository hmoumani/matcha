<script setup lang="ts">
	import { useChatStore } from '@/store/chat';
	import { storeToRefs } from 'pinia';

	const messagesStore = useChatStore();
	const { conversations } = storeToRefs(messagesStore);
	const { fetchConversations, showConversationMessages } = messagesStore;

	fetchConversations();

	const currentConversation = ref(0);

	const updateCurrentConversation = (conversation, index) => {
		currentConversation.value = index;
		conversation.user.id = index; // todo : temp line, will be deleted
		showConversationMessages(conversation.user.id);
	};
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
				@click="updateCurrentConversation(conversation, index)"
				class="flex py-6 px-6 rounded-xl cursor-pointer shadow-sm"
				:class="{
					'bg-[#EDF0F4]': index == currentConversation,
					'': index !== currentConversation,
				}"
			>
			{{ conversation.user.id }}
				<img
					class="w-12 h-12 rounded-full"
					:src="conversation.user.avatar"
					alt=""
				/>
				<div class="flex flex-col pl-4">
					<h1 class="font-medium">
						{{
							conversation.user.first_name +
							' ' +
							conversation.user.last_name
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
