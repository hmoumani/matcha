<script setup>
	import { useChatStore } from '@/store/chat';
	import { storeToRefs } from 'pinia';
	import { router } from '@/router';

	const userStore = useChatStore();
	const { currentConversation } = storeToRefs(userStore);
	const isProfileSelected = ref(false);
	if (!currentConversation.value){
		router.push('/messages')
	}
</script>
<template>
	<div class="flex gap-x-2 justify-center">
		<UserProfile
			class="w-12/12 lg:w-8/12 xl:w-5/12 pl-6"
			:user="currentConversation?.user"
		/>
	</div>
</template>
<route lang="yaml">
name: ss
meta:
    layout: pageWithSidebar
</route>
