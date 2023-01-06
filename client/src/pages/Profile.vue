<script setup>
	// let fields = ref([
	// 	{ name: 'Username', component: 'textarea', value: '' },
	// 	{ name: 'Password', type: 'password', value: '' },
	// ]);
	import { useUserStore } from '@/store/user';
	import { storeToRefs } from 'pinia';
	import { ref } from 'vue';

	const userStore = useUserStore();
	const { currentUser } = storeToRefs(userStore);

	const defaultOption = {
		value: 0,
		label: 'Male',
	};

	const SexualOrientationOptions = ref([
		{
			value: 4,
			label: 'Female',
		},
		{
			value: 4,
			label: 'Male',
		},
		{
			value: 4,
			label: 'Both',
		},
	]);

	const gendersOptions = ref([
		{
			value: 4,
			label: 'Female',
		},
		{
			value: 4,
			label: 'Male',
		},
	]);

</script>
<template>
	<div class="flex pl-2 py-7">
		<Sidebar></Sidebar>
		<div class="p-5 flex flex-col gap-y-4 overflow-scroll">
			<!-- <Form :fields="fields" title="Sign In" @submit.prevent="() => {}" /> -->
			<Avatars />
			<div>
				<!-- <textarea rows="2">{{
					currentUser?.bio
				}}</textarea> -->

				<TextArea label="About me" :text="currentUser?.bio" />
			</div>
			<div>
				<h2 class="mb-2">Passions</h2>
				<div class="w-100 h-20 bg-gray-100"></div>
			</div>
			<div>
				<div>I want to see:</div>
				<Select
					v-model="defaultOption"
					:options="SexualOrientationOptions"
					class="mb-6 w-full h-3 mr-28 border-gray-300 text-sm my-4"
				/>
				<!-- <select name="pets" id="pet-select">
					<option value="">--Please choose an option--</option>
					<option value="male">Male</option>
					<option value="female">Female</option>
					<option value="both">Both</option>
				</select> -->
			</div>
			<div>
				My Gender :
				<Select
					v-model="defaultOption"
					:options="gendersOptions"
					class="mb-6 w-full h-3 mr-28 border-gray-300 text-sm my-4"
				/>
			</div>
			<!-- <select name="pets" id="pet-select">
				<option value="">--Please choose an option--</option>
				<option value="male">Male</option>
				<option value="female">Female</option>
			</select> -->
		</div>
	</div>
</template>
