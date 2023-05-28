<script setup>
	import { useChatStore } from '@/store/chat';
	import { storeToRefs } from 'pinia';
	import { router } from '@/router';

	const userStore = useChatStore();
	const { currentConversation } = storeToRefs(userStore);
	const isProfileSelected = ref(false);
	console.log(currentConversation.value)
	if (!currentConversation.value){
		router.push('/messages');
	}
</script>
<template>
	<div class="flex gap-x-2">
		cur : {{ currentConversation }}
		<Conversation class="w-[76%]  hdidden xl:block" />
	</div>
	<!-- <UserProfile class="w-[30rem] pl-6 hiddden md:block" :user="currentConversation?.user" /> -->
</template>
<route lang="yaml">
name: messages
meta:
    layout: pageWithSidebar
</route>
