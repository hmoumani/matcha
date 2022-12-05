<script setup lang="ts">
	defineProps({
		title: String,
		fields: Array,
	});
</script>
<template>
	<form>
		<InputField v-for="field of fields" :label="field.name" v-model="field.value"/>
	</form>
</template>
