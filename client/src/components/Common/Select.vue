<!--
  Leyton for Me
  Copyright (c) 2022 Leyton Group - All Rights Reserved
  contact@leyton.me

  Unauthorized copying of this file, via any medium is strictly prohibited
  Proprietary and confidential
-->

<template>
	<Listbox as="div" :value="modelValue">
		<div class="mt-0 relativde">
			<ListboxButton
				@click="repositionSelectMenu($event)"
				class="relative w-full bg-white border-2 rounded-md pl-3 pr-12 py-2 text-left cursor-default sm:text-sm"
			>
				<span class="flex items-center pointer-events-none">
					<span class="block truncate">{{ selected.label }}</span>
				</span>
				<span
					class="ml-3 absolute inset-y-0 right-1 flex items-center pr-2 pointer-events-none"
				>
					<ArrowDown
						class="h-2 w-2 text-gray-400"
						aria-hidden="true"
					/>
				</span>
			</ListboxButton>

			<transition
				leave-active-class="transition ease-in duration-100"
				leave-from-class="opacity-100"
				leave-to-class="opacity-0"
			>
				<ListboxOptions
					class="z-40 absolute mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
					:style="{
						top: `${pos.y}px`,
						left: `${pos.x}px`,
						width: `${listBoxButtonWidth}px`,
					}"
				>
					<!-- :class="`top-[${pos.y}px] left-[${pos.x}px] w-[${listBoxButtonWidth}px]`" -->
					<input
						v-show="enableSearch"
						type="text"
						name="price"
						id="price"
						class="m-4 block border-gray-300 rounded-md text-gray-900 w-[80%]"
						placeholder="Name..."
						v-model="optionSearch"
					/>
					<ListboxOption
						as="template"
						v-for="option in availableOptions"
						:key="option.value"
						:value="option"
						v-slot="{ active, selected }"
						@click="updateValue(option)"
					>
						<li
							:class="[
								active ? ' bg-[#F4F4F4]' : '',
								'cursor-pointer  relative py-2 pl-3 pr-9 text-[#102F46]',
							]"
						>
							<div class="flex items-center">
								<span
									:class="[
										selected
											? 'font-semibold'
											: 'font-normal',
										' block truncate',
									]"
								>
									{{ option.label }}
								</span>
							</div>

							<span
								v-if="selected"
								:class="[
									active ? 'text-white' : 'text-indigo-600',
									'absolute inset-y-0 right-0 flex items-center pr-4',
								]"
							>
								<CheckIcon
									class="h-5 w-5 text-black"
									aria-hidden="true"
								/>
							</span>
						</li>
					</ListboxOption>
				</ListboxOptions>
			</transition>
		</div>
	</Listbox>
</template>

<script setup lang="ts">
	import { ref } from 'vue';
	import {
		Listbox,
		ListboxButton,
		ListboxOption,
		ListboxOptions,
	} from '@headlessui/vue';
	import ArrowDown from '../../../public/assets/svgs/ArrowDown.svg';
	import CheckIcon from '../../../public/assets/svgs/Check.svg';
	import { computed } from '@vue/reactivity';

	type Option = any;
	const { modelValue, options } = defineProps<{
		options: Option[];
		modelValue: Option;
		enableSearch?: boolean;
		listBoxOptionsClass?: object;
		listboxButtonClass?: object;
	}>();

	const optionSearch = ref('');

	const availableOptions = computed(() => {
		const search = optionSearch.value.toLowerCase();
		if (!search) {
			return options;
		}
		return options.filter((option: Option) =>
			option.label.toLowerCase().includes(search)
		);
	});

	const selected = ref<Option>(modelValue);

	const emit = defineEmits(['update:modelValue']);
	const updateValue = (newOption: Option) => {
		// TODO : option value must be emitted instead of label
		// Update option in parent
		emit('update:modelValue', newOption.value);
		// Update option in this component
		selected.value = newOption;
	};

	const pos = ref({
		x: 0,
		y: 0,
	});
	const listBoxButtonWidth = ref(0);

	const repositionSelectMenu = (event: MouseEvent) => {
		const buttonOffsets = (
			event.target as HTMLElement
		).getBoundingClientRect();
		const { x, width, y, height } = buttonOffsets;
		pos.value = {
			x: x,
			y: y + height,
		};
		listBoxButtonWidth.value = width;
	};
</script>
