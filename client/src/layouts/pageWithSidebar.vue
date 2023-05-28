<template>
	<div class="fldex bg-[#F6F7FF] h-screen">
	<Sidebar>
		<router-view></router-view>
	</Sidebar>

	</div>
</template>

<script setup>
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
