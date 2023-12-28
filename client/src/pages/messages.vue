<script setup>
	import { useChatStore } from '@/store/chat';
	import { storeToRefs } from 'pinia';

	const chatStore = useChatStore();
	const { currentConversation, conversations } = storeToRefs(chatStore);
	const isProfileSelected = ref(false);
</script>
<template>
	<div v-show="conversations?.length > 0" class="flex gap-x-2">
		<ContactsList class="pl-d7 pr-d4 w-11/12 xl:w-[30%]" />
		<Conversation class="w-[76%] hidden xl:block" />
	</div>
	<div v-if="conversations.length == 0" class="flex items-center justify-center h-screen text-3xl">
		You have no matches :/
	</div>
	<!-- <UserProfile class="w-[30rem] pl-6 hiddden md:block" :user="currentConversation?.user" /> -->
</template>
<route lang="yaml">
name: messages
meta:
    layout: pageWithSidebar
</route>
