<script setup lang="ts">
	import getCurrentUserPosition from './helpers/getCurrentUserPosition';
	import { useUserStore } from '@/store/user';
	import { storeToRefs } from 'pinia';
	import userService from './services/userService';

	const userStore = useUserStore();
	let { currentUser } = storeToRefs(userStore);

	onMounted(async () => {
		let currentUserRef = currentUser?.value;
		if (currentUserRef?.isAutoLocatorEnabled) {
			const UserLocation = await getCurrentUserPosition();
			currentUserRef.location = UserLocation;
			console.log(currentUserRef.location)
		}
	});

	let debouncedUpdate = null;

	watch(userStore, () => {
		clearTimeout(debouncedUpdate);
		debouncedUpdate = setTimeout(() => {
			const { passions, bio, gender, sexualOrientation, location } =
				currentUser.value;
			const newUser = {
				passions,
				bio,
				gender,
				sexualOrientation,
				location,
			};

			userService.updateUser(newUser);
		}, 1000);
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
