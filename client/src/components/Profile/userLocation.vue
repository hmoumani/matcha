<script setup>
	const location = { lat: 33, lng: 1000 };
    const showMap = ref(true);
</script>
<template>
	<div>
		<h2 class="mb-3">Location</h2>
		<Map v-if="showMap" :center="location" />
	</div>
</template>
