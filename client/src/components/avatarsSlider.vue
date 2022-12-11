<template>
	<carousel :items-to-show="1" v-model="currentSlide" class="relative">
		<slide v-for="avatarUrl in avatars" :key="avatar">
			<img
				:src="avatarUrl"
				class="min-w-full h-[32rem] rounded-t-[2rem]"
			/>
		</slide>

		<template #addons>
			<!-- <navigation /> -->
			<div
				class="absolute top-[50%] text-white flex justify-between w-full"
			>
				<FontAwesomeIcon
					@click="next"
					icon="fa-solid fa-arrow-right"
					class="text-black bg-[#F8F7FF] action px-10"
				/>
                <FontAwesomeIcon
					@click="next"
					icon="fa-solid fa-arrow-left"
					class="text-black bg-[#F8F7FF] action px-10"
				/>
			</div>
			<pagination />
		</template>
	</carousel>
</template>

<script setup>
	// If you are using PurgeCSS, make sure to whitelist the carousel CSS classes
	import 'vue3-carousel/dist/carousel.css';
	import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';

	defineProps({
		avatars: Array,
	});

	const currentSlide = ref(0);

	const next = () => currentSlide.value++;
	const prev = () => currentSlide.value--;
</script>
