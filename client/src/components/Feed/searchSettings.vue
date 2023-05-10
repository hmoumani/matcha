<script setup>
	import { useUserStore } from '@/store/user';
	import { storeToRefs } from 'pinia';
	import { ref, watch } from 'vue';
	import searchSettingsService from '@/services/searchSettingsService';
	import { useFeedStore } from '@/store/feed';

	const userStore = useUserStore();
	let { currentUser } = storeToRefs(userStore);

	const handleChangePassions = passions => {
		updateSetting('commonTags', passions);
	};

	const showMap = ref(true);

	const settings = ref(null);

	const updateSuggestions = () => {
		if (currentUser.value?.location) {
			getNewProfiles();
		}
	};

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

	const updateSetting = async (prop, value) => {
		settings.value[prop] = value;
		await searchSettingsService.update(settings.value);
		updateSuggestions();
	};
	const feedStore = useFeedStore();

	const { currentProfile } = storeToRefs(feedStore);

	const { getNewProfiles } = feedStore;

	let sortUsersByOptions = [
		{
			label: 'Age',
			value: 'age',
		},
		{
			label: 'Fame Rating',
			value: 'fame_rate',
		},
		{
			label: 'Location',
			value: 'distance',
		},
		{
			label: 'Tags',
			value: 'common_passions_count',
		},
	];

	const defaultSortOption = computed(() => {
		if (!settings.value?.sortBy) {
			return sortUsersByOptions[0];
		}
		return sortUsersByOptions.find(option => option.value === settings.value?.sortBy);
	});

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
		class="sm:h-auto max-h-[calc(d100vh-6rem)] bg-white p-6 rounded-lg shadow-md flex flex-col gap-y-4 pb-10"
	>
		<div>
			<h2 class="mb-1">Sort by</h2>
			<Select
				v-model="defaultSortOption"
				:options="sortUsersByOptions"
				@update:modelValue="
					userByOption => updateSetting('sortBy', userByOption)
				"
				class="mb-4 w-60 h-3 mr-28 border-gray-300 text-sm my-4"
			/>
		</div>
		<div>
			<h2 class="mb-3 mt-10">Common Tags</h2>
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
