<script setup lang="ts">
	import { useUserStore } from '@/store/user';

	const { user } = defineProps({
		user: Object,
	});

	const userStore = useUserStore();

	const { blockUser, reportUser } = userStore;
</script>
<template>
	<div
		class="relative h-[calc(100vh-14rem)] bg-white shadow-sm mx-auto overflow-y-scroll overflow-x-hidden"
	>
		<!-- <avatars2Slider :avatars="userAvatars" /> -->
		<!-- <div class="w-full h-[20rem] py-3 px-8 rounded-full"> -->
		<img
			:src="user.avatar"
			class="w-[80%] h-[20rem] my-3 mx-auto rounded-xl bg-red-400"
		/>
		<!-- </div> -->

		<div class="px-8 py-8 flex justify-between">
			<div>
				<div
					class="font-medium text-[#48496B] text-2xl flex items-center gap-x-3"
				>
					{{ user.first_name }} {{ user.last_name }},
					{{ user.age }}
					<span class="rounded-full bg-[#4EB3AC] w-3 h-3"></span>
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
				<div class="text-lg mt-5">{{ user.bio }}</div>
				<div class="my-5 text-2xl font-semibold text-[#646688]">
					Passions
				</div>
				<div class="flex">
					<div
						v-for="passion of user.passions"
						class="px-3 py-2 mr-3 rounded-md text-base capitalize whitespace-nowrap"
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
		</div>
	</div>
	<div class="text-2xl bottom-0 left-0 w-[100%] flex">
		<div
			@click="blockUser(user?.id)"
			class="border-dark-color border-r-4 cursor-pointer text-xl text-black bg-grey-color w-6 flex items-center justify-center flex-1 px-auto"
		>
			Block
		</div>
		<div
			@click="reportUser(user?.id)"
			class="py-4 cursor-pointer text-xl text-black bg-grey-color w-6 flex items-center justify-center flex-1 px-auto"
		>
			Report
		</div>
	</div>
</template>
