<script setup>
	import { useChatStore } from '@/store/chat';
	import { useUserStore } from '@/store/user';
	import { storeToRefs } from 'pinia';
	import { onUpdated, watch } from 'vue';
	import { ChevronLeftIcon } from '@heroicons/vue/24/solid';
	import { computed } from '@vue/reactivity';
	import { useMobile } from '@/helpers/useMobile';

	const chatStore = useChatStore();
	const isMobile = useMobile();
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
			class="border-b-2 border-dark-color sticky top-0 right-0 bg-grey-color opacity-90 z-10 w-full p-8 text-2xl text-dark-color font-medium flex gap-x-3 items-center"
		>
			<router-link
				to="/messages"
				v-if="isMobile"
				class="px-6 py-3 rounded-lg bg-white cursor-pointer"
			>
				<ChevronLeftIcon class="w-6 h-6 text-black" />
			</router-link>
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
