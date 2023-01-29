<script setup lang="ts">
	import getCurrentUserPosition from './helpers/getCurrentUserPosition';
	import { useUserStore } from '@/store/user';
	import { storeToRefs } from 'pinia';
	import userService from './services/userService';
	import { setupUserGateway } from './notifications/userGateway';

	const userStore = useUserStore();
	let { currentUser } = storeToRefs(userStore);

	onMounted(async () => {
		let currentUserRef = currentUser?.value;
		if (!currentUserRef?.isAutoLocatorEnabled) {
			return;
		}
		const UserLocation = await getCurrentUserPosition();
		currentUserRef.location = UserLocation;
	});

	let debouncedUpdate = null;

	watch(userStore, () => {
		clearTimeout(debouncedUpdate);
		debouncedUpdate = setTimeout(() => {
			const {
				passions,
				biography,
				gender,
				sexualOrientation,
				location,
				isAutoLocatorEnabled,
			} = currentUser.value;

			const newUser = {
				passions,
				biography,
				gender,
				sexualOrientation,
				location,
				isAutoLocatorEnabled,
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
