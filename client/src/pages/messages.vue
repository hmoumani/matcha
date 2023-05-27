<script setup>
	import { useChatStore } from '@/store/chat';
	import { storeToRefs } from 'pinia';

	const userStore = useChatStore();
	const { currentConversation } = storeToRefs(userStore);
	const isProfileSelected = ref(false);
</script>
<template>
	<div class="flex gap-x-2">
		<ContactsList
			vd-if="!isProfileSelected"
			class="pl-d7 pr-d4 w-11/12 xl:w-[30%]"
		/>
		<Conversation class="w-[76%]  hidden xl:block" />
	</div>
	<!-- <UserProfile class="w-[30rem] pl-6 hiddden md:block" :user="currentConversation?.user" /> -->
</template>
<route lang="yaml">
name: messages
meta:
    layout: pageWithSidebar
</route>
