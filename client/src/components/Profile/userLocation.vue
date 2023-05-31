<script setup>
	import { useUserStore } from '@/store/user';
	import { storeToRefs } from 'pinia';

	const userStore = useUserStore();
	let { currentUser } = storeToRefs(userStore);

	const updateLocation = location => {
		currentUser.value.location = location;
		currentUser.value.isAutoLocatorEnabled = false;
	};
	
	const showMap = ref(currentUser.value.isAutoLocatorEnabled);
	const updateAutoLocater = (newValue) => {
		if (newValue === true){
			currentUser.value.isAutoLocatorEnabled = newValue;
		}
		showMap.value = newValue
	}
</script>
<template>
	<div>
		<div class="flex gap-x-2 justify-between">
			<h2 class="mb-3">Enable Auto Locater :</h2>
			<Toggle v-model="showMap" @update:modelValue="updateAutoLocater" />
		</div>
		<Map
			v-if="!showMap"
			:center="currentUser.location"
			:zoom="11"
			@updateLocation="updateLocation"
		/>
	</div>
</template>
