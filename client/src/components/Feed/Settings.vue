<template>
	<div
		class="w-3/12 h-[30rem] bg-white p-6 rounded-lg shadow-sm flex flex-col gap-y-4"
	>
		<div>
			<h2 class="mb-3">Common Tags</h2>
			<passionTags :passions="currentUser.passions"/>
		</div>
		<div>
			<h2 class="mb-3">Location</h2>
			<Map class="" />
		</div>
		<div>
			<RangeSlider />
		</div>
	</div>
</template>
<script setup>
import { useUserStore } from '@/store/user';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
let { currentUser } = storeToRefs(userStore);

const handleChangePassions = (passions) {
	currentUser.value.passions = passions;
}
</script>