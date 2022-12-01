<script setup>
	defineProps({
		label: String,
	});
</script>
<template>
	<label for="email" class="block text-sm font-medium text-gray-700">{{
		label
	}}</label>
	<div class="mt-1 mb-4">
		<input
			id="email"
			name="email"
			type="email"
			autocomplete="email"
			required=""
			class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
		/>
	</div>
</template>
