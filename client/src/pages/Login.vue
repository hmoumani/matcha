<script setup>
	import { useAuthStore } from '../store/auth.ts';
	let fields = ref([
		{ name: 'Username', type: 'text', value: '' },
		{ name: 'Password', type: 'password', value: '' },
	]);
	let { logIn } = useAuthStore();

	const login = () => {
		const [username, password] = fields.value;
		logIn(username.value, password.value);
	};
</script>
<template>
	<div class="h-screen">
		<Navbar transparent />
		<section class="absolute w-full h-full bg-gray-50">
			<div class="absolute top-0 w-full h-full bg-gray-50 bg">
				<div class="absolute inset-0 bg-gray-700 opacity-75"></div>
			</div>
			<div class="container mx-auto px-4 h-full">
				<div
					class="flex content-center items-center justify-center h-full"
				>
					<div class="w-full lg:w-4/12 px-4">
						<div
							class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-50 border-0"
						>
							<div class="rounded-t mb-0 px-6 py-6">
								<div class="text-center mb-3">
									<img
										src="/assets/logo.svg"
										class="w-12 mx-auto"
									/>
								</div>
							</div>
							<div class="flex-auto px-4 lg:px-10 pt-2 pb-0">
								<Form
									:fields="fields"
									title="Sign In"
									@submit.prevent="login"
								/>
							</div>
							<hr class="mt-6 border-b-1 border-gray-400" />
							<div class="flex">
								<div class="w-1/2">
									<Button>Forgot Password ?</Button>
								</div>
								<div class="w-1/2 text-right">
									<Button>Create new account ?</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>
<style>
	.bg {
		background-image: url('https://tinder.com/static/build/m/07eef8b101ca939c978a599f508aa955.webp');
	}
</style>
