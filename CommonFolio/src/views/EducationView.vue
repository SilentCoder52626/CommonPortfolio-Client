<template>
    <div class="rounded overflow-x-hidden shadow-lg p-3">
        <div class="border-b-2 border-indigo-500 pb-3 flex justify-between items-center">
            <h4 class="text-xl font-medium text-gray-700 capitalize mb-0">
                <fa icon="graduation-cap" /> Educations
            </h4>
            <button @click="OnAdd" class="text-sm text-white bg-green-500 px-3 py-1 rounded-md">
                <fa icon="plus" /> Add
            </button>

        </div>
        <div class="mt-2" ref="EducationTable">
            <table class="w-full border-collapse table-auto ">
                <thead>
                    <tr>
                        <th class="border border-gray-300 px-3 py-2">Title</th>
                        <th class="border border-gray-300 px-3 py-2">University</th>
                        <th class="border border-gray-300 px-3 py-2">Start Year</th>
                        <th class="border border-gray-300 px-3 py-2">End Year</th>
                        <th class="border border-gray-300 px-3 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <EducationDetails v-for="edu in data.edus" :key="edu.id" :edu="edu" v-if="!config.isLoading" />
                    <tr v-if="config.isLoading">
                        <td class="border border-gray-300 px-3 py-2" colspan="5">
                            <div class="flex justify-center items-center">
                                <fa icon="spinner" /> &nbsp; Loading Education Details...
                            </div>
                        </td>
                    </tr>
                    <tr v-if="config.noDataFound">
                        <td class="border border-gray-300 px-3 py-2" colspan="5">
                            <div class="flex justify-center items-center">
                                <fa icon="exclamation-triangle" /> &nbsp; No Education Details Found.
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script setup>
import { openModal } from '@kolirt/vue-modal'

import { reactive, ref, onMounted } from 'vue';
import axios from '../plugins/axios';
import { useToast } from '../composables/useToast';
import loader from '../composables/loader';
import EducationDetails from '../components/EducationDetails.vue';

import EducationAddEditModel from '../components/EducationAddEditModel.vue';

const $toast = useToast();

const EducationTable = ref(null);


const config = reactive({
    isLoading: false,
    noDataFound: false
});

const data = reactive({
    edus: []
});

const OnAdd = () => {
    openModal(EducationAddEditModel, { title: 'Add Education Details' }
    ).then((response) => {
        data.edus.push(response);
        $toast.success("Education detail updated successfully.");
        loader.UnBlockWindow();
        config.noDataFound = false;

    }).catch((error) => {
    });
}

onMounted(async () => {
    try {
        config.isLoading = true;

        const response = await axios.get("/api/education");

        if (response && response.status === 200) {
            const educationData = response.data;
            if (educationData.length > 0) {

                data.edus = response.data;
                config.noDataFound = false;
            } else {
                config.noDataFound = true;
            }
        } else {
            $toast.error(response.data.reason || "Unexpected error", "Error");
        }
    } catch (error) {
        $toast.error("Failed to load education details.", "Error");
        config.noDataFound = true;
    } finally {
        config.isLoading = false;
    }
});



</script>
<style scoped></style>