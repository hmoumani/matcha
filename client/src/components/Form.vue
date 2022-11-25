<template>
	<form>
		<div className="grid grid-cols-6 gap-6">
			<div v-for="field in fields" key="{field.name}">
				<label
					className="block uppercase text-gray-700 text-xs font-bold mb-2"
					htmlFor="grid-password"
				>
					{field.name}
				</label>
				{field.type == "select" ? (
				<CustomSelectMenu options="{field.options}" />
				) : // ) : field.type == "checkbox" ? ( //
				<CustomRadioInput options="{field.options}" />
				field.type == "upload" ? (
				<CustomImgUpldoad />
				) : field.type == "tags" ? (
				<CustomTagsInput options="{field.options}" />
				) : field.type == "textarea" ? (
				<textarea
					ref="{register}"
					name="{field.name}"
					maxlength="150"
					className="resize-none px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
				/>
				) : (
				<input
					ref="{register}"
					type="{field.type}"
					name="{field.name}"
					className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
					placeholder="{field.name}"
				/>
				)}
			</div>
			))}
		</div>
		<div>
			<label className="inline-flex items-center cursor-pointer">
				<input
					id="customCheckLogin"
					type="checkbox"
					className="form-checkbox text-gray-800 ml-1 w-5 h-5"
				/>
				<span className="ml-2 text-sm font-semibold text-gray-700">
					Remember me
				</span>
			</label>
		</div>

		<div className="text-center mt-6">
			<input
				className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
				type="submit"
				value="{title}"
			/>
		</div>
	</form>
</template>
<script setup lang="ts">
	const fields:any = [];
    defineProps()
</script>
