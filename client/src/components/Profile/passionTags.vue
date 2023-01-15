<script setup>
	import { defineComponent } from 'vue';
	import Vue3TagsInput from 'vue3-tags-input';
	import { useUserStore } from '@/store/user';
	import { storeToRefs } from 'pinia';

	const userStore = useUserStore();
	let { currentUser } = storeToRefs(userStore);

	const passions = currentUser.value.passions;

	const handleChangeTag = tags => {
		// passions = tags;
		currentUser.value.passions = tags;
	};
</script>
<template>
	<vue3-tags-input
		:tags="passions"
		placeholder="enter some tags"
		@on-tags-changed="handleChangeTag"
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
