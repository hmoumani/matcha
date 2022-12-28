<script setup>
	import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
	import {} from '@heroicons/vue/24/solid';

	const msg = ref('');

	const user_id = 4;
</script>
<template>
	<div
		class="bg-[#ECF0F4] w-[100%] rounded-xl h-[calc(100vh-2rem)] pr-6 pt-4"
	>
		<MessagesList :messages="messages" class="h-[91%] overflow-y-scroll" />
		<div>
			<InputField
				class="pt-4 pl-6"
				:css="{ '!py-3 !px-10 rounded-lg text-xl ': true }"
				:withLabel="false"
				type="text"
				placeholder="Write your message.."
				v-model="msg"
			>
				<FontAwesomeIcon
					icon="fa-solid fa-paper-plane"
					class="cursor-pointer h-4 w-4 bg-[#00A489] !text-white p-3 rounded-lg mr-1"
				/>
			</InputField>
		</div>
	</div>
</template>
