<script setup>
	import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
	import { useChatStore } from '@/store/chat';
	import { storeToRefs } from 'pinia';

	const messagesStore = useChatStore();
	const { sendMessage } = messagesStore;
	const { msg } = storeToRefs(messagesStore);

</script>
<template>
	<div
		class="bg-[#ECF0F4] rounded-xl h-[calc(100vh-6rem)] pr-6 pt-4"
	>
		<MessagesList class="h-[87%] overflow-y-scroll" />
		<div>
			<InputField
				class="pt-4 pl-6"
				:css="{ '!py-3 !px-10 rounded-lg text-xl ': true }"
				:withLabel="false"
				type="text"
				placeholder="Write your message.."
				v-model="msg"
				@keydown.enter="sendMessage"
			>
				<FontAwesomeIcon
					@click="sendMessage"
					icon="fa-solid fa-paper-plane"
					class="cursor-pointer h-4 w-4 bg-[#00A489] !text-white p-3 rounded-lg mr-1"
				/>
			</InputField>
		</div>
	</div>
</template>
