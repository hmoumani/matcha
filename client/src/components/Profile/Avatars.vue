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
		if (!avatar.value) {
			let [file] = avatar;
			if (file) return URL.createObjectURL(file);
		} else {
			let { value } = avatar;
			let fileName = value;

			return filePath;
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
				class="relative mt-1 flex-1 h-[14rem] min-w-[30%] flex justify-center items-center rounded-md border-dashed border-slate-300 bg-[#EAEDF6]"
				:class="{ 'border-2': !avatars[avatarInputIndex - 1] }"
			>
				<template v-if="avatars[avatarInputIndex - 1]">
					<img
						class="w-full h-full rounded-md object-cover"
						:src="getImg(avatars[avatarInputIndex - 1])"
					/>
				</template>

				<label
					v-else
					class="cursor-pointer rounded-md font-medium focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2"
				>
					<div class="space-y-1 text-center">
						<div
							class="bg-primary-color rounded-full w-8 h-8 flex justify-center items-center absolute -bottom-2 -right-4"
						>
							<svg
								for="file-upload"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 448 512"
								fill="#fff"
								class="w-6 h-6"
							>
								<!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
								<path
									d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"
								/>
							</svg>
						</div>
						<p class="text-xs text-gray-500">
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
