<script setup>
	import { ref } from 'vue';
	import { useUserStore } from '@/store/user';
	import userService from '@/services/userService';

	import { storeToRefs } from 'pinia';

	const userStore = useUserStore();
	let { currentUser } = storeToRefs(userStore);

	const avatars = ref(currentUser.value.avatars);
	const avatarsInputs = ref([]);

	const uploadAvatar = avatarInputIndex => {
		const uploadedFiles =
			avatarsInputs.value[avatarInputIndex - 1 - avatars.value.length]
				.files;
		avatars.value = avatars.value.concat(uploadedFiles);
		userService.uploadAvatars(uploadedFiles);
	};

	const getImg = avatar => {
		if (!avatar.url) {
			let [file] = avatar;
			if (file) return URL.createObjectURL(file);
		} else {
			const { url } = avatar;
			if (url) return url;
		}
	};
</script>
<template>
	<div>
		<label class="block text-sm font-medium text-gray-700"
			>Your Photos</label
		>
		<div class="flex flex-wrap gap-6 max-w-[60rem] mt-4">
			<div
				v-for="avatarInputIndex in 6"
				class="mt-1 flex-1 h-[14rem] min-w-[30%] dmax-w-full flex justify-center items-center rounded-md border-dashed border-primary-color"
				:class="{ 'border-2': !avatars[avatarInputIndex - 1] }"
			>
				<template v-if="avatars[avatarInputIndex - 1]">
					<img
						class="w-full h-full rounded-md"
						:src="getImg(avatars[avatarInputIndex - 1])"
					/>
				</template>

				<label
					v-else
					:for="`file-upload-${avatarInputIndex}`"
					class="relative cursor-pointer rounded-md bg-white font-medium focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2"
				>
					<div class="space-y-1 text-center">
						<svg
							for="file-upload"
							class="mx-auto h-12 w-12 text-gray-400"
							stroke="currentColor"
							fill="none"
							viewBox="0 0 48 48"
							aria-hidden="true"
						>
							<path
								d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
						<p class="text-xs text-gray-500">
							<span>Upload a file</span>
							<input
								ref="avatarsInputs"
								:id="`file-upload-${avatarInputIndex}`"
								:name="`file-upload-${avatarInputIndex}`"
								type="file"
								class="sr-only"
								@change="uploadAvatar(avatarInputIndex)"
							/>
						</p>
					</div>
				</label>
			</div>
		</div>
	</div>
</template>
