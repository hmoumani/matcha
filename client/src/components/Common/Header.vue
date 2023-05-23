<template>
	<header class="bg-[#FBFDFF]">
		<nav class="px-4 sm:px-6 lg:px-8" aria-label="Top">
			<div
			class="flex w-full items-center justify-between border-b border-indigo-500 py-3 lg:border-none"
			>
			<div class="flex items-center pl-3 gap-x-4">
				<img class="h-8 w-auto" src="/assets/logo.svg" alt="" />
				<span class="sr-odnly text-3xl font-medium">Matcha</span>
			</div>
			<notification class="nofitication-button"/>
			<div class="mr-6">
				<!-- <img
					src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1600"
					class="w-10 h-10 rounded-full"
					/> -->
					<!-- <UserIcon class="w-10 h-10" /> -->
					<!-- Profile dropdown -->
					<Menu as="div" class="relative ml-3">
						<div>
							<MenuButton
							class="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
							>
							<span class="sr-only">Open user menu</span>
							<img
							class="h-8 w-8 rounded-full"
							:src="userAvatar"
							alt=""
							/>
						</MenuButton>
					</div>
					</Menu>
				</div>
			</div>
			<div class="flex flex-wrap justify-center space-x-6 py-4 lg:hidden">
				<a
					v-for="link in navigation"
					:key="link.name"
					:href="link.href"
					class="text-base font-medium text-white hover:text-indigo-50"
					>{{ link.name }}</a
				>
			</div>
		</nav>
	</header>
</template>

<script setup>
	import { useUserStore } from '@/store/user';
	import { storeToRefs } from 'pinia';
	import { useAuthStore } from '@/store/auth';

	const navigation = [
		{ name: 'Solutions', href: '#' },
		{ name: 'Pricing', href: '#' },
		{ name: 'Docs', href: '#' },
		{ name: 'Company', href: '#' },
	];
	import { ref } from 'vue';
	import {
		Dialog,
		DialogPanel,
		Menu,
		MenuButton,
		MenuItem,
		MenuItems,
		TransitionChild,
		TransitionRoot,
	} from '@headlessui/vue';
	import {
		Bars3BottomLeftIcon,
		BellIcon,
		CalendarIcon,
		ChartBarIcon,
		FolderIcon,
		HomeIcon,
		InboxIcon,
		UsersIcon,
		XMarkIcon,
	} from '@heroicons/vue/24/outline';
	import { MagnifyingGlassIcon } from '@heroicons/vue/20/solid';
	import notification from "@/components/Common/notification.vue"
	const userNavigation = [
		{ name: 'Your Profile', href: '#' },
		{ name: 'Settings', href: '#' },
		{ name: 'Sign out', href: '#' },
	];

	const sidebarOpen = ref(false);
	const userStore = useUserStore();

	const { currentUser } = storeToRefs(userStore);

	let { logout } = useAuthStore();

	const userAvatar = computed(() => {
		let value = currentUser.value.avatars?.[0];
		return value?.value;
	});

</script>


<style lang="scss">
	// .nofitication-button {
	// 	position: absolute;
	// 	right: -125px;thanks
