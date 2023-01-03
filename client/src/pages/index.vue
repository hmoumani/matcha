<script setup lang="ts">
	import { useFeedStore } from '@/store/feed';
	import { storeToRefs } from 'pinia';

	const feedStore = useFeedStore();

	const { currentProfile } = storeToRefs(feedStore);

	const { showNextProfile } = feedStore;

	showNextProfile();
</script>

<template>
	<Header />
	<div class="flex">
		<Sidebar></Sidebar>
		<ProfileCard v-if="currentProfile" :user="currentProfile" />
	</div>
</template>

<style>
	.dot {
		border-radius: 50%;
		display: inline-block;
	}
	.action {
		@apply cursor-pointer p-4 mx-2 rounded-xl;
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
    layout: sidebar
</route>
