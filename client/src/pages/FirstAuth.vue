<script setup>
import { useAuthStore } from '../store/auth.ts';
let user = ref({
    age: 18,
    gender: 'male',
    sexualOrientation: 'female',
    biography: '',
    passions:[]
});
let fields = ref([
    { name: 'gender', type: 'text', value: '' },
    { name: 'Password', type: 'password', value: '' },
]);
let { FirstAuth } = useAuthStore();

const firstAuth = () => {
    FirstAuth(user.value);
};
const handleChangePassions = passions => {
		user.value.passions = passions;
};
</script>
<template>
    <div class="h-screen">
        <section class="absolute w-full h-full bg-gray-50">
            <div class="absolute top-0 w-full h-full bg-gray-50 bg bg-cover">
                <div class="absolute inset-0 bg-gray-700 opacity-75"></div>
            </div>
            <div class="container mx-auto px-4 h-full">
                <div class="flex content-center items-center justify-center h-full">
                    <div class="w-full lg:w-4/12 px-4">
                        <div
                            class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-50 border-0">
                            <div class="rounded-t mb-0 px-6 py-6">
                                <div class="text-center mb-3">
                                    <img src="/assets/logo.svg" class="w-12 mx-auto" />
                                </div>
                            </div>
                            <div class="flex-auto px-4 lg:px-10 pt-2 pb-0">
                                <form @submit.prevent="firstAuth">
                                    <div class="flex-1d"><label
                                            class="block text-sm font-medium text-gray-700">Gender</label>
                                        <div class="mt-1 mb-2 relative">
                                            <select class="w-full rounded-md" id="gender" name="gender" v-model="user.gender">
                                                <option value="male">male</option>
                                                <option value="female">female</option>
                                            </select>
                                            <div class="pointer-cursor absolute inset-y-0 right-0 flex items-center pr-3">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="flex-1d"><label
                                            class="block text-sm font-medium text-gray-700">What you want to see?</label>
                                        <div class="mt-1 mb-2 relative">
                                            <!--<input id="email" name="email" type="password"
                                                block="" autocomplete="off" required=""
                                                class="w-full appearance-none rounded-md border-0 px-3 py-2 placeholder-gray-400 shadow-sm"> -->
                                            <select class="w-full rounded-md" v-model="user.sexualOrientation">
                                                <option value="female">female</option>
                                                <option value="male">male</option>
                                                <option value="both">both</option>
                                            </select>

                                            <div class="pointer-cursor absolute inset-y-0 right-0 flex items-center pr-3">
                                            </div>
                                        </div>
                                    </div>

                                        <div class="mt-1 mb-2 relative">
                                            <!--<input id="email" name="email" type="password"
                                                block="" autocomplete="off" required=""
                                                class="w-full appearance-none rounded-md border-0 px-3 py-2 placeholder-gray-400 shadow-sm"> -->
                                                <div>
                                                    <label
                                                    class="block text-sm font-medium text-gray-700">Tags</label>
                                                    <passionTags :passions="user.passions" 
                                                    @onTagsChanged="handleChangePassions"/>
                                                </div>

                                            <div class="pointer-cursor absolute inset-y-0 right-0 flex items-center pr-3">
                                            </div>
                                    </div>
                                    <div class="flex-1d"><label
                                            class="block text-sm font-medium text-gray-700">Biography</label>
                                        <div class="mt-1 mb-2 relative">
                                            <textarea class="w-full h-full rounded-md" v-model="user.biography"></textarea>
                                            <div class="pointer-cursor absolute inset-y-0 right-0 flex items-center pr-3">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="flex-1d"><label
                                            class="block text-sm font-medium text-gray-700">Age</label>
                                        <div class="mt-1 mb-2 relative">
                                            <input v-model="user.age" class="w-full rounded-md" type="number"/>
                                            <div class="pointer-cursor absolute inset-y-0 right-0 flex items-center pr-3">
                                        </div>
                                        </div>
                                    </div>
                                    <div class="text-center mt-6"><input
                                            class="cursor-pointer bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                                            type="submit" value="submit"></div>
                                </form>
                            </div>
                            <hr class="mt-6 border-b-1 border-gray-400" />

                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<style>
.bg {
    background-image: url('https://tinder.com/static/build/07eef8b101ca939c978a599f508aa955.webp');
}
</style>
