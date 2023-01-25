<script setup>
	import { verifyEmail } from '@/services/authService';
	const route = useRoute();
	const { token } = route.params;

	try {
		verifyEmail({ token });
	} catch (e) {}
</script>
<template>
	<EmailSent
		mainHeader="Your email is verified :D"
		secondaryHeader="You can login in now"
	/>
</template>
