<script setup>
	// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
	import { ChevronRightIcon } from '@heroicons/vue/24/solid';

	defineProps({
		user: Object,
	});
</script>
<template>
	<div>
		<div class="flex gap-x-3 border-b-2 border-grey-color pb-4 items-center">
			<!-- <FontAwesomeIcon icon="fa-solid fa-arrow-left" /> -->
			<div class="bg-grey-color p-3 w-12 h-12 rounded-xl">
				<ChevronRightIcon class="w-6 h-6 text-black-color" />
			</div>
			<div class="text-2xl ">Profile</div>
		</div>
	</div>
</template>
