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
			class="flex items-end gap-x-2"
			:class="{ 'justify-end': isCurrentUserMessage(message.sender_id) }"
		>
			<img
				v-if="!isCurrentUserMessage(message.sender_id)"
				class="w-10 h-10 rounded-full mt-12"
				src="/assets/women.jpg"
				alt=""
			/>
			<div>
				<div class="pl-3 font-bold">Evan You, 11:30 AM</div>
				<div
					class="relative shadow-sm rounded-2xl rounded-bl-none py-4 px-5 ml-2 font-medium"
					:class="
						isCurrentUserMessage(message.sender_id)
							? 'bg-grey-color'
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
