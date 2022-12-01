<script setup lang="ts">
	defineProps({
		title: String,
		fields: Array,
	});
</script>
<template>
	<form>
		<!-- <div>
			<label for="email" class="block text-sm font-medium text-gray-700"
				>Email address</label
			>
			<div class="mt-1">
				<input
					id="email"
					name="email"
					type="email"
					autocomplete="email"
					required=""
					class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
				/>
			</div>
		</div> -->
		<InputField label="Email Address" />
		<InputField label="Password" />

		<div class="text-center mt-8">
			<button
				class="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
				type="submit"
			>
				{{ title }}
			</button>
		</div>
	</form>
</template>
