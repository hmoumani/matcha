<template>
	<div class="h-screen">
		<Navbar transparent />
		<section class="absolute w-full h-full bg-gray-50">
			<div class="absolute top-0 w-full h-full bg-gray-50">
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
									<!-- <img src={"logo1.svg"} class="w-12 mx-auto" /> -->
								</div>
								<div class="btn-wrapper text-center">
									<button
										class="bg-white active:bg-gray-100 text-gray-800 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs"
										type="button"
									>
										<!-- style={{ transition: "all .15s ease" }} -->
										<!-- <img alt="..." class="w-5 mr-1" src={"google.svg"} /> -->
										Sign in with Google
									</button>
								</div>
								<hr class="mt-6 border-b-1 border-gray-400" />
							</div>
							<div class="flex-auto px-4 lg:px-10 pt-10 pb-0">
								<div
									class="text-gray-500 text-center mb-3 font-bold"
								>
									Or sign in with credentials
								</div>
								<Form fields="{fields}" title="Sign In" />
							</div>
							<hr class="mt-6 border-b-1 border-gray-400" />
							<div class="flex">
								<div class="w-1/2">
									<Link href="/ResetPassword">
										<!-- style={{ transition: "all .15s ease" }} -->
										<button
											class="text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
											type="submit"
											value="Forgot Password?"
										>
											Forgot Password ?
										</button>
									</Link>
								</div>
								<div class="w-1/2 text-right">
									<Link href="/Register">
										<!-- style={{ transition: "all .15s ease" }} -->
										<button
											class="text-orange-main text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
											type="button"
										>
											Create new account ?
										</button>
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>
