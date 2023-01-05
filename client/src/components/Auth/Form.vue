<script setup lang="ts">
	defineProps({
		title: String,
		fields: Array,
	});
</script>
<template>
	<form>
		<!-- <div class="flex flex-row"> -->
			
			<InputField
				class="flex-1d"
				v-for="field of fields"
				:label="field.name"
				:type="field.type"
				v-model="field.value"
				:class="{ '!w-1/2 float-left pr-4': field && field.width === 'half' }"
			/>
		<!-- </div> -->
		<!-- :class="{ '!w-1/2': (field && field.width === 'half') }" -->
		<div className="text-center mt-6">
			<input
				className="cursor-pointer bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
				type="submit"
				:value="title"
			/>
		</div>
	</form>
</template>
