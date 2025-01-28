<template>
    <div class="bg-white ">

        <header class="absolute inset-x-0 top-0 z-50 mx-auto xl:container">
            <nav class="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
                <div class="flex lg:flex-1">

                    <span class="text-lg/5 font-semibold text-gray-900 hover:cursor-pointer hover:text-indigo-500"
                        @click="OnHomeMenuClick">{{ cardDetails.name }}</span>

                </div>
                <div class="flex lg:hidden">
                    <button type="button"
                        class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
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
                    <template v-if="projectData.GithubUserName">
                        <a href="#" @click="OnProjectMenuClick"
                            :class="[config.IsProjectMenuSelected ? activeClass : inactiveClass]">Project</a>
                    </template>
                    <template v-if="blogData.DevToProfileLink">

                        <a href="#" @click="OnBlogMenuClick"
                            :class="[config.IsBlogMenuSelected ? activeClass : inactiveClass]">Blog</a>
                    </template>
                    <a href="#" @click="OnContactMenuClick"
                        :class="[config.IsContactMenuSelected ? activeClass : inactiveClass]">Contact</a>


                </div>
                <div class="hidden lg:flex lg:flex-1 lg:justify-end gap-1">

                    <a :href="cardDetails.socialLinks.github" target="_blank" v-if="cardDetails.socialLinks.github">
                        <span>
                            <fa :icon="['fab', 'github']" class="size-6 mr-3 text-gray-600 hover:text-black" />
                        </span>
                    </a>
                    <a :href="cardDetails.socialLinks.twitter" target="_blank" v-if="cardDetails.socialLinks.twitter">
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
                        <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700"
                            @click="mobileMenuOpen = false">
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
                                <template v-if="projectData.GithubUserName">
                                    <a href="#" @click="OnProjectMenuClick"
                                        :class="[config.IsProjectMenuSelected ? mobileActiveClass : mobileInActiveClass]">Project</a>
                                </template>
                                <template v-if="blogData.DevToProfileLink">
                                    <a href="#" @click="OnBlogMenuClick"
                                        :class="[config.IsBlogMenuSelected ? mobileActiveClass : mobileInActiveClass]">Blog</a>
                                </template>

                                <a href="#" @click="OnContactMenuClick"
                                    :class="[config.IsContactMenuSelected ? mobileActiveClass : mobileInActiveClass]">Contact</a>
                            </div>
                            <div class="py-6 flex justify-center">
                                <fa :icon="['fab', 'github']"
                                    class="size-6 mr-3  text-gray-500 hover:text-gray-900 transition-colors duration-200" v-if="cardDetails.socialLinks.github"/>

                                <fa :icon="['fab', 'linkedin']"
                                    class="size-6 mr-3  text-gray-500 hover:text-gray-900 transition-colors duration-200" v-if="cardDetails.socialLinks.twitter"/>
                            </div>
                        </div>
                    </div>
                </DialogPanel>
            </Dialog>
        </header>

        <div class="relative isolate">
            <div class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                aria-hidden="true">
                <div class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                    style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" />
            </div>

            <Home v-if="config.IsHomeMenuSelected" :cardDetails="cardDetails" :highlights="hightlightDetails.data"
                :personal-info="personalDetails" @goToAbout="OnAboutMenuClick" />

            <About v-if="config.IsAboutMenuSelected" :educations="educations.data" :experiences="experiences.data"
                :skills="skills.data" :description="description" />

            <Project v-if="config.IsProjectMenuSelected" :projectData="projectData" />

            <template v-if="blogData.DevToProfileLink">

                <Blog v-if="config.IsBlogMenuSelected" :blogData="blogData" />
            </template>
            <Contact v-if="config.IsContactMenuSelected" :email="contactData.email" :webFormKey="contactData.webFormKey"
                :socials="contactData.socials" />


            <div class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
                aria-hidden="true">
                <div class="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                    style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" />
            </div>
        </div>

    </div>
</template>

