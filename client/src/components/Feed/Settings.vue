<script setup>
	import { useUserStore } from '@/store/user';
	import { storeToRefs } from 'pinia';

	const userStore = useUserStore();
	let { currentUser } = storeToRefs(userStore);

	const handleChangePassions = passions => {
		currentUser.value.passions = passions;
	};

	const updateLocation = location => {
		console.log(location);
		// TODO: save search loacation
	};

	const showMap = ref(true);

	const settings = ref({
		minAge: 20,
		maxAge: 40,
		minFameRating:3,
		maxFameRating:10
	});

	const UpdateValues = input => {
		settings.value.minAge = input.minValue;
		settings.value.maxAge = input.maxValue;
	};
	
</script>
<template>
	<div
		class="w-3/12 h-[calc(100vh-6rem)] bg-white p-6 rounded-lg shadow-sm flex flex-col gap-y-4"
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
			<Map v-if="showMap" class="" @updateLocation="updateLocation" />
		</div>
		<div>
			<h2 class="mb-3">Age</h2>
			<RangeSlider
				:barMinValue="settings.minAge"
				:barMaxValue="settings.maxAge"
				:min="18"
				:max="100"
				@onChange="UpdateValues"
			/>
		</div>
		<div>
			<h2 class="mb-3">Fame Rate</h2>
			<RangeSlider
				:barMaxValue="settings.minFameRating"
				:barMinValue="settings.maxFameRating"
				:min="1"
				:max="10"
				@onChange="UpdateValues"
			/>
		</div>
	</div>
</template>
