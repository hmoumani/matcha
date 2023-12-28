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
	>
		<div className="text-center mt-6">
			<Button
				link="/login"
				className="w-auto cursor-pointer bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
				type="submit"
			>
				login
			</Button>
		</div>
	</EmailSent>
</template>
