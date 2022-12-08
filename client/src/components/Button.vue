<script setup>
	defineProps({
		link: String,
	});
</script>
<template>
	<router-link :to="link">
		<button
			class="text-orange-main text-xs font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
			type="button"
		>
			<slot></slot>
		</button>
	</router-link>
</template>