<script setup>
import { defineProps, ref, reactive, onMounted } from 'vue';
import { Dialog, DialogPanel } from '@headlessui/vue'


import Home from './Home.vue';
import About from './About.vue';
import Project from './Project.vue';
import Blog from './Blog.vue';
import Contact from './Contact.vue';

const personalDetails = reactive({
    name: '',
    role: '',
    shortDescription: '',
    banner: '',
    cvLink: ''
})

const cardDetails = reactive({
    name: '',
    role: '',
    profile: '',
    socialLinks: {
        github: '',
        twitter: '',
        linkedin: ''
    }
})
const hightlightDetails = reactive({
    data: []
})


const educations = reactive({
    data: []
})
const experiences = reactive({
    data: []
})
const skills = reactive({
    data: []
})
const description = ref('');


const projectData = reactive({
    GithubUserName: '',
    GithubProjectContToShow: 10
})

const blogData = reactive({
    BlogsContToShow: 6,
    DevToProfileLink: ""
})
const config = reactive({
    IsHomeMenuSelected: true,
    IsAboutMenuSelected: false,
    IsProjectMenuSelected: false,
    IsBlogMenuSelected: false,
    IsContactMenuSelected: false,
})

const contactData = reactive({
    email: '',
    webFormKey: '',
    socials: []
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
    config.IsContactMenuSelected = false

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
    userData: {
        type: Object,
        required: true,
    },
});

onMounted(async () => {

    var userData = props.userData;

    configureHomePage();

    configureAboutPage();

    projectData.GithubUserName = userData.accountLinks.find(account => account.name === 'Github')?.url ?? "";
    blogData.DevToProfileLink = userData.accountLinks.find(account => account.name === 'Dev')?.url ?? "";

    contactData.email = userData.user.email;
    contactData.webFormKey = userData.setting.weB3FormsAcessKey;
    contactData.socials = userData.accountLinks;

    function configureAboutPage() {

        description.value = userData.accountDetails.detailedDescription;

        const educatioinsResponse = userData.educations.map(item => ({
            title: item.title,
            university: item.university,
            startYear: item.startYear,
            endYear: item.endYear,
            description: item.description,
            address: item.address
        }));
        educations.data = educatioinsResponse;

        const experienceResponse = userData.experiences.map(item => ({
            title: item.title,
            organization: item.organization,
            duration: item.duration,
            description: item.description
        }));
        experiences.data = experienceResponse;

        skills.data = userData.skills.reduce((acc, item) => {
            const group = acc.find(g => g.type.toLowerCase() === item.skillType.toLowerCase());

            const skill = {
                name: item.title,
                icon: item.iconClass || ""
            };

            if (group) {
                group.skills.push(skill);
            } else {

                acc.push({
                    type: item.skillType.toLowerCase(),
                    skills: [skill]
                });
            }

            return acc;
        }, []);

    }
    function configureHomePage() {
        cardDetails.name = userData.user.name;
        cardDetails.role = userData.accountDetails.position;
        cardDetails.profile = userData.accountDetails.profilePictureLink;

        cardDetails.socialLinks.twitter = userData.accountLinks.find(account => account.name === 'Twitter')?.url ?? "";
        cardDetails.socialLinks.linkedin = userData.accountLinks.find(account => account.name === 'LinkedIn')?.url ?? "";
        cardDetails.socialLinks.github = userData.accountLinks.find(account => account.name === 'Github')?.url ?? "";


        personalDetails.name = userData.user.name;
        personalDetails.role = userData.accountDetails.position;
        personalDetails.shortDescription = userData.accountDetails.shortDescription;
        personalDetails.banner = userData.accountDetails.bannerPictureLink;
        personalDetails.profile = userData.accountDetails.profilePictureLink;
        personalDetails.cvLink = userData.accountDetails.cvLink;


        const highlightsResponse = userData.highlightDetails.map(item => ({
            title: item.title,
            description: item.description
        }));
        hightlightDetails.data = highlightsResponse;
    }
})

</script>