<template>
    <div class="mt-16 border-t-2 border-indigo-500">
        <div class="container mx-auto mt-16 px-4"></div>
        <div class="grid sm:grid-cols-2 items-start gap-16 p-14 mx-auto max-w-7xl shadow-lg">
            <div>
                <h1 class="text-gray-800 text-3xl font-extrabold">Let's Talk</h1>
                <p class="text-sm text-gray-500 mt-4">Have some big idea or brand to develop and need help? Then
                    reachout we'd love to hear about your project and provide help.</p>

                <div class="mt-12">
                    <h2 class="text-gray-800 text-base font-bold">Email</h2>
                    <ul class="mt-4 pl-0">
                        <li class="flex items-center">
                            <div
                                class="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                                <fa icon="envelope" class="size-5 text-gray-600 hover:text-blue-800"></fa>
                            </div>
                            <a href="#" class="text-[#007bff] text-sm ml-4">
                                <small class="block">Mail</small>
                                <strong>{{props.email}}</strong>
                            </a>
                        </li>
                    </ul>
                </div>

                <div class="mt-12">
                    <h2 class="text-gray-800 text-base font-bold">Socials</h2>

                    <ul class="flex mt-4 space-x-4 pl-0 ">
                        <li class="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                            <a href="javascript:void(0)">
                                <fa :icon="['fab', 'github']" class="size-6 mt-1 text-gray-600 hover:text-black" />
                            </a>
                        </li>
                        <li class="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                            <a href="javascript:void(0)">
                                <fa :icon="['fab', 'linkedin']" class="size-6 mt-1 text-gray-600 hover:text-blue-600" />
                            </a>
                        </li>
                        <li class="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                            <a href="javascript:void(0)">
                                <fa :icon="['fab', 'instagram']" class="size-6 mt-1 text-gray-600 hover:text-red-500" />

                            </a>
                        </li>
                        <li class="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                            <a href="javascript:void(0)">
                                <fa :icon="['fab', 'twitter']" class="size-6 mt-1 text-gray-600 hover:text-blue-500" />

                            </a>
                        </li>
                        <li class="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                            <a href="javascript:void(0)">
                                <fa :icon="['fab', 'dev']" class="size-6 mt-1 text-gray-600 hover:text-black" />

                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <form class="ml-auto space-y-4" @submit.prevent="SendMessage">
                <input type='text' placeholder='Name' v-model="model.name"
                    class="w-full rounded-md py-3 px-4 bg-gray-100 text-gray-800 text-sm outline-blue-500 focus:bg-transparent" />
                <input type='email' placeholder='Email' v-model="model.email"
                    class="w-full rounded-md py-3 px-4 bg-gray-100 text-gray-800 text-sm outline-blue-500 focus:bg-transparent" />
                <input type='text' placeholder='Subject' v-model="model.subject"
                    class="w-full rounded-md py-3 px-4 bg-gray-100 text-gray-800 text-sm outline-blue-500 focus:bg-transparent" />
                <textarea placeholder='Message' rows="6" v-model="model.message"
                    class="w-full rounded-md px-4 bg-gray-100 text-gray-800 text-sm pt-3 outline-blue-500 focus:bg-transparent"></textarea>
                <button type='submit'
                    class="text-white bg-indigo-500 hover:bg-indigo-800 tracking-wide rounded-md text-sm px-4 py-3 w-full !mt-6">Send</button>
            </form>
        </div>
    </div>

</template>
<script setup>

import { reactive } from 'vue';
import { useToast } from '../../composables/useToast';
import loader from '../../composables/loader';
import { afterSlot } from '../../composables/afterSlot';


const props = defineProps({
    webFormKey: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    socials: {
        type: Object,
        required: false
    }
});

const $toast = useToast();

var model = reactive({
    name: '',
    email: '',
    subject: '',
    message: ''
});

const SendMessage = async () => {
    loader.BlockWindow(null, afterSlot("Please wait.."));

    if (!model.name || !model.email || !model.subject || !model.message) {
        $toast.error('Please fill all the fields.', 'Error');
        loader.UnBlockWindow();
        return;
    }
    const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({
            access_key: props.webFormKey,
            name: model.name,
            email: model.email,
            subject: model.subject,
            message: model.message,
        }),
    });
    const result = await response.json();
    if (result.success) {
        model.name = '';
        model.email = '';
        model.subject = '';
        model.message = '';
        $toast.success('Email sent successfully.', 'Success');

    }else{
        $toast.error('Email not sent. Please contact administrator', 'Error');
    }
    loader.UnBlockWindow();


}
</script>
<style scoped></style>