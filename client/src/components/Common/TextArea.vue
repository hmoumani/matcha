<script setup>
	defineProps({
		label: String,
		text: String,
	});
</script>
<template>
	<div>
		<label for="comment" class="block text-sm font-medium text-gray-700">{{
			label
		}}</label>
		<div class="mt-1">
			<textarea
				rows="4"
				cols="30"
				name="comment"
				id="comment"
				class="h-20block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
				>{{ text }}</textarea
			>
		</div>
	</div>
</template>
