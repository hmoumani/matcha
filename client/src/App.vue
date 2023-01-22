<script setup lang="ts">
	import getCurrentUserPosition from './helpers/getCurrentUserPosition';
	import { useUserStore } from '@/store/user';
	import { storeToRefs } from 'pinia';

	const userStore = useUserStore();
	let { currentUser } = storeToRefs(userStore);

	onMounted(async () => {
		let currentUserRef = currentUser?.value;
		// console.log(currentUser.value); //.value.isAutoLocatorEnabled);
		if (currentUserRef?.isAutoLocatorEnabled) {
			const UserLocation = await getCurrentUserPosition();
			currentUserRef.location = UserLocation;
		}
	});
</script>
<template>
	<router-view class="font-poppins" />
</template>
<style>
	body {
		@apply h-screen overflow-hidden;
	}
</style>
