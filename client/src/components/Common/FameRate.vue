<template>
	<vue3-star-ratings v-model="rate" :showControl="false" />
</template>
<script setup>
	import { defineComponent } from 'vue';
	import vue3starRatings from 'vue3-star-ratings';

	const { rating } = defineProps({
		rating: Number,
	});

	const rate = ref(rating);
</script>
