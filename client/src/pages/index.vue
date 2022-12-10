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
		<div class="w-5/12 bg-white  px-10 py-20 shadow-black shadow-sm">
			<div class="text-2xl">
				{{ user.first_name }} {{ user.last_name }}, {{ user.age }}
			</div>
			<div class="text-md text-[#B7B5BF]">
				{{ user.distance }} from you.
			</div>
			<div class="text-lg">{{ user.bio }} from you.</div>
			<div>Passions</div>
		</div>
	</div>
</template>

<style></style>
<route lang="yaml">
name: home
</route>
