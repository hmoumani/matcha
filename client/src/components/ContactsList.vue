<script setup lang="ts">
	const contacts = [
		{
			firstName: 'Rebikaa',
			lastName: 'Zin',
			lastMessage: {
				content: 'take it easy, life is hard and I will fuck everyone',
				created_at: '20223',
			},
			avatarUrl:
				'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
		},
		{
			firstName: 'Zaboo',
			lastName: 'Diiic',
			lastMessage: {
				content: 'take it easy, life is hard and I will fuck everyone',
				created_at: '20223',
			},
		},
		{
			firstName: 'Wlaadd',
			lastName: 'l9haaab',
			lastMessage: {
				content: 'take it easy, life is hard and I will fuck everyone',
				created_at: '20223',
			},
		},
	];
</script>
<template>
	<div>
		<h1 class="py-4 text-xl">Last Chats</h1>
		<div>
			<div
				v-for="(contact, index) of contacts"
				class="flex py-6 px-6 rounded-md cursor-pointer"
				:class="{
					'bg-[#EDF0F4]': index == 0,
					'shadow-sm': index !== 0,
				}"
			>
				<img
					class="w-12 h-12 rounded-full"
					:src="contacts[0].avatarUrl"
					alt=""
				/>
				<div class="flex flex-col pl-4">
					<h1 class="font-bold">
						{{ contact.firstName + ' ' + contact.lastName }}
					</h1>
					<p class="text-[#B2B9C5] font-bold w-[80%] truncate">
						{{ contact.lastMessage.content || '' }}
					</p>
				</div>
			</div>
		</div>
	</div>
</template>
