<template>
	<vue3-star-ratings
		v-model="rate"
		:showControl="false"
		:disableClick="true"
	/>
</template>
<script setup>
	import { defineComponent } from 'vue';
	import vue3starRatings from 'vue3-star-ratings';

	const { rating } = defineProps({
		rating: Number,
	});

	const rate = ref(rating);
</script>
<style>
	.vue3-star-ratings__wrapper {
		font-size: 1px!important;
		padding: 1px!important;
		margin: 0rem!important;
	}

	.vue3-star-ratings{
        display: block!important;
		text-align: left!important;
    }

	.stars svg[data-v-76dea496] {
		width: 20px !important;
	}
</style>
