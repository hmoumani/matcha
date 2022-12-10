<script setup lang="ts">
	/* import font awesome icon component */
	import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
	const user = {
		first_name: 'RebiKaa',
		last_name: 'Talon',
		age: 24,
		distance: '14 km',
		bio: 'looking for friends.',
	};
	const passions = [
		{ name: 'masturbating', isCommon: 'false' },
		{ name: 'football', isCommon: 'false' },
		{ name: 'Gym', isCommon: 'false' },
	];
</script>

<template>
	<div class="bg-[#F6F7FF] h-screen">
		<div
			class="w-5/12 bg-white shadow-slate-300 shadow-sm mt-6 mx-auto rounded-[2rem]"
		>
			<img
				src="/girl.jpeg"
				class="min-w-full h-[34rem] rounded-t-[2rem]"
			/>
			<div class="px-8 py-8">
				<div
					class="font-medium text-[#48496B] text-2xl flex items-center gap-x-3"
				>
					{{ user.first_name }} {{ user.last_name }}, {{ user.age }}
					<span class="dot bg-[#4EB3AC] w-3 h-3"></span>
				</div>
				<FontAwesomeIcon icon="fa-solid fa-location-pin" />
				<div class="text-md text-[#B7B5BF] font-bold">
					<FontAwesomeIcon icon="fa-solid fa-location-arrow" />
					{{ user.distance }} from you.
				</div>
				<div class="text-lg mt-5">{{ user.bio }}</div>
				<div class="my-5 text-2xl font-semibold text-[#646688]">Passions</div>
				<div class="flex">
					<div
						v-for="passion of passions"
						class="bg-[#D5F9F7] text-[#4EB3AC] px-3 py-2 mr-3 rounded-md text-base"
					>
						#{{ passion.name }}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style>
	.dot {
		border-radius: 50%;
		display: inline-block;
	}
</style>
<route lang="yaml">
name: home
</route>
