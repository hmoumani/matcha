<script setup>
	import { useMessagesStore } from '@/store/messages';
	import { storeToRefs } from 'pinia';

	defineProps({
		messages: Array,
	});

	const messagesStore = useMessagesStore();
	const { showUserProfile } = storeToRefs(messagesStore);
	const isCurrentUserMessage = msgID => msgID === 4;
</script>
<template>
	<div class="text-[#3C444B] relative rounded-xl">
		<div
			class="border-b-2 border-dark-color sticky top-0 right-0 bg-grey-color opacity-90 z-10 w-full p-8 text-2xl text-dark-color font-medium"
		>
			Rebika Zin
		</div>
		<div class="py-6 px-5">
			<div
				v-for="message of messages"
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
								? 'bg-black-color'
								: 'bg-white'
						"
					>
						<div
							v-if="!isCurrentUserMessage(message.sender_id)"
							id="triangle"
							class="absolute left-[-.6rem] bottom-0"
						></div>
						{{ message.message }}
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
</style>
