<template>
    <div class="rounded overflow-x-hidden shadow-lg p-3">
        <div class="border-b-2 border-indigo-500 pb-3 flex justify-between items-center">
            <h4 class="text-xl font-medium text-gray-700 capitalize mb-0">
                <fa icon="list" /> &nbsp; Skill Types
            </h4>
            <button @click="AddSkillType" :class="`text-sm text-white bg-green-500 px-3 py-1 rounded-md`">
                <fa icon="plus" /> Add
            </button>

        </div>
        <div class="mt-2" ref="SkillTypesTable">
            <table class="w-full border-collapse table-auto">
                <thead>
                    <tr>
                        <th class="border border-gray-300 px-3 py-2">Name</th>
                        <th class="border border-gray-300 px-3 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <SkillTypes v-for="skillType in data.skillTypes" :key="skillType.id" :skillType="skillType"
                        v-if="!config.isLoading" :isNewEntry="isNewEntry" />

                    <tr v-if="config.isLoading">
                        <td class="border border-gray-300 px-3 py-2" colspan="3">
                            <div class="flex justify-center items-center">
                                <fa icon="spinner" /> &nbsp; Loading Skill Types...
                            </div>
                        </td>
                    </tr>
                    <tr v-if="config.noDataFound">
                        <td class="border border-gray-300 px-3 py-2" colspan="3">
                            <div class="flex justify-center items-center">
                                <fa icon="exclamation-triangle" /> &nbsp; No Skill Types Found.
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
import SkillTypes from '../components/SkillTypes.vue';

const $toast = useToast();

const SkillTypesTable = ref(null);


const config = reactive({
    isLoading: false,
    noDataFound: false
});

const data = reactive({
    skillTypes: []
});

const isNewEntry = ref(false);
const AddSkillType = () => {
    data.skillTypes.unshift({
        id: '',
        title: ''
    });
    isNewEntry.value = true;
    config.noDataFound = false;

};

onMounted(async () => {
    try {
        config.isLoading = true;
        const response = await axios.get("/api/skill-type");
        if (response && response.status === 200) {
            data.skillTypes = response.data;
            if (data.skillTypes.length === 0) {
                config.noDataFound = true;
            }
        } else {
            $toast.error(response.data.reason, "Error");
        }
    } catch (error) {
        $toast.error("Failed to load skill types.", "Error");
        config.noDataFound = true;

    } finally {
        config.isLoading = false;
    }
});


</script>
<style scoped></style>