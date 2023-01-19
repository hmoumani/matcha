<template>
	<div class="multi-range-slider-container">
		<MultiRangeSlider
			:baseClassName="multi - range - slider"
			:min="0"
			:max="100"
			:step="1"
			:ruler="true"
			:label="true"
			:minValue="barMinValue"
			:maxValue="barMaxValue"
			@input="UpdateValues"
		/>
	</div>

	<!-- <div class="flex w-64 m-auto items-center h-32 justify-center">
		<div class="py-1 relative min-w-full">
			<div class="h-2 bg-gray-200 rounded-full">
				<div
					class="absolute h-2 rounded-full bg-teal-600 w-0"
					style="width: 24.1935%; left: 11.2903%"
				></div>
				<div
					class="absolute h-4 flex items-center justify-center w-4 rounded-full bg-white shadow border border-gray-300 -ml-2 top-0 cursor-pointer"
					unselectable="on"
					onselectstart="return false;"
					style="left: 11.2903%"
				></div>
				<div
					class="absolute h-4 flex items-center justify-center w-4 rounded-full bg-white shadow border border-gray-300 -ml-2 top-0 cursor-pointer"
					unselectable="on"
					onselectstart="return false;"
					style="left: 35.4839%"
				></div>
				<div class="absolute text-gray-800 -ml-1 bottom-0 left-0 -mb-6">
					$ 8
				</div>
				<div
					class="absolute text-gray-800 -mr-1 bottom-0 right-0 -mb-6"
				>
					$ 70
				</div>
			</div>
		</div>
	</div> -->
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
		margin: 50px auto;
	}
</style>
