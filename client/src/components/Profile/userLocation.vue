<script setup>
	import { useUserStore } from '@/store/user';
	import { storeToRefs } from 'pinia';

	const userStore = useUserStore();
	let { currentUser } = storeToRefs(userStore);
	const location = { lat: 33, lng: 1000 };
	const showMap = ref(true);

	const updateLocation = location => {
		// console.log({ currentUser });
		currentUser.value.location = location
	};
</script>
<template>
	<div>
		<h2 class="mb-3">Location</h2>
		<Map
			v-if="showMap"
			:center="location"
			@updateLocation="updateLocation"
		/>
	</div>
</template>
