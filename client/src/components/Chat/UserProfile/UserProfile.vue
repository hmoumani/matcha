<script setup>
	import { ChevronLeftIcon } from '@heroicons/vue/24/solid';
	import { useChatStore } from '@/store/chat';
	import { storeToRefs } from 'pinia';
	import { router } from '@/router';
	import { useMobile } from '@/helpers/useMobile';

	const isMobile = useMobile();

	const messagesStore = useChatStore();

	const { showUserProfile } = storeToRefs(messagesStore);
	1;
	defineProps({
		user: Object,
	});

	function goBack() {
		showUserProfile.value = false;
		if (isMobile.value) router.push('/chat');
		else router.push('/messages');
	}
</script>
<template>
	<!-- <transition name="slide"> -->
	<div v-if="showUserProfile && user">
		<div
			class="flex gap-x-3 border-b-2 border-grey-color py-6 items-center mb-8"
		>
			<div
				class="bg-grey-color p-3 w-12 h-12 rounded-xl cursor-pointer"
				@click="goBack"
			>
				<ChevronLeftIcon class="w-6 h-6 text-black-color" />
			</div>
			<div class="text-2xl">Profile</div>
		</div>
		<Profile2Card :user="user" class="profile" />
	</div>
	<!-- </transition> -->
</template>
<style>
	/* .slide-enter-active, .slide-leave-active {
  transition: width .5s;
}
.slide-enter, .slide-leave-to{
  width:0;
} */
</style>
