<script setup>
	import { ChevronRightIcon } from '@heroicons/vue/24/solid';
	import { useChatStore } from '@/store/chat';
	import { storeToRefs } from 'pinia';

	const messagesStore = useChatStore();

	const { showUserProfile } = storeToRefs(messagesStore);

	defineProps({
		user: Object,
	});
</script>
<template>
	<!-- <transition name="slide"> -->
	<div v-if="showUserProfile">
		<div
			class="flex gap-x-3 border-b-2 border-grey-color py-6 items-center mb-8"
		>
			<div
				class="bg-grey-color p-3 w-12 h-12 rounded-xl cursor-pointer"
				@click="showUserProfile = false"
			>
				<ChevronRightIcon class="w-6 h-6 text-black-color" />
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
