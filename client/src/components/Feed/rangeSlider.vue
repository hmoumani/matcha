<template>
	<div class="multi-range-slider-container">
		<MultiRangeSlider
			:min="min"
			:max="max"
			:step="step"
			:ruler="false"
			:label="false"
			:minValue="barMinValue"
			:maxValue="barMaxValue"
			@input="UpdateValues"
		/>
	</div>
	<div class="flex justify-between p-2">
		<div>
			{{ barMinValue }}
		</div>
		<div>{{ barMaxValue }}</div>
	</div>
</template>
<script setup>
	import MultiRangeSlider from 'multi-range-slider-vue';

	defineProps({
		barMinValue:String,
		barMaxValue:String,
		min:Number,
		max:Number,
		step: {
			type: Number,
			default: 1
		}
	})

	const emit = defineEmits(["onChange"]);

	function UpdateValues(data) {
		emit("onChange", data);
	}
</script>
<style>
	.multi-range-slider-container {
		max-width: 500px;
		margin: 0px auto;
	}
	.multi-range-slider {
		@apply !border-0 !shadow-sm !p-0;
	}
	.thumb::before {
		@apply !shadow-none;
	}
	.multi-range-slider .bar-inner {
		@apply bg-primary-color !shadow-none !border-none;
	}
	.bar-left,
	.bar-right {
		@apply !bg-slate-100 !shadow-none ;
	}
</style>
