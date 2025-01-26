<template>
    <div class="flex flex-col">
        <div class="w-full p-6 bg-white rounded-lg shadow-lg max-w-md ">
            <h2 class="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                Setting
            </h2>
            <form class="mt-4 space-y-4 lg:mt-5 md:space-y-5" @submit.prevent="submit" ref="SettingForm">


                <label class="block mt-3">
                    <span class="text-sm text-gray-700">Theme</span>
                    <select v-model="data.theme" class="border rounded px-2 py-1 w-full" required>
                        <option v-for="type in themes" :key="type" :value="type">
                            {{ type }}
                        </option>
                    </select>
                </label>

                <label class="block mt-3">
                    <span class="text-sm text-gray-700"><a href="https://web3forms.com/" target="_blank" title="Click here to get your access key"> Web 3 Forms Access Key <fa icon="arrow-up-right-from-square"/> </a></span>
                    <input v-model="data.weB3FormsAcessKey" type="text"
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

import { reactive, ref, onMounted } from 'vue'

import axios from '../../plugins/axios';
import loader from '../../composables/loader';
import { useToast } from '../../composables/useToast';
import { afterSlot } from '../../composables/afterSlot';

const SettingForm = ref(null);
const $toast = useToast();
var data = reactive({
    theme: '',
    weB3FormsAcessKey: ''
});

const themes = ref([]);

onMounted(async () => {
    LoadThemes();
    try{
        loader.BlockWindow(SettingForm.value, afterSlot());

        var settings = await axios.get("/api/settings");
        if (settings && settings.status === 200) {
            data.theme = settings.data.theme;
            data.weB3FormsAcessKey = settings.data.weB3FormsAcessKey;
        } else {
            $toast.error(response.data.reason, "Error");
        }
    } catch (error) {
        $toast.error("Failed to load setting data.", "Error");

    } 
    finally{
        loader.UnBlockWindow();
    }
})

const submit = async () => {
    try {
        loader.BlockWindow(SettingForm.value, afterSlot());

        
        const response = await axios.post("/api/settings/addorupdate", data);
        if (response.status === 200) {
            $toast.success("Settings updated successfully.", "Success!");
            loader.UnBlockWindow();


        } else if (response.status === 500) {
            const data = response.data;
            $toast.info(data.reason);
            loader.UnBlockWindow();

        } else {
            $toast.error("Something went wrong.", "Error!");
            loader.UnBlockWindow();
        }


    } catch (error) {
        console.error("Error fetching user:", error);
    }

}

async function LoadThemes() {
    try {
        const response = await axios.get("/api/theme-types");
        if (response && response.status === 200) {
            themes.value = response.data;
        } else {
            $toast.error(response.data.reason, "Error");
        }
    } catch (error) {
        $toast.error("Failed to load themes.", "Error");
    }

}
</script>