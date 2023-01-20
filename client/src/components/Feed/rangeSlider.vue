<template>
	<div class="multi-range-slider-container">
		<MultiRangeSlider
			:min="0"
			:max="100"
			:step="1"
			:ruler="false"
			:label="false"
			:minValue="barMinValue"
			:maxValue="barMaxValue"
			@input="UpdateValues"
		/>
	</div>
</template>
<script setup>
	import MultiRangeSlider from 'multi-range-slider-vue';

	let barMinValue = 10;
	let barMaxValue = 90;

	function UpdateValues(e) {
		barMinValue = e.minValue;
		barMaxValue = e.maxValue;
	}
</script>
<style>
	.multi-range-slider-container {
		max-width: 500px;
		margin: 0px auto;
	}
	.multi-range-slider{
		@apply !border-0 !shadow-none !p-0;
	}
	.thumb::before{
		@apply !shadow-none
	}
	.multi-range-slider .bar-inner{
		@apply bg-primary-color !shadow-none !border-none
	}
	.bar-left, .bar-right{
		@apply bg-white !shadow-none
	}
</style>
