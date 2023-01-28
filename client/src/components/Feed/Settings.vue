<script setup>
	import { useUserStore } from '@/store/user';
	import { storeToRefs } from 'pinia';
	import { ref, watch } from 'vue';
	import searchSettingsService from '@/services/searchSettingsService';

	const userStore = useUserStore();
	let { currentUser } = storeToRefs(userStore);

	const handleChangePassions = passions => {
		updateSetting('commonTags', passions);
	};

	const showMap = ref(true);

	const settings = ref(null);

	const updateLocation = location => {
		updateSetting('location', location);
	};

	const UpdateAgeGap = input => {
		updateSetting('minAge', input.minValue);
		updateSetting('maxAge', input.maxValue);
	};

	const updateFameRate = input => {
		updateSetting('minFameRating', input.minValue);
		updateSetting('maxFameRating', input.maxValue);
	};

	const updateSetting = (prop, value) => {
		settings.value[prop] = value;
		searchSettingsService.update(settings.value);
	};

	onMounted(async () => {
		const {
			data: { message: searchSettings },
		} = await searchSettingsService.get();
		settings.value = searchSettings;
	});
</script>

<template>
	<div
		v-if="settings"
		class="w-3/12 h-[calc(100vh-6rem)] bg-white p-6 rounded-lg shadow-md flex flex-col gap-y-4"
	>
		<div>
			<h2 class="mb-3">Common Tags</h2>
			<passionTags
				:passions="settings.commonTags"
				@onTagsChanged="handleChangePassions"
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
