<template>
  <div class="bg-white">
    <header class="absolute inset-x-0 top-0 z-50 ">
      <nav class="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div class="flex lg:flex-1">

          <span class="text-lg/5 font-semibold text-gray-900">{{ props.userName }}</span>

        </div>
        <div class="flex lg:hidden">
          <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            @click="mobileMenuOpen = true">
            <span class="sr-only">Open main menu</span>
            <fa class="size-6" icon="bars" />
          </button>
        </div>
        <div class="hidden lg:flex lg:gap-x-8">
          <a v-for="item in navigation" :key="item.name" :href="item.href"
            class="text-sm/6 font-semibold text-gray-900">{{ item.name }}</a>
        </div>
        <div class="hidden lg:flex lg:flex-1 lg:justify-end">
          <fa :icon="['fab', 'github']" class="size-6 mr-3" />

          <fa :icon="['fab', 'linkedin']" class="size-6 mr-3" />
        </div>
      </nav>
      <Dialog class="lg:hidden" @close="mobileMenuOpen = false" :open="mobileMenuOpen">
        <div class="fixed inset-0 z-50" />
        <DialogPanel
          class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div class="flex items-center justify-between">
            <span class="text-lg/7 font-semibold text-gray-900">{{ props.userName }}</span>
            <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = false">
              <span class="sr-only">Close menu</span>
              <fa icon="times" class="size-6" />
            </button>
          </div>
          <hr />
          <div class="mt-6 ">
            <div class="-my-6 ">
              <div class="space-y-2 py-6">
                <template v-for="(item) in navigation" :key="item.name">
                  <a :href="item.href"
                    class="-mx-3 block rounded-lg px-3 py-1 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                    {{ item.name }}
                  </a>
                  <div class="border-b border-gray-500/10"></div>
                </template>
              </div>
              <div class="py-6 flex justify-center">
                <fa :icon="['fab', 'github']"
                  class="size-6 mr-3  text-gray-500 hover:text-gray-900 transition-colors duration-200" />

                <fa :icon="['fab', 'linkedin']"
                  class="size-6 mr-3  text-gray-500 hover:text-gray-900 transition-colors duration-200" />
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>

    <div class="relative isolate">
      <div class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true">
        <div
          class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" />
      </div>

      <Home />
      
      <div
        class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        aria-hidden="true">
        <div
          class="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref } from 'vue';
import { Dialog, DialogPanel } from '@headlessui/vue'
import Home from '../components/portfolio/Home.vue';


const navigation = [
  { name: 'Home', href: '#' },
  { name: 'About', href: '#' },
  { name: 'Projects', href: '#' },
  { name: 'Blog', href: '#' },
];

const mobileMenuOpen = ref(false)

const props = defineProps({
  userName: {
    type: String,
    required: true,
  },
});
</script>
