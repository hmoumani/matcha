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
			lastMessage: 'take it easy, life is hard and I will fuck everyone',
		},
		{
			firstName: 'Wlaadd',
			lastName: 'l9haaab',
			lastMessage: 'take it easy, life is hard and I will fuck everyone',
		},
	];
</script>
<template>
	<div>
		<h1>Last Chats</h1>
		<div>
			<div v-for="contact in contacts" class="flex py-2">
				<img
					class="w-12 h-12 rounded-full"
					:src="contacts[0].avatarUrl"
					alt=""
				/>
				<div class="flex flex-col pl-4">
					<h1>{{ contact.firstName + ' ' + contact.lastName }}</h1>
					<p>{{ contact.lastMessage.content || '' }}</p>
				</div>
			</div>
		</div>
	</div>
</template>
