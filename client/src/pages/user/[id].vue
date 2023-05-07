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

<route lang="yaml">
name: homes
meta:
    layout: pageWithSidebar
</route>
