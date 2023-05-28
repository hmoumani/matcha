<script setup>
	import apiClient from '@/modules/apiClient';

	import { ref } from 'vue';
	import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue';
	import {
		Dialog,
		DialogPanel,
		TransitionChild,
		TransitionRoot,
	} from '@headlessui/vue';
	import {
		Bars3Icon,
		CalendarIcon,
		ChartBarIcon,
		FolderIcon,
		HomeIcon,
		InboxIcon,
		UsersIcon,
		XMarkIcon,
	} from '@heroicons/vue/24/outline';

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
		let { id } = route.params;
		const {
			data: { message: user },
		} = await apiClient.get(`/user/${id}`);
		userProfile.value = transformJSON(user);
	});
	const navigation = [
		{ name: 'Dashboard', href: '#', icon: HomeIcon, current: true },
		{ name: 'Team', href: '#', icon: UsersIcon, current: false },
		{ name: 'Projects', href: '#', icon: FolderIcon, current: false },
		{ name: 'Calendar', href: '#', icon: CalendarIcon, current: false },
		{ name: 'Documents', href: '#', icon: InboxIcon, current: false },
		{ name: 'Reports', href: '#', icon: ChartBarIcon, current: false },
	];

	const sidebarOpen = ref(false);
</script>
<template>
	<div class="fldex bg-[#F6F7FF] h-screen">
		<Sidebar>
			<!-- <div class="flex mt-4 w-full">
				<ProfileCard
					v-if="userProfile"
					:user="userProfile"
					class="ml-[17rem] profile"
				/>
			</div> -->
			<div
				class="flex mt-4 w-full items-center justify-center"
			>
				<ProfileCard
					v-if="userProfile"
					:user="userProfile"
					class="sm:ml-[6rem] profile"
				/>
			</div>
		</Sidebar>
	</div>
</template>

<route lang="yaml">
name: profile
meta:
    layout: pageWithSidebar
</route>
