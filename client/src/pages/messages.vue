<script setup>
	import { useChatStore } from '@/store/chat';
	import { storeToRefs } from 'pinia';

	const userStore = useChatStore();
	const { currentConversation } = storeToRefs(userStore);
</script>
<template>
	<!-- <Header /> -->
	<div class="flex pl-2 py-7">
		<Sidebar></Sidebar>
		<ContactsList class="pl-7 pr-4 w-[40%]" />
		<Conversation />
		<UserProfile class="w-[30rem] pl-6" :user="currentConversation?.user" />
	</div>
</template>
