<script setup>
	import { useChatStore } from '@/store/chat';
	import { useUserStore } from '@/store/user';
	import { storeToRefs } from 'pinia';
	import { formatTime } from '@/helpers/formatTime';

	const { message, user } = defineProps({
		message: Object,
		user: Object,
	});

	const userStore = useUserStore();
	const { currentUserFullName, currentUser } = storeToRefs(userStore);

	const isCurrentUserMessage = computed(
		() => message.sender_id === currentUser?.value?.id
	);

	const chatStore = useChatStore();
	const { showUserProfile, currentConversation } = storeToRefs(chatStore);

	const userFullName = computed(() => {
		const { user } = currentConversation?.value;
		return `${user?.firstName} ${user?.lastName}`;
	});

	const messageSender = computed(() => {
		if (isCurrentUserMessage?.value) {
			return currentUserFullName.value;
		}
		return userFullName.value;
	});
</script>
<template>
	<div
		class="flex items-end gap-x-2 mb-3"
		:class="{
			'justify-end': isCurrentUserMessage,
		}"
	>
		<img
			v-if="!isCurrentUserMessage"
			@click="showUserProfile = true"
			class="w-10 h-10 rounded-full mt-12 cursor-pointer"
			:src="currentConversation?.user?.avatar"
			alt=""
		/>
		<div>
			<div class="pl-3 font-bold">
				{{ messageSender }},
				{{ formatTime(message.created_at) }}
			</div>
			<div
				class="relative shadow-sm rounded-2xl rounded-bl-none py-4 px-5 ml-2 font-medium"
				:class="
					isCurrentUserMessage ? 'bg-black-color reverse' : 'bg-white'
				"
			>
				<div
					id="triangle"
					class="absolute left-[-.6rem] bottom-0"
					:class="{
						'!border-b-black-color border-b-[1rem]':
							isCurrentUserMessage,
					}"
				></div>
				<div :class="{ reverse: isCurrentUserMessage }">
					{{ message.message }}
				</div>
			</div>
		</div>
	</div>
</template>