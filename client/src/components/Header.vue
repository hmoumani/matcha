<template>
	<header class="bg-[#FBFDFF]">
		<nav class="px-4 sm:px-6 lg:px-8" aria-label="Top">
			<div
				class="flex w-full items-center justify-between border-b border-indigo-500 py-6 lg:border-none"
			>
				<div class="flex items-center pl-3 gap-x-4">
					<img class="h-10 w-auto" src="/assets/logo.svg" alt="" />
					<span class="sr-odnly text-3xl font-medium">Matcha</span>
				</div>
				<div class="mr-6 spacde-x-4">
					<UserIcon class="w-10 h-10" />
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
	const navigation = [
		{ name: 'Solutions', href: '#' },
		{ name: 'Pricing', href: '#' },
		{ name: 'Docs', href: '#' },
		{ name: 'Company', href: '#' },
	];
</script>
