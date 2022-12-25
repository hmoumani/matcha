<script setup>
	defineProps({
		messages: Array,
	});

	const isCurrentUserMessage = msgID => msgID === 4;
</script>
<template>
	<div class="p-8 text-[#3C444B]">
		<div
			v-for="message of messages"
			class="flex items-endd gap-x-2"
			:class="{ 'justify-end': isCurrentUserMessage(message.sender_id) }"
		>
			<img
				v-if="!isCurrentUserMessage(message.sender_id)"
				class="w-10 h-10 rounded-full mt-14"
				src="/assets/women.jpg"
				alt=""
			/>
			<div class="w-4/12">
				<div class="pl-4 font-bold">Evan You, 11:30 AM</div>
				<div
					class="shadow-sm rounded-xl py-4 px-3 ml-2 font-medium"
					:class="
						isCurrentUserMessage(message.sender_id)
							? 'bg-grey-color'
							: 'bg-white'
					"
				>
					{{ message.message }}
				</div>
			</div>
		</div>
	</div>
</template>
