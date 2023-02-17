<script setup>
	import { useUserStore } from '@/store/user';
	import { ref } from 'vue';
	import { storeToRefs } from 'pinia';
	import { useAuthStore } from '../store/auth.ts';
	import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

	import {
		Dialog,
		DialogPanel,
		TransitionChild,
		TransitionRoot,
	} from '@headlessui/vue';
	import {
		ChatBubbleOvalLeftEllipsisIcon,
		HeartIcon,
		UserIcon,
	} from '@heroicons/vue/24/solid';
	// chat-bubble-oval-left-ellipsis

	const navigation = [
		{ name: 'Dating', href: '/', icon: HeartIcon },
		{ name: 'Profile', href: '/profile', icon: UserIcon },
		{
			name: 'Messages',
			href: '/messages',
			icon: ChatBubbleOvalLeftEllipsisIcon,
		},
	];

	const sidebarOpen = ref(false);

	const router = useRouter();
	const isCurrentRoute = link => {
		return link === router.currentRoute.value.path;
	};

	const userStore = useUserStore();

	const { currentUser } = storeToRefs(userStore);
	const { getCurrentUser } = userStore;

	let { logout } = useAuthStore();

	const userAvatar = computed(() => {
		let { value: filePath } = currentUser.value.avatars?.[0];
		return filePath;
	});
</script>
<template>
	<!--
      This example requires updating your template:
  
      ```
      <html class="h-full bg-gray-100">
      <body class="h-full">
      ```
    -->
	<div v-if="currentUser">
		<TransitionRoot as="template" :show="sidebarOpen">
			<Dialog
				as="div"
				class="relative z-40 md:hidden"
				@close="sidebarOpen = false"
			>
				<TransitionChild
					as="template"
					enter="transition-opacity ease-linear duration-300"
					enter-from="opacity-0"
					enter-to="opacity-100"
					leave="transition-opacity ease-linear duration-300"
					leave-from="opacity-100"
					leave-to="opacity-0"
				>
					<div class="fixed inset-0 bg-gray-600 bg-opacity-75" />
				</TransitionChild>

				<div class="fixed inset-0 z-40 flex">
					<TransitionChild
						as="template"
						enter="transition ease-in-out duration-300 transform"
						enter-from="-translate-x-full"
						enter-to="translate-x-0"
						leave="transition ease-in-out duration-300 transform"
						leave-from="translate-x-0"
						leave-to="-translate-x-full"
					>
						<DialogPanel
							class="relative flex w-full max-w-xs flex-1 flex-col bg-white"
						>
							<TransitionChild
								as="template"
								enter="ease-in-out duration-300"
								enter-from="opacity-0"
								enter-to="opacity-100"
								leave="ease-in-out duration-300"
								leave-from="opacity-100"
								leave-to="opacity-0"
							>
								<div class="absolute top-0 right-0 -mr-12">
									<button
										type="button"
										class="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
										@click="sidebarOpen = false"
									>
										<span class="sr-only"
											>Close sidebar</span
										>
										<XMarkIcon
											class="h-6 w-6 text-white"
											aria-hidden="true"
										/>
									</button>
								</div>
							</TransitionChild>
							<div class="h-0 flex-1 overflow-y-auto pt-5 pb-4">
								<!-- <div
									class="flex flex-shrink-0 items-center px-4"
								>
									<img
										class="h-8 w-auto"
										src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
										alt="Your Company"
									/>
								</div> -->
								<nav class="mt-5 space-y-1 px-2">
									<a
										v-for="item in navigation"
										:key="item.name"
										:href="item.href"
										:class="[
											item.current
												? 'bg-gray-100 text-gray-900'
												: 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
											'group flex items-center px-2 py-2 text-base font-medium rounded-md',
										]"
									>
										<component
											:is="item.icon"
											:class="[
												isCurrentRoute(item.href)
													? 'text-gray-500'
													: 'text-gray-400 group-hover:text-gray-500',
												'mr-4 flex-shrink-0 h-6 w-6',
											]"
											aria-hidden="true"
										/>
										{{ item.name }}
										{{ item.href }}
									</a>
								</nav>
							</div>
							<div
								class="flex flex-shrink-0 border-t border-gray-200 p-4"
							>
								<a href="#" class="group block flex-shrink-0">
									<div class="flex items-center">
										<div>
											<img
												class="inline-block h-10 w-10 rounded-full"
												:src="userAvatar"
												alt=""
											/>
										</div>
										<div class="ml-3">
											<p
												class="text-base font-medium text-gray-700 group-hover:text-gray-900"
											>
												Settings
											</p>
											<p
												class="text-sm font-medium text-gray-500 group-hover:text-gray-700"
											>
												View profile
											</p>
										</div>
									</div>
								</a>
							</div>
						</DialogPanel>
					</TransitionChild>
					<div class="w-14 flex-shrink-0">
						<!-- Force sidebar to shrink to fit close icon -->
					</div>
				</div>
			</Dialog>
		</TransitionRoot>

		<!-- Static sidebar for desktop -->
		<div
			class="hidden md:inset-y-0 md:flex md:w-[23rem] md:flex-col mt-2 h-[calc(100vh-4rem)] bg-white"
		>
			<!-- Sidebar component, swap this element with another sidebar if you like -->
			<div
				class="flex min-h-0 flex-1 flex-col justify-end border-r border-gray-200 px-8"
			>
				<div class="flex flex-1 flex-col overflow-y-auto pt-9 pb-4">
					<img
						class="w-full rounded-3xl mb-2 h-[15rem] object-cover"
						:src="userAvatar"
						alt="Your Company"
					/>
					<h2 class="mt-3 text-2xl text-[#504E6E] font-medium pl-2">
						{{ currentUser.firstName }} {{ currentUser.lastName }}
					</h2>
					<div class="text-xl text-[#B1AFBA] pl-2">
						{{ currentUser.address }}
					</div>

					<nav class="mt-12 flex-1 space-y-1 bg-white">
						<router-link
							v-for="item in navigation"
							:key="item.name"
							:to="item.href"
							:class="[
								isCurrentRoute(item.href)
									? 'bg-[#F5F6FF]'
									: 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
								'mb-2 group flex items-center p-4 text-sm font-medium rounded-xl',
							]"
						>
							<component
								:is="item.icon"
								:class="[
									isCurrentRoute(item.href)
										? 'text-[#5C5EED]'
										: 'text-gray-400 group-hover:text-gray-500',
									'font-bold mr-3 flex-shrink-0 h-6 w-6',
								]"
								aria-hidden="true"
							/>
							<div class="text-xl">{{ item.name }}</div>
						</router-link>
					</nav>
				</div>
				<div class="border-t border-gray-200 px-4 py-8">
					<div
						class="mt-6 group block w-full flex-shrink-0"
						@click="logout"
					>
						<div class="flex items-center text-[#A5A8B7]">
							<FontAwesomeIcon
								icon="fa-solid fa-gear"
								class="bdg-[#F8F7FF] w-6 h-6 px-2"
							/>
							<p class="ml-3 text-lg font-bold">Logout</p>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="flex flex-1 flex-col md:pl-64">
			<div
				class="sticky top-0 z-10 bg-gray-100 pl-1 pt-1 sm:pl-3 sm:pt-3 md:hidden"
			>
				<button
					type="button"
					class="-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
					@click="sidebarOpen = true"
				>
					<span class="sr-only">Open sidebar</span>
					<Bars3Icon class="h-6 w-6" aria-hidden="true" />
				</button>
			</div>
			<main class="flex-1"></main>
		</div>
	</div>
</template>
