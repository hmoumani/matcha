<script setup>
	import { useUserStore } from '@/store/user';
	import { storeToRefs } from 'pinia';
	import searchSettingsService from '@/services/searchSettingsService';

	const userStore = useUserStore();
	let { currentUser } = storeToRefs(userStore);

	const handleChangePassions = passions => {
		currentUser.value.passions = passions;
	};

	const showMap = ref(true);

	const settings = ref({
		minAge: 20,
		maxAge: 40,
		minFameRating: 3,
		maxFameRating: 10,
		location: { lat: 33, lng: 1000 },
	});

	const updateLocation = location => {
		settings.value.location = location;
	};

	const UpdateAgeGap = input => {
		settings.value.minAge = input.minValue;
		settings.value.maxAge = input.maxValue;
	};

	const updateFameRate = input => {
		settings.value.minFameRating = input.minValue;
		settings.value.maxFameRating = input.maxValue;
	};

	onMounted(async () => {
		const {
			data: { message: searchSettings },
		} = await searchSettingsService.getSearchSettings();
		settings.value = searchSettings;
	});
</script>
<template>
	<div
		class="w-3/12 h-[calc(100vh-6rem)] bg-white p-6 rounded-lg shadow-md flex flex-col gap-y-4"
	>
		<div>
			<h2 class="mb-3">Common Tags</h2>
			<passionTags
				:passions="currentUser.passions"
				@on-tags-changed="handleChangePassions"
			/>
		</div>
		<div>
			<h2 class="mb-3">Location</h2>
			<Map
				v-if="showMap"
				@updateLocation="updateLocation"
				:center="settings.location"
			/>
		</div>
		<div>
			<h2 class="mb-3">Age</h2>
			<RangeSlider
				:barMinValue="settings.minAge"
				:barMaxValue="settings.maxAge"
				:min="18"
				:max="100"
				@onChange="UpdateAgeGap"
			/>
		</div>
		<div>
			<h2 class="mb-3">Fame Rate</h2>
			<RangeSlider
				:barMinValue="settings.minFameRating"
				:barMaxValue="settings.maxFameRating"
				:min="1"
				:max="10"
				@onChange="updateFameRate"
			/>
		</div>
	</div>
</template>
