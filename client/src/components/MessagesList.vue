<script setup>
	import { useChatStore } from '@/store/chat';
	import { storeToRefs } from 'pinia';

	defineProps({
		messages: Array,
	});

	const chatStore = useChatStore();
	const { showUserProfile, currentConversation } = storeToRefs(chatStore);
	const { showConversationMessages } = chatStore;
	// const { messages } = currentConversationMessages;
	showConversationMessages();
	const messages = [];
	console.log({ currentConversation });
	const isCurrentUserMessage = msgID => msgID === 4;
</script>
<template>
	<div class="text-[#3C444B] relative rounded-xl">
		<div
			class="border-b-2 border-dark-color sticky top-0 right-0 bg-grey-color opacity-90 z-10 w-full p-8 text-2xl text-dark-color font-medium"
		>
			{{ currentConversation.id }}
			Rebika Zin
		</div>
		<div class="py-6 px-5">
			<div
				v-for="message of currentConversation.messages"
				class="flex items-end gap-x-2 mb-3"
				:class="{
					'justify-end': isCurrentUserMessage(message.sender_id),
				}"
			>
				<img
					v-if="!isCurrentUserMessage(message.sender_id)"
					@click="showUserProfile = true"
					class="w-10 h-10 rounded-full mt-12 cursor-pointer"
					src="/assets/women.jpg"
					alt=""
				/>
				<div>
					<div class="pl-3 font-bold">Evan You, 11:30 AM</div>
					<div
						class="relative shadow-sm rounded-2xl rounded-bl-none py-4 px-5 ml-2 font-medium"
						:class="
							isCurrentUserMessage(message.sender_id)
								? 'bg-black-color reverse'
								: 'bg-white'
						"
					>
						<div
							id="triangle"
							class="absolute left-[-.6rem] bottom-0"
							:class="
								isCurrentUserMessage(message.sender_id)
									? '!border-b-black-color border-b-[1rem]'
									: ''
							"
						></div>
						<div
							:class="
								isCurrentUserMessage(message.sender_id)
									? 'reverse'
									: ''
							"
						>
							{{ message.message }}
						</div>
					</div>
				</div>
			</div>
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
