<script setup lang="ts">
	import getCurrentUserPosition from './helpers/getCurrentUserPosition';
	import { useUserStore } from '@/store/user';
	import { storeToRefs } from 'pinia';
	import userService from './services/userService';
	import { listenForEvents } from '@/notifications'
	import { useFeedStore } from '@/store/feed';
	import { useChatStore } from '@/store/chat'

	const feedStore = useFeedStore();

	const { getNewProfiles } = feedStore;

	const userStore = useUserStore();
	let { currentUser } = storeToRefs(userStore);

	onMounted(async () => {
		
		const messagesStore = useChatStore();
		const { listenForChats } = messagesStore;
		const { msg } = storeToRefs(messagesStore);

		listenForEvents();
		listenForChats();
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
		debouncedUpdate = setTimeout(async () => {
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

			await userService.updateUser(newUser);

			getNewProfiles();

		}, 50);
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
