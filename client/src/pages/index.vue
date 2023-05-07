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
		<ProfileCard
			v-if="currentProfile"
			:user="currentProfile"
			class="ml-[6rem] profile"
		/>
		<Settings class="ml-[3rem] hidden 2xl:block w-4/12 " />
	</div>
</template>

<route lang="yaml">
name: home
meta:
    layout: pageWithSidebar
</route>
