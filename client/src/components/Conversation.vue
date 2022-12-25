<script setup>
	import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
	import {} from '@heroicons/vue/24/solid';

	const msg = ref('');

	const user_id = 4;

	let messages = [
		{
			message: 'wsuuupp ??',
			sender_id: 4,
			receiver_id: 4,
			created_at: '2022-03-34',
		},
		{
			message: 'Good, wt abt you?',
			sender_id: 3,
			receiver_id: 4,
			created_at: '2022-03-34',
		},
		{
			message: 'Nothingg..',
			sender_id: 4,
			receiver_id: 4,
			created_at: '2022-03-34',
		},
		{
			message: 'naaah bruh wtf?',
			sender_id: 3,
			receiver_id: 4,
			created_at: '2022-03-34',
		},
	];
	messages = messages.concat(messages);
	messages = messages.concat(messages);
</script>
<template>
	<div class="bg-[#ECF0F4] w-[100%] rounded-xl h-[51rem]">
		<MessagesList :messages="messages" class="h-[91%] overflow-scroll" />
		<div>
			<InputField
				class="px-6"
				:css="{ '!py-4 !px-6 rounded-lg': true }"
				:withLabel="false"
				type="text"
				placeholder="Write your message.."
				v-model="msg"
			>
				<FontAwesomeIcon
					icon="fa-solid fa-paper-plane"
					class="cursor-pointer h-4 w-4 bg-[#00A489] !text-white p-3 px-4 rounded-lg"
				/>
			</InputField>
		</div>
	</div>
</template>
