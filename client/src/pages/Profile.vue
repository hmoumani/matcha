<script setup>
	let fields = ref([
		{ name: 'Username', component: 'textarea', value: '' },
		{ name: 'Password', type: 'password', value: '' },
	]);
</script>
<template>
	<div class="flex pl-2 py-7">
		<Sidebar></Sidebar>
		<div class="p-5">
			<!-- <Form :fields="fields" title="Sign In" @submit.prevent="() => {}" /> -->
			<h2>Bio</h2>
			<TextArea />
		</div>
	</div>
</template>
