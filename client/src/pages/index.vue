<script setup lang="ts">
	import { useFeedStore } from '@/store/feed';
	import { storeToRefs } from 'pinia';
	import { useUserStore } from '@/store/user';

	const userStore = useUserStore();
	let { currentUser } = storeToRefs(userStore);
	const feedStore = useFeedStore();

	const { currentProfile } = storeToRefs(feedStore);

	const { showNextProfile } = feedStore;

	showNextProfile();
</script>

<template>
	<Header />
	<div class="flex bg-[#F6F7FF] h-screen">
		<Sidebar></Sidebar>
		<div class="flex mt-4 w-full" v-if="currentUser">
			<ProfileCard
				v-if="currentProfile"
				:user="currentProfile"
				class="ml-[17rem]"
			/>
			<Settings class="ml-[3rem]"/>
		</div>
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
