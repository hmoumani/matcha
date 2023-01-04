<script setup>
	import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

	const contactName = ref('');
</script>
<template>
	<InputField
		:css="{ 'bg-[#EDF0F4] !py-4 !px-6 rounded-xl': true }"
		:withLabel="false"
		type="text"
		placeholder="Write your message.."
		v-model="contactName"
	>
		<FontAwesomeIcon
			icon="fa-solid fa-search "
			class="cursor-pointer h-5 w-5 !text-gray-400 p-3 px-4 rounded-lg"
		/>
	</InputField>
</template>
