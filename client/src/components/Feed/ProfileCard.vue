<script setup lang="ts">
	/* import font awesome icon component */
	import { useFeedStore } from '@/store/feed';
	import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

	const { user } = defineProps({
		user: Object,
	});

	const { userAvatars, passions } = user;

	const feedStore = useFeedStore();

	const { likeUser, unLikeUser, reportUser } = feedStore;
</script>
<template>
	<div
		class="w-4/12 bg-white shadow-slate-300 shadow-sm rounded-[2rem] h-[calc(100vh-7rem)] overflow-y-scroll overflow-x-hidden"
	>
		<avatarsSlider :avatars="userAvatars" />
		<div class="px-4 py-8 flex justify-between">
			<div>
				<div
					class="font-medium text-[#48496B] text-2xl flex items-center gap-x-3"
				>
					{{ user.id }}
					{{ user.firstName }} {{ user.lastName }},
					{{ user.age }}
					<span class="dot bg-[#4EB3AC] w-3 h-3"></span>
				</div>
				<div
					class="text-md text-[#B7B5BF] font-bold flex items-center gap-x-1"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="18"
						height="18"
						viewBox="0 0 24 24"
						fill="#B7B5BF"
					>
						<path
							d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"
						/>
					</svg>
					{{ user.distance }} from you
				</div>
				<div class="text-lg mt-5">{{ user.biography }}</div>
				<div class="my-5 text-2xl font-semibold text-[#7a7a7d]">
					Passions
				</div>
				<div class="flex">
					<div
						v-for="passion of passions"
						class="px-3 py-2 mr-3 rounded-md text-base capitalize"
						:class="{
							'bg-[#D5F9F7] text-[#4EB3AC]': passion.isCommon,
							'bg-[#F8F7FF] text-black border-[#F3F3F3] border-2':
								!passion.isCommon,
						}"
					>
						# {{ passion.name }}
					</div>
				</div>
			</div>
			<div class="text-xl">
				<FontAwesomeIcon
					icon="fa-solid fa-flag"
					class="text-[#E11653] bg-[#f4a8bf] action"
					@click="reportUser"
				/>
				<FontAwesomeIcon
					@click="unLikeUser"
					icon="fa-solid fa-xmark"
					class="text-black bg-[#F8F7FF] action px-10"
				/>
				<FontAwesomeIcon
					@click="likeUser"
					icon="fa-solid fa-heart"
					class="text-[#4EB3AC] bg-[#D5F9F7] action"
				/>
			</div>
		</div>
	</div>
</template>
