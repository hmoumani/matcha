<template>
	<carousel :items-to-show="1" v-model="currentSlide" class="relative">
		<slide v-for="avatarUrl in avatars" :key="avatar">
			<img
				:src="avatarUrl"
				class="min-w-full h-[34rem] rounded-t-[2rem] object-cover"
			/>
		</slide>

		<template #addons>
			<div
				class="absolute top-[50%] text-white flex justify-between w-full px-3 text-3xl"
			>
				<div>
					<FontAwesomeIcon
						v-if="currentSlide !== 0"
						@click="prev"
						icon="fa-solid fa-arrow-left"
					/>
				</div>
				<div>
					<FontAwesomeIcon
						v-if="currentSlide !== avatars.length - 1"
						@click="next"
						icon="fa-solid fa-arrow-right"
					/>
				</div>
			</div>
			<pagination />
		</template>
	</carousel>
</template>

<script setup>
	import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
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

<style>
	.carousel__pagination-button--active::after,
	.carousel__pagination-button--active:hover::after {
		@apply !opacity-100 !bg-white;
	}
	.carousel__pagination-button::after {
		width: 4rem !important;
		@apply bg-white mx-3 opacity-50;
	}
	svg {
		@apply cursor-pointer;
	}
</style>
