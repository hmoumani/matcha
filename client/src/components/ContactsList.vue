<script setup lang="ts">
	let contacts = [
		{
			firstName: 'Rebikaa',
			lastName: 'Zin',
			lastMessage: {
				content: 'take it easy, life is hard and I will do everyone',
				created_at: '20223',
			},
			avatarUrl:
				'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
		},
		{
			firstName: 'Zaboo',
			lastName: 'Diiic',
			lastMessage: {
				content: 'take it easy, life is hard and I will do everyone',
				created_at: '20223',
			},
		},
		{
			firstName: 'Wlaadd',
			lastName: 'l9haaab',
			lastMessage: {
				content: 'take it easy, life is hard and I will do everyone',
				created_at: '20223',
			},
		},
	];

	contacts = contacts.concat(contacts);
	const currentContact = ref(0);

	const updateCurrentContact = (contact, index) => {
		currentContact.value = index;
	};
</script>
<template>
	<div>
		<searchContacts />
		<h1 class="py-4 text-xl text-[#3C444B] font-medium">Last Chats</h1>
		<div>
			<div
				v-for="(contact, index) of contacts"
				@click="updateCurrentContact(contact, index)"
				class="flex py-6 px-6 rounded-xl cursor-pointer shadow-sm"
				:class="{
					'bg-[#EDF0F4]': index == currentContact,
					'': index !== currentContact,
				}"
			>
				<img
					class="w-12 h-12 rounded-full"
					:src="contacts[0].avatarUrl"
					alt=""
				/>
				<div class="flex flex-col pl-4">
					<h1 class="font-medium">
						{{ contact.firstName + ' ' + contact.lastName }}
					</h1>
					<p class="text-black-color font-bold w-[80%] truncate">
						{{ contact.lastMessage.content || '' }}
					</p>
				</div>
			</div>
		</div>
	</div>
</template>
