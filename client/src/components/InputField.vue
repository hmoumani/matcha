<script setup>
	defineProps({
		label: String,
		type: String,
		icon: Object,
		modelValue: String,
		placeholder: String,
		withLabel: {
			type: Boolean,
			default() {
				return true;
			},
		},
		css: {
			type: String,
			default() {
				return '';
			},
		},
	});

	const emit = defineEmits(['update:updateValue']);
	const updateValue = event => {
		emit('update:modelValue', event.target.value);
	};
</script>
<template>
	<div>
		<label
			v-if="withLabel"
			for="email"
			class="block text-sm font-medium text-gray-700"
			>{{ label }}</label
		>
		<div class="mt-1 mb-2 relative">
			<input
				id="email"
				name="email"
				:placeholder="placeholder"
				:type="type"
				block
				autocomplete="off"
				required=""
				class="w-full appearance-none rounded-md border-0 px-3 py-2 placeholder-gray-400 shadow-sm"
				:class="css"
				:value="modelValue"
				@input="updateValue"
			/>
			<div
				class="pointer-cursor absolute inset-y-0 right-0 flex items-center pr-3"
			>
				<slot
					aria-hidden="true"
				/>
			</div>

			<!-- focus:border-indigo-500 focus:outline-none focus:ring-indigo-500  -->
		</div>
	</div>
</template>
