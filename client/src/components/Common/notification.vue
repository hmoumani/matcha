<template>
  <div class="fixed top-16 w-full max-w-sm px-4">
    <Popover v-slot="{ open }" class="relative">
      <PopoverButton :class="open ? '' : 'text-opacity-90'" @click="open ? notificationList.forEach(elem => elem.seen = true) : apiClient.post('feed/markAsSeen')"
        class="group inline-flex items-center rounded-md text-base font-medium text-white hover:text-opacity-100 focus:outline-none">
        <div class="relative inline-flex w-fit">
          <div
            v-if="notificationList.some(elem => elem.seen === false)"
            class="absolute top-0 right-0 bottom-auto left-auto z-10 inline-block translate-x-2/4 -translate-y-1/2 rotate-0 skew-x-0 skew-y-0 scale-x-100 scale-y-100 rounded-full bg-pink-700 p-1 text-xs">
          </div>
          <div
            class="flex items-center justify-center rounded-lg bg-red-500 px-1 py-1 text-center text-white shadow-lg dark:text-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-6 w-6">
              <path fill-rule="evenodd"
                d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
                clip-rule="evenodd" />
            </svg>
          </div>
        </div>
      </PopoverButton>

      <transition enter-active-class="transition duration-200 ease-out" enter-from-class="translate-y-1 opacity-0"
        enter-to-class="translate-y-0 opacity-100" leave-active-class="transition duration-150 ease-in"
        leave-from-class="translate-y-0 opacity-100" leave-to-class="translate-y-1 opacity-0">
        <PopoverPanel class="absolute  z-10 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-1xl">
          <div :class="notificationList.length > 0 ? 'overflow-y-scroll max-h-96' : 'h-14'"
            class="overflow-y-scroll rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
            <div v-if="notificationList.length > 0">
              <div class="flex flex-col gap-8 bg-white p-7 lg:grid-cols-2">
                <a v-for="item in notificationList" :key="item.name" :href="item.href"
                :class="item.seen === false ? 'bg-gray-200' : ''"
                  class="-m-3 flex items-center  rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
                  <div class="flex h-10 w-10 shrink-0 items-center justify-center text-white sm:h-12 sm:w-12">
                    <div><img :src="item.icon" /></div>
                  </div>
                  <div class="ml-4">
                    <p class="text-sm font-medium text-gray-900">
                      {{ item.name }}
                    </p>
                    <p class="text-sm text-gray-500">
                      {{ item.description }}
                    </p>
                  </div>
                </a>
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
</script>
