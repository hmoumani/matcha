<script setup>
	import { useUserStore } from '@/store/user';
	import { storeToRefs } from 'pinia';
	import { ref, watch } from 'vue';
	import userService from '@/services/userService';

	const userStore = useUserStore();
	let { currentUser } = storeToRefs(userStore);

	const bio = ref('');

	const SexualOrientationOptions = ref([
		{
			value: 'female',
			label: 'Female',
		},
		{
			value: 'male',
			label: 'Male',
		},
		{
			value: 'both',
			label: 'Both',
		},
	]);

	const gendersOptions = ref([
		{
			value: 'female',
			label: 'Female',
		},
		{
			value: 'male',
			label: 'Male',
		},
	]);

	const defaultOption = computed(() =>
		gendersOptions?.value.find(
			gender => gender.value === currentUser.value.gender
		)
	);

	const defaultSexualOrientationOption = computed(() =>
		SexualOrientationOptions?.value.find(
			gender => gender.value === currentUser.value.sexualOrientation
		)
	);

	const handleChangePassions = passions => {
		currentUser.value.passions = passions;
	};

	let fields = ref([
		{
			name: 'First Name',
			type: 'text',
			key: 'firstName',
			value: currentUser.value.firstName,
			width: 'half',
			placeholder: 'First Name',
			update: handleChangePassions
		},
		{
			name: 'Last Name',
			type: 'text',
			key: 'lastName',
			value: currentUser.value.lastName,
			width: 'half',
			placeholder: 'Last Name',
		},
		{ name: 'Email', type: 'email', key: 'email', value: currentUser.value.email, placeholder: 'your Email',
	ppattern:"[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" },
	]);
</script>
<template>
	<div class="bg-[#F6F7FF] flex justify-center w-full h-screen">
		<div
			v-if="currentUser"
			class="mb-4 mt-10 bg-white rounded-lg p-8 flex flex-col gap-y-4 overflow-y-scroll hide-scroll h-auto h-d[88%] w-[37rem] shadow-slate-300 shadow-sm"
		>
			<Avatars />
			<div class="fledx mt-6 mb-3">
				<InputField
				class="flex-1d"
				v-for="field of fields"
				:label="field.name"
				:type="field.type"
				:placeholder="field.placeholder"
				pattern="field.pattern"
				v-model="field.value"
				@update:modelValue="
					fieldValue => {
						currentUser[field.key] = fieldValue;
					}"
				:class="{
					// '!border-gray-300 !border-1':true,
					'w-full' : field && field.width !== 'full',
					'!w-1/2 float-left pr-4': field && field.width === 'half',
				}"
			/>
			</div>
			<div class="my-2">
				<label
					for="comment"
					class="block text-xl font-medium text-gray-700 my-2"
				>
					Biography :
				</label>
				<textarea
					v-if="currentUser"
					rows="7"
					cols="30"
					name="comment"
					id="comment"
					v-model="currentUser.biography"
					class="text-xl h-40 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
				>
				</textarea>
			</div>
			<UserLocation />
			<div>
				<h2 class="mb-2">Passions :</h2>
				<passionTags
					:passions="currentUser.passions"
					@onTagsChanged="handleChangePassions"
				/>
			</div>
			<div class="flex items-center gap-x-6 flex-wrap">
				<div class="mt-3">I want to see:</div>
				<Select
					v-model="defaultSexualOrientationOption"
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
			<div class="flex items-center gap-x-8 flex-wrap">
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
</template>
<route lang="yaml">
name: profileS
meta:
    layout: pageWithSidebar
</route>
