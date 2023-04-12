<template>
  <div class="fixed top-16 w-full max-w-sm px-4">
    <Popover v-slot="{ open }" class="relative">
      <PopoverButton :class="open ? '' : 'text-opacity-90'" @click="clickHandler(open)"
        class="group inline-flex items-center rounded-md text-base font-medium text-white hover:text-opacity-100 focus:outline-none">
        <div class="relative inline-flex w-fit left-24">
          <div
          class="flex items-center justify-center rounded-lg px-1 py-1 text-center text-white dark:text-gray-200">
          <div
            v-if="notificationList.some(elem => elem.seen === false)"
            class="absolute flex justify-center items-center top-1/4 right-1/3  bottom-auto z-10 translate-x-2/4 -translate-y-1/2 rotate-0 skew-x-0 skew-y-0 scale-x-100 scale-y-100 rounded-full bg-red-500 w-4 h-4 text-[9px]">
            <p class="">{{notificationList.filter(elem => elem.seen === false).length}}</p>
          </div>
            <img src="https://cdn-icons-png.flaticon.com/512/3239/3239952.png" class="h-7 w-6" />

          </div>
        </div>
      </PopoverButton>

      <transition enter-active-class="transition duration-200 ease-out" enter-from-class="translate-y-1 opacity-0"
        enter-to-class="translate-y-0 opacity-100" leave-active-class="transition duration-150 ease-in"
        leave-from-class="translate-y-0 opacity-100" leave-to-class="translate-y-1 opacity-0">
        <PopoverPanel class="absolute top-8 z-50 mt-3 w-screen max-w-sm -translate-x-64 transform px-4 sm:px-0 lg:max-w-1xl">
          <div :class="notificationList.length > 0 ? 'overflow-y-scroll max-h-96' : 'h-14'"
            class="overflow-y-scroll scroll- rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
            <div v-if="notificationList.length > 0">
              <div class="flex flex-col gap-7 bg-white p-4 lg:grid-cols-2">
                <router-link v-for="item in notificationList" :key="item.name"  :to="{path: `/Profile/${item.userId}`}"
                :class="item.seen === false ? 'bg-gray-200' : ''"
                  class="-m-3 flex items-center  rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
                  <div class="flex h-14 w-14 shrink-0 items-center justify-center text-white sm:h-14 sm:w-14">
                    <div class=""><img class="rounded-full w-14 h-14" :src="item.icon" /></div>
                  </div>
                  <div class="ml-4">
                    <p class="text-sm font-medium text-gray-900">
                      {{ item.name }}
                    </p>
                    <p class="text-sm text-gray-500">
                      {{ item.description }}
                    </p>
                  </div>
                </router-link>
              </div>
            </div>
            <div v-if="notificationList.length == 0">
              <div class="flex flex-col h-14 bg-white">
                <div class="flex h-5 w-10 shrink-0 items-center justify-center text-white sm:w-12 text-center">
                </div>
                <div class="ml-4 h-5">
                  <p class="text-sm text-gray-500 text-center">
                    You have no notification
                  </p>
                </div>
              </div>
            </div>
          </div>
        </PopoverPanel>
      </transition>
    </Popover>
  </div>
</template>

<script setup>
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'
import { useNotificationStore } from '@/store/notification'
import { storeToRefs } from 'pinia'
import apiClient from '../../modules/apiClient';
const { notificationList } = storeToRefs(useNotificationStore());
let isOpen = false;
onMounted(() => {
  window.addEventListener('click', (e) => {
    if (isOpen) {
      notificationList.value.forEach(elem => elem.seen = true);
      isOpen = false;
    }
  })
})

const clickHandler = (open) => {
  isOpen = true;
  return open ? notificationList.forEach(elem => elem.seen = true) : apiClient.post('feed/markAsSeen')
}
</script>
