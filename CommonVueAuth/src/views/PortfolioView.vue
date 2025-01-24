<template>
  <div class="bg-white ">
    <header class="absolute inset-x-0 top-0 z-50 mx-auto xl:container">
      <nav class="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div class="flex lg:flex-1">

          <span class="text-lg/5 font-semibold text-gray-900 hover:cursor-pointer hover:text-indigo-500"
            @click="OnHomeMenuClick">{{ cardDetails.name }}</span>

        </div>
        <div class="flex lg:hidden">
          <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            @click="mobileMenuOpen = true">
            <span class="sr-only">Open main menu</span>
            <fa class="size-6" icon="bars" />
          </button>
        </div>
        <div class="hidden lg:flex lg:gap-x-8">
          <a href="#" @click="OnHomeMenuClick"
            :class="[config.IsHomeMenuSelected ? activeClass : inactiveClass]">Home</a>
          <a href="#" @click="OnAboutMenuClick"
            :class="[config.IsAboutMenuSelected ? activeClass : inactiveClass]">About</a>
          <a href="#" @click="OnProjectMenuClick"
            :class="[config.IsProjectMenuSelected ? activeClass : inactiveClass]">Project</a>
          <a href="#" @click="OnBlogMenuClick"
            :class="[config.IsBlogMenuSelected ? activeClass : inactiveClass]">Blog</a>

          <a href="#" @click="OnContactMenuClick"
            :class="[config.IsContactMenuSelected ? activeClass : inactiveClass]">Contact</a>


        </div>
        <div class="hidden lg:flex lg:flex-1 lg:justify-end">

          <a :href="cardDetails.socialLinks.github" target="_blank">
            <span>
              <fa :icon="['fab', 'github']" class="size-6 mr-3 text-gray-600 hover:text-black" />
            </span>
          </a>
          <a :href="cardDetails.socialLinks.twitter" target="_blank">
            <span>
              <fa :icon="['fab', 'twitter']" class="size-6 mr-3 text-gray-600  hover:text-sky-500" />
            </span>
          </a>

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

                <a href="#" @click="OnHomeMenuClick"
                  :class="[config.IsHomeMenuSelected ? mobileActiveClass : mobileInActiveClass]">Home</a>
                <a href="#" @click="OnAboutMenuClick"
                  :class="[config.IsAboutMenuSelected ? mobileActiveClass : mobileInActiveClass]">About</a>
                <a href="#" @click="OnProjectMenuClick"
                  :class="[config.IsProjectMenuSelected ? mobileActiveClass : mobileInActiveClass]">Project</a>
                <a href="#" @click="OnBlogMenuClick"
                  :class="[config.IsBlogMenuSelected ? mobileActiveClass : mobileInActiveClass]">Blog</a>
                <a href="#" @click="OnContactMenuClick"
                  :class="[config.IsContactMenuSelected ? activeClass : inactiveClass]">Contact</a>
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
    <div class=" divide-y" v-if="!config.IsHomeMenuSelected"></div>
    <div class="relative isolate">
      <div class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true">
        <div
          class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" />
      </div>

      <Home v-if="config.IsHomeMenuSelected" :cardDetails="cardDetails" :highlights="hightlightDetails.data"
        :personal-info="personalDetails" />
      <About v-if="config.IsAboutMenuSelected" />
      <Project v-if="config.IsProjectMenuSelected" />
      <Blog v-if="config.IsBlogMenuSelected" />
      <Contact v-if="config.IsContactMenuSelected" />

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
import { defineProps, ref, reactive } from 'vue';
import { Dialog, DialogPanel } from '@headlessui/vue'
import Home from '../components/portfolio/Home.vue';
import About from '../components/portfolio/About.vue';
import Project from '../components/portfolio/Project.vue';
import Blog from '../components/portfolio/Blog.vue';
import Contact from '../components/portfolio/Contact.vue';

const personalDetails = reactive({
  name: 'Kaman Khadka',
  role: 'Full Stack Developer',
  shortDescription: 'Passionate about building scalable web applications and solving complex problems',
  banner: 'https://res.cloudinary.com/dkoc7pi7u/image/upload/v1736828460/kaman_name_png.png',
  profile: 'https://res.cloudinary.com/dkoc7pi7u/image/upload/v1737299508/rr5v6rwkbrz9j9v6tyr0.jpg'
})

const cardDetails = reactive({
  name: 'Kaman Khadka',
  role: 'Full Stack Developer',
  socialLinks: {
    github: 'https://github.com/silentcoder52626',
    twitter: 'https://x.com/common_khadka',
    linkedin: 'https://www.linkedin.com/in/kaman-khadka-474340140/'
  }
})
const hightlightDetails = reactive({
  data: [
    {
      title: 'Full Stack Developer',
      description: 'A decade long experience in both frontend and backend development using modern technologies.'
    },
    {
      title: 'Problem Solver',
      description: 'Passionate about solving complex problems and building scalable web applications'
    },
    {
      title: 'Team Player',
      description: 'A good team player with excellent communication skills and ability to work in a team'
    }
  ]
})
const config = reactive({
  IsHomeMenuSelected: true,
  IsAboutMenuSelected: false,
  IsProjectMenuSelected: false,
  IsBlogMenuSelected: false,
  IsContactMenuSelected: false
})

function OnHomeMenuClick() {
  config.IsHomeMenuSelected = true;
  config.IsAboutMenuSelected = false;
  config.IsProjectMenuSelected = false;
  config.IsBlogMenuSelected = false;
  mobileMenuOpen.value = false;
  config.IsContactMenuSelected = false

}
function OnAboutMenuClick() {
  config.IsHomeMenuSelected = false;
  config.IsAboutMenuSelected = true;
  config.IsProjectMenuSelected = false;
  config.IsBlogMenuSelected = false;
  mobileMenuOpen.value = false;
  config.IsContactMenuSelected= false

}
function OnProjectMenuClick() {
  config.IsHomeMenuSelected = false;
  config.IsAboutMenuSelected = false;
  config.IsProjectMenuSelected = true;
  config.IsBlogMenuSelected = false;
  mobileMenuOpen.value = false;
  config.IsContactMenuSelected = false

}
function OnBlogMenuClick() {
  config.IsHomeMenuSelected = false;
  config.IsAboutMenuSelected = false;
  config.IsProjectMenuSelected = false;
  config.IsBlogMenuSelected = true;
  mobileMenuOpen.value = false;
  config.IsContactMenuSelected = false

}

function OnContactMenuClick() {
  config.IsHomeMenuSelected = false;
  config.IsAboutMenuSelected = false;
  config.IsProjectMenuSelected = false;
  config.IsBlogMenuSelected = false;
  config.IsContactMenuSelected = true;

  mobileMenuOpen.value = false;
}

const activeClass = ref(
  'text-sm/6 font-semibold text-indigo-600',
)
const inactiveClass = ref(
  'text-sm/6 font-semibold text-gray-500 hover:text-indigo-600 ',
)
const mobileInActiveClass = ref(
  '-mx-3 block rounded-lg px-3 py-1 text-base/7 font-semibold text-gray-900 border-b border-gray-500/10 hover:bg-indigo-50 '
)
const mobileActiveClass = ref(
  '-mx-3 block rounded-lg px-3 py-1 text-base/7 font-semibold border-b border-gray-500/10 text-indigo-900 '
)

const mobileMenuOpen = ref(false)

const props = defineProps({
  userName: {
    type: String,
    required: true,
  },
});


</script>
