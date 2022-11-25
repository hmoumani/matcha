<script setup>
	let fields = [
		{ name: 'first name', type: 'text', width: 'half' },
		{ name: 'last name', type: 'text', width: 'half' },
		{ name: 'email', type: 'email', width: 'half' },
		{ name: 'password', type: 'password', width: 'half' },
		{
			name: 'Tags',
			type: 'tags',
			options: [
				{ value: 'sport', label: 'sport' },
				{ value: 'napping', label: 'napping' },
				{ value: 'tkfat', label: 'tkfat' },
			],
		},
		{ name: 'Bio', type: 'textarea' },
		{
			name: 'Gendre',
			type: 'select',
			width: 'to',
			options: [
				{ value: 'male', label: 'male' },
				{ value: 'female', label: 'female' },
				{ value: 'other', label: 'other (Gaaaay)' },
			],
		},
		{
			name: 'Age',
			type: 'select',
			width: 'to',
			// options: createList(10, 90),
		},
		{ name: 'PROFILE Img', type: 'upload', width: 'to' },
	];
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
								<!-- <div class="btn-wrapper text-center">
									<button
										class="bg-white active:bg-gray-100 text-gray-800 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs"
										type="button"
									>
										Sign in with Google
									</button>
								</div> -->
								<!-- <hr class="mt-6 border-b-1 border-gray-400" /> -->
							</div>
							<div class="flex-auto px-4 lg:px-10 pt-2 pb-0">
								<Form :fields="fields" title="Sign In" />
							</div>
							<hr class="mt-6 border-b-1 border-gray-400" />
							<div class="flex">
								<div class="w-1/2">
									<a href="/ResetPassword">
										<!-- style={{ transition: "all .15s ease" }} -->
										<button
											class="text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
											type="submit"
											value="Forgot Password?"
										>
											Forgot Password ?
										</button>
									</a>
								</div>
								<div class="w-1/2 text-right">
									<a href="/Register">
										<!-- style={{ transition: "all .15s ease" }} -->
										<button
											class="text-orange-main text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
											type="button"
										>
											Create new account ?
										</button>
									</a>
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
