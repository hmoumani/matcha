<script setup lang="ts">
	import { useFeedStore } from '@/store/feed';
	import { storeToRefs } from 'pinia';
	import { useUserStore } from '@/store/user';

	const userStore = useUserStore();
	let { currentUser } = storeToRefs(userStore);
	const feedStore = useFeedStore();

	const { currentProfile } = storeToRefs(feedStore);

	const { showNextProfile } = feedStore;

	onMounted(async () => {
		if (currentUser.value?.location) {
			showNextProfile();
		}
		console.log('foo', currentUser.value);
	});
</script>

<template>
	<div class="flex mt-4 w-full" v-if="currentUser">
		<ProfileCard
			v-if="currentProfile"
			:user="currentProfile"
			class="ml-[17rem] profile"
		/>
		<Settings class="ml-[3rem]" />
	</div>
</template>

<style>
	.dot {
		border-radius: 50%;
		display: inline-block;
	}
	.action {
		@apply cursor-pointer p-3  rounded-xl;
	}
	.carousel__pagination-button {
		@apply -mt-8 z-50 relative;
	}
	.carousel__next {
		@apply text-white !w-32 !h-24;
	}
</style>
<route lang="yaml">
name: home
meta:
    layout: pageWithSidebar
</route>
