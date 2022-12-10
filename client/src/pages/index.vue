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
		{ name: 'masturbating', isCommon: false },
		{ name: 'football', isCommon: true },
		{ name: 'Gym', isCommon: false },
	];
</script>

<template>
	<div class="bg-[#F6F7FF] h-screen pt-6">
		<div
			class="w-5/12 bg-white shadow-slate-300 shadow-sm mx-auto rounded-[2rem]"
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
				<FontAwesomeIcon icon="fa-solid fa-heart"/>
				<FontAwesomeIcon icon="fa-solid fa-xmark"/>
				<div
					class="text-md text-[#B7B5BF] font-bold flex items-center gap-x-1 mt-1"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="18"
						height="18"
						viewBox="0 0 24 24"
						fill="#B7B5BF"
					>
						<path
							d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"
						/>
					</svg>
					<!-- <FontAwesomeIcon icon="fa-solid fa-location-arrow" /> -->
					{{ user.distance }} from you
				</div>
				<div class="text-lg mt-5">{{ user.bio }}</div>
				<div class="my-5 text-2xl font-semibold text-[#646688]">
					Passions
				</div>
				<div class="flex">
					<div
						v-for="passion of passions"
						class="px-3 py-2 mr-3 rounded-md text-base capitalize"
						:class="{
							'bg-[#D5F9F7] text-[#4EB3AC]': passion.isCommon,
							'bg-[#F8F7FF] text-black border-[#F3F3F3] border-2':
								!passion.isCommon,
						}"
					>
						# {{ passion.name }}
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
