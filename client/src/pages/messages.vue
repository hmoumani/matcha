<script setup>
	import { useChatStore } from '@/store/chat';
	import { storeToRefs } from 'pinia';

	const userStore = useChatStore();
	const { currentConversation } = storeToRefs(userStore);
</script>
<template>
	<ContactsList class="pl-7 pr-4 w-[40%]" />
	<Conversation />
	<UserProfile class="w-[30rem] pl-6" :user="currentConversation?.user" />
</template>
<route lang="yaml">
name: messages
meta:
    layout: pageWithSidebar
</route>
