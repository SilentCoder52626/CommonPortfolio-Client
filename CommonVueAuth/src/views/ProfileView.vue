<template>
    <div class="flex flex-col">
        <div class="w-full p-6 bg-white rounded-lg shadow-lg max-w-md ">
            <h2 class="border-b-2 border-indigo-500 pb-3 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                Profile
            </h2>
            <form class="mt-4 space-y-4 lg:mt-5 md:space-y-5" @submit.prevent="submit" ref="SettingForm">


                <label class="block mt-3">
                    <span class="text-sm text-gray-700">Name</span>
                    <input v-model="user.name" type="text" required="required"
                        class="block w-full mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500">
                </label>
                <label class="block mt-3">
                    <span class="text-sm text-gray-700">Email</span>
                    <input v-model="user.email" type="email" required="required"
                        class="block w-full mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500">
                </label>
                <label class="block mt-3">
                    <span class="text-sm text-gray-700">Contact</span>
                    <input v-model="user.contact" type="text" required="required"
                        class="block w-full mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500">
                </label>


                <div class="mt-6">
                    <button type="submit"
                        class="w-full px-4 py-2 text-sm text-center text-white bg-indigo-600 rounded-md focus:outline-none hover:bg-indigo-500">
                        Save
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script setup>
import axios from '../plugins/axios'
import { onMounted, reactive, ref } from 'vue';
import { useToast } from '../composables/useToast';
import loader from '../composables/loader';
import { afterSlot } from '../composables/afterSlot';

const $toast = useToast();

const SettingForm = ref(null);

const user = reactive({
    name: "",
    email: "",
    contact: ""
})

const submit = async () => {
    try {
        loader.BlockWindow(SettingForm.value, afterSlot());

        const response = await axios.post("/api/user/update", user);
        if (response.status === 200) {
            $toast.success("User updated successfully.", "Success!");
            loader.UnBlockWindow();

        } else {
            const data = response.data;
            $toast.info(data.reason,"Info!");
            loader.UnBlockWindow();

        }


    } catch (error) {
        $toast.error(error.reason, "Error!");

        console.error("Error updating user details :", error);
    }

}

onMounted(async () => {
    try {
        loader.BlockWindow(SettingForm.value, afterSlot());

        const response = await axios.get("/api/user-details");
        if (response.status === 200) {
            var userDetails = response.data;
            user.name = userDetails.name;
            user.email = userDetails.email;
            user.contact = userDetails.contact;
            loader.UnBlockWindow();
        } else {
            $toast.error("Something went wrong.", "Error!");
            loader.UnBlockWindow();
        }
    } catch (error) {
        console.error("Error fetching user:", error);
        loader.UnBlockWindow();

    }
});
</script>