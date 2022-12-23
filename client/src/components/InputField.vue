<script setup>
	defineProps({
		label: String,
		type: String,
		modelValue: String,
	});

	const emit = defineEmits(['update:updateValue']);
	const updateValue = event => {
		emit('update:modelValue', event.target.value);
	};
</script>
<template>
	<div>
		<label for="email" class="block text-sm font-medium text-gray-700">{{
			label
		}}</label>
		<div class="mt-1 mb-2">
			<input
				id="email"
				name="email"
				:type="type"
				block
				autocomplete="off"
				required=""
				class="w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
				:value="modelValue"
				@input="updateValue"
			/>
		</div>
	</div>
</template>
