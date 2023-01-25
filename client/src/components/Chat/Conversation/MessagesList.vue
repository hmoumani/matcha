<script setup>
	import { useChatStore } from '@/store/chat';
	import { useUserStore } from '@/store/user';
	import { storeToRefs } from 'pinia';
	import { onUpdated, watch } from 'vue';
	import { computed } from '@vue/reactivity';

	const chatStore = useChatStore();
	const userStore = useUserStore();
	const { currentUserFullName, currentUser } = storeToRefs(userStore);
	const { showUserProfile, currentConversation } = storeToRefs(chatStore);
	const { showConversationMessages } = chatStore;

	const userFullName = computed(() => {
		const { user } = currentConversation?.value;
		return `${user?.firstName} ${user?.lastName}`;
	});

	const user = computed(() => currentConversation?.user);

	const messages = ref(null);

	onUpdated(() => {
		if (!messages.value) {
			return;
		}
		messages.value.scrollIntoView({ behavior: 'smooth', block: 'end' });
	});
</script>
<template>
	<div v-if="currentConversation" class="text-[#3C444B] relative rounded-xl">
		<div
			class="border-b-2 border-dark-color sticky top-0 right-0 bg-grey-color opacity-90 z-10 w-full p-8 text-2xl text-dark-color font-medium"
		>
			{{ currentConversation?.id }}
			{{ userFullName }}
		</div>
		<div class="py-6 px-5" ref="messages">
			<Message
				v-for="message of currentConversation?.messages"
				:message="message"
				:user="user"
			/>
		</div>
	</div>
</template>
<style>
	#triangle {
		display: inline-block;
		height: 0;
		width: 0;
		border-bottom: 1rem solid white;
		border-left: 0.9rem solid transparent;
	}
	.reverse {
		transform: scaleX(-1);
	}
</style>
