<script setup>
import { useUserStore } from '@/store/user';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
let { currentUser } = storeToRefs(userStore);

const handleChangePassions = (passions) => {
	currentUser.value.passions = passions;
}

const updateLocation = (location) => {
	console.log(location)
	// TODO: save search loacation 
}

const showMap = ref(true);
</script>
<template>
	<div
		class="w-3/12 h-[calc(100vh-10rem)] bg-white p-6 rounded-lg shadow-sm flex flex-col gap-y-4"
	>
		<div>
			<h2 class="mb-3">Common Tags</h2>
			<passionTags :passions="currentUser.passions" @on-tags-changed="handleChangePassions"/>
		</div>
		<div>
			<h2 class="mb-3">Location</h2>
			<Map v-if="showMap" class="" @updateLocation="updateLocation"/>
		</div>
		<div>
			<!-- <RangeSlider /> -->
		</div>
		<!-- <div class="bg-blue-400 w-[13rem] h-10 text-white rounded-md flex jusdtify-center items-center ">
			<div class="w-2/12 border-r-2 p-3">
				B
			</div>
			<div class="pl-3">
				Travel to this place
			</div>
		</div> -->
	</div>
</template>