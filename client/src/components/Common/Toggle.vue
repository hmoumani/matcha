<template>
	<Switch
		v-model="enabled"
		@input="updateValue"
		:class="[
			modelValue ? 'bg-primary-color' : 'bg-gray-200',
			'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ',
		]"
	>
		<span class="sr-only">Use setting</span>
		<span
			aria-hidden="true"
			:class="[
				modelValue ? 'translate-x-5' : 'translate-x-0',
				'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
			]"
		/>
	</Switch>
</template>

<script setup>
	import { ref } from 'vue';
	import { Switch } from '@headlessui/vue';

	const { modelValue } = defineProps({
		modelValue: {
			type: Boolean,
			default: false,
		},
	});

	const emit = defineEmits(['update:updateValue']);

	const updateValue = newValue => {
		emit('update:modelValue', newValue);
	};

	const enabled = ref(modelValue);

	watch(enabled, updateValue);
</script>
