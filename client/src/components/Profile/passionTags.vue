<script setup>
	import { defineComponent } from 'vue';
	import Vue3TagsInput from 'vue3-tags-input';

	defineProps({
		passions: {
			type: Array,
			required: true
		},
		onTagsChanged: {
			type: Function,
			required: true
		},
		maxTags: {
			type: Number,
			default: 5
		}
	})
</script>
<template>
	<vue3-tags-input
		:tags="passions"
		placeholder="enter some tags"
		@on-tags-changed="onTagsChanged"
		:max-tags="5"
		class="w-100 !border-dark flex gap-x-4"
	/>
</template>
<style lang="css">
	.v3ti-content {
		@apply flex gap-x-2 items-center p-2 !border-0;
	}
	.v3ti .v3ti-tag {
		/*border: 1px solid #222222;*/
		/*border-radius: 0;*/
		@apply text-white border-0 p-5 rounded-xl bg-primary-color flex justify-between;
	}

	.v3ti .v3ti-new-tag {
		@apply bg-gray-300 p-5 pl-3 rounded-lg max-w-[10rem];
	}

	.v3ti .v3ti-tag .v3ti-remove-tag {
		color: white;
		transition: color 0.3s;
	}
	.v3ti .v3ti-new-tag * {
		display: block;
	}

	.v3ti .v3ti-tag .v3ti-remove-tag:hover {
		color: #ffffff;
	}
</style>
