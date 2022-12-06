<script setup>
	defineProps({
		link: String,
	});
</script>
<template>
	<button
		class="text-orange-main text-xs font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
		type="button"
	>
		<router-link :to="link">
			<slot></slot>
		</router-link>
	</button>
</template>
