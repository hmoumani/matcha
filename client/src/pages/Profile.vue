<script setup>
	import { useUserStore } from '@/store/user';
	import { storeToRefs } from 'pinia';
	import { ref } from 'vue';

	const userStore = useUserStore();
	let { currentUser } = storeToRefs(userStore);

	const bio = ref('');

	const SexualOrientationOptions = ref([
		{
			value: 'Female',
			label: 'Female',
		},
		{
			value: 'Male',
			label: 'Male',
		},
		{
			value: 'Both',
			label: 'Both',
		},
	]);

	const gendersOptions = ref([
		{
			value: 'Female',
			label: 'Female',
		},
		{
			value: 'Male',
			label: 'Male',
		},
	]);

	const defaultOption = computed(
		() =>
			gendersOptions?.value.find(
				gender => gender.value === currentUser.value.gender
			) || gendersOptions.value[0]
	);
</script>
<template>
	<Header />
	<div class="flex pl-2 py-7">
		<Sidebar></Sidebar>
		<div
			class="bg-[#F6F7FF] pbd-20 flex justify-center items-center w-full h-screen"
		>
			<div
				v-if="currentUser"
				class="bg-white mt-14 rounded-lg p-8 flex flex-col gap-y-4 overflow-y-scroll h-[calc(100vh-10rem)] w-[37rem] shadow-slate-300 shadow-sm"
			>
				<Avatars />
				<div class="my-2">
					<!-- <TextArea
					v-if="currentUser"
					label="About me"
					v-model="currentUser.bio"
				/> -->
					<label
						for="comment"
						class="block text-xl font-medium text-gray-700 my-2"
					>
						Bio :
					</label>
					<textarea
						v-if="currentUser"
						rows="4"
						cols="30"
						name="comment"
						id="comment"
						v-model="currentUser.bio"
						class="text-xl h-20 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
					>
					</textarea>
				</div>
				<div>
					<h2 class="mb-2">Passions :</h2>
					<passionTags />
				</div>
				<div class="flex items-center gap-x-6">
					<div class="mt-3">I want to see:</div>
					<Select
						v-model="defaultOption"
						@update:modelValue="
							selectedSexualOrientation => {
								currentUser.sexualOrientation =
									selectedSexualOrientation;
							}
						"
						:options="SexualOrientationOptions"
						class="mb-6 w-32 h-3 mr-28 border-gray-300 text-sm my-4"
					/>
				</div>
				<div class="flex items-center gap-x-8">
					<div class="mt-3">My Gender :</div>
					<Select
						v-model="defaultOption"
						@update:modelValue="
							selectedGender => {
								currentUser.gender = selectedGender;
							}
						"
						:options="gendersOptions"
						class="mb-6 w-32 h-3 mr-28 border-gray-300 text-sm my-4"
					/>
				</div>
			</div>
		</div>
	</div>
</template>
