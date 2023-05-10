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
	<div class="flex mt-4 w-full items-center justify-center" v-if="currentUser">
		<searchSettings class="ml:0 sm:ml-[3rem] w-12/12 lg:w-8/12 xl:w-5/12 " />
	</div>
</template>

<route lang="yaml">
name: Settings
meta:
    layout: pageWithSidebar
</route>
