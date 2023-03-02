<script setup>
	import { useAuthStore } from '../store/auth.ts';
	let fields = ref([
		{ name: 'Username', type: 'text', key: 'username', value: '' },
		{
			name: 'First Name',
			type: 'text',
			key: 'firstName',
			value: '',
			width: 'half',
		},
		{
			name: 'Last Name',
			type: 'text',
			key: 'lastName',
			value: '',
			width: 'half',
		},
		{ name: 'Email', type: 'email', key: 'email', value: '' },
		{ name: 'Password', type: 'password', key: 'password', value: '' },
	]);
	let { register } = useAuthStore();

	const getInputsValues = () => {
		let newObj = {};
		for (let field of fields.value) {
			let { key, value } = field;
			newObj[key] = value;
		}
		return newObj;
	};
</script>
<template>
	<div class="h-screen">
		<section class="absolute w-full h-full bg-gray-50">
			<div class="absolute top-0 w-full h-full bg-gray-50 bg bg-cover">
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
									title="Sign up"
									@submit.prevent="
										register(getInputsValues())
									"
								/>
							</div>
							<hr class="mt-6 border-b-1 border-gray-400" />
							<div class="flex">
								<div class="w-1/2">
									<Button link="/Reset"
										>Forgot Password ?</Button
									>
								</div>
								<div class="w-1/2 text-right">
									<Button link="/Login"
										>Already Have An Account?</Button
									>
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
