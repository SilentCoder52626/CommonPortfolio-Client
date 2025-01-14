<template>
    <div class="rounded overflow-x-hidden shadow-lg p-3">
        <div class="border-b-2 border-indigo-500 pb-3 flex justify-between items-center">
            <h4 class="text-xl font-medium text-gray-700 capitalize mb-0">
                <fa icon="link" /> Accounts Links
            </h4>
            <button @click="AddLink" :class="`text-sm text-white bg-green-500 px-3 py-1 rounded-md`">
                <fa icon="plus" /> Add
            </button>

        </div>
        <div class="mt-2" ref="AccountLinksTable">
            <table class="w-full border-collapse table-auto">
                <thead>
                    <tr>
                        <th class="border border-gray-300 px-3 py-2">Name</th>
                        <th class="border border-gray-300 px-3 py-2">Link</th>
                        <th class="border border-gray-300 px-3 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <AccountLinks v-for="link in data.links" :key="link.id" :link="link" :linkTypes="linkTypes" v-if="!config.isLoading" :isNewEntry="isNewEntry"/>
                    <tr v-if="config.isLoading">
                        <td class="border border-gray-300 px-3 py-2" colspan="3">
                            <div class="flex justify-center items-center">
                                <fa icon="spinner" /> &nbsp; Loading Account Links...
                            </div>
                        </td>
                    </tr>
                    <tr v-if="config.noDataFound">
                        <td class="border border-gray-300 px-3 py-2" colspan="3">
                            <div class="flex justify-center items-center">
                                <fa icon="exclamation-triangle" /> &nbsp; No Account Links Found.
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script setup>

import { reactive, ref, onMounted } from 'vue';
import axios from '../plugins/axios';
import { useToast } from '../composables/useToast';
import AccountLinks from '../components/AccountLinks.vue';

const $toast = useToast();

const AccountLinksTable = ref(null);


const config = reactive({
    isLoading: false,
    noDataFound : false
});

const data = reactive({
    links: []
});

const linkTypes = ref([])
const isNewEntry = ref(false);
const AddLink = () => {
  data.links.unshift({
    id: '',  
    name: '', 
    url: ''
  });
    isNewEntry.value = true;
};

onMounted(async () => {

    LoadLinkTypes();

    try {
        config.isLoading = true;
        const response = await axios.get("/api/account-link");
        if (response && response.status === 200) {
            data.links = response.data;
            if (data.links.length === 0) {
                config.noDataFound = true;
            }
        } else {
            $toast.error(response.data.reason, "Error");
        }
    } catch (error) {
        $toast.error("Failed to load account links.", "Error");
        config.noDataFound = true;

    } finally {
        config.isLoading = false;
    }

    
});

async function LoadLinkTypes() {
    try{
        const response = await axios.get("/api/account-links-types");
        if(response && response.status === 200){
            linkTypes.value = response.data;
        }else{
            $toast.error(response.data.reason, "Error");
        }
    }catch(error){
        $toast.error("Failed to load link types.", "Error");
    }
    
}


</script>
<style scoped></style>