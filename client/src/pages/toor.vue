<script setup>
	import apiClient from '@/modules/apiClient';
	const userProfile = ref(null);

	function transformJSON(jsonObj) {
		const transformedObj = {
			id: jsonObj.id,
			first_name: jsonObj.firstName,
			last_name: jsonObj.lastName,
			age: jsonObj.age,
			fame_rate: jsonObj.fameRate,
			biography: jsonObj.biography,
			sexual_orientation: jsonObj.sexualOrientation,
			gender: jsonObj.gender,
			location: jsonObj.location,
			passions: jsonObj.passions,
			avatars: jsonObj.avatars.map(avatar => avatar.value),
			isOnline: jsonObj.isOnline,
		};
		// delete transformedObj.isAutoLocatorEnabled;
		return transformedObj;
	}

	onMounted(async () => {
		const route = useRoute();
		let { token } = route.params;
		const {
			data: { message: user },
		} = await apiClient.get('/user/2');
		userProfile.value = transformJSON(user);
	});
</script>

<template>
	dsa
	<!-- {{ userProfile }} -->
	<!-- <div class="flex dmt-4 w-full">
		<ProfileCard
			v-if="userProfile"
			:user="userProfile"
			class="ml-[17rem] profile"
		/>
	</div> -->
</template>

<route lang="yaml">
name: homes
meta:
    layout: pageWithSidebar
</route>
