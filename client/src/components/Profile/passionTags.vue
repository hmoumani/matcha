<script setup>
	import { defineComponent } from 'vue';
	import Vue3TagsInput from 'vue3-tags-input';
	import { useUserStore } from '@/store/user';
	import { storeToRefs } from 'pinia';

	const userStore = useUserStore();
	let { currentUser } = storeToRefs(userStore);

	const tags = currentUser.value.passions.map(passion => passion.name);

	const handleChangeTag = tags => {
		this.tags = tags;
	};
</script>
<template>
	<vue3-tags-input
		:tags="tags"
		placeholder="enter some tags"
		@on-tags-changed="handleChangeTag"
		class="w-100 border-dark flex gap-x-4"
	/>
	<!-- <div class="w-100 border-dark flex gap-x-4">
						<div
							v-for="passion in currentUser.passions"
							class="text-black border-2 py-2 px-4 rounded-xl border-primary-color"
						>
							{{ passion.name }}
						</div>
					</div> -->
</template>
<style lang="css">
	.v3ti-content {
		@apply flex gap-x-2 items-center p-2;
	}
	.v3ti .v3ti-tag {
		/*border: 1px solid #222222;*/
		/*border-radius: 0;*/
		@apply text-white border-2 p-5 rounded-xl bg-primary-color flex justify-around;
	}

    .v3ti .v3ti-new-tag {
        @apply bg-gray-300 p-5 pl-3 rounded-lg max-w-[10rem]
    }

	.v3ti .v3ti-tag .v3ti-remove-tag {
		color: white;
		transition: color 0.3s;
	}

	.v3ti .v3ti-tag .v3ti-remove-tag:hover {
		color: #ffffff;
	}
</style>
