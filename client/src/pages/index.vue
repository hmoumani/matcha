<script setup lang="ts">
	const user = {
		first_name: 'RebiKaa',
		last_name: 'Talon',
		age: 24,
		distance: '14km',
		bio: 'looking for friends.',
	};
</script>

<template>
	<div class="bg-[#F6F7FF] h-screen">
		<div class="w-4/12 bg-white shadow-black shadow-sm my-6 mx-auto">
			<img src="/girl.jpeg" class="min-w-full h-[37rem]" />
			<div class="px-10 py-10">
				<div class="text-2xl flex items-center gap-x-3">
					{{ user.first_name }} {{ user.last_name }}, {{ user.age }}
					<span class="dot bg-green-500 w-3 h-3"></span>
				</div>
				<div class="text-md text-[#B7B5BF]">
					{{ user.distance }} from you.
				</div>
				<div class="text-lg">{{ user.bio }}</div>
				<div>Passions:</div>
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
