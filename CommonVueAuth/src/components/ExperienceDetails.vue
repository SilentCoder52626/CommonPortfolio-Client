<template>
    <tr class="w-full" ref="ExperienceDetailRow">
        <td class="border border-gray-300 px-3 py-2 1/4">
            {{ props.experience.title }}
        </td>
        <td class="border border-gray-300 px-3 py-2  w-1/4">
            {{ props.experience.organization }}
        </td>
        <td class="border border-gray-300 px-3 py-2 w-1/4">
            {{ props.experience.duration }}
        </td>


        <td class="border border-gray-300 px-3 py-2 w-1/4">
            <button @click="OnView" class="text-sm text-white bg-orange-500 px-3 py-1 rounded-md" title="View Details">
                <fa icon="eye" />
            </button>
            <button @click="OnEdit" class="text-sm text-white bg-blue-500 px-3 py-1 rounded-md ml-2" title="Edit">
                <fa icon="edit" />
            </button>
            <button @click="OnDelete" class="text-sm text-white bg-red-500 px-3 py-1 rounded-md ml-2" title="Delete">
                <fa icon="trash" />
            </button>

        </td>
    </tr>
</template>

<script setup>

import { openModal } from '@kolirt/vue-modal'
import { defineProps, ref } from 'vue';

import axios from '../plugins/axios';
import loader from '../composables/loader';
import { useToast } from '../composables/useToast';
import { afterSlot } from '../composables/afterSlot';
import ExperienceAddEditModel from './ExperienceAddEditModel.vue';

const $toast = useToast();

const ExperienceDetailRow = ref(null);
const OnView = () => {
    openModal(ExperienceAddEditModel, { title: 'View Experience Details', data: props.experience, isEditModel : false }
    ).catch((error) => {
    });
}
const OnEdit = () => {

    openModal(ExperienceAddEditModel, { title: 'Edit Experience Details', data: props.experience, isEditModel : true }
    ).then((data) => {
        props.experience.title = data.title;
        props.experience.organization = data.organization;
        props.experience.duration = data.duration;
        props.experience.description = data.description;
        
        $toast.success("Experience detail updated successfully.");
        loader.UnBlockWindow();
    }).catch((error) => {
    });
}

const OnDelete = async () => {
    loader.BlockWindow(null, afterSlot("Please wait.."));
    confirm("Are you sure you want to delete this experience detail?") ? DeleteExperience() : loader.UnBlockWindow();

}
async function DeleteExperience() {
    var response = await axios.delete("/api/experience/delete/" + props.experience.id);
    if (response && response.status === 200) {
        $toast.success("Experience detail deleted successfully.");
        loader.UnBlockWindow();
        ExperienceDetailRow.value.remove();
    } else {
        loader.UnBlockWindow();
        console.error(response);
        $toast.error(response.data.reason, 'Error');
    }
}



const props = defineProps({
    experience: {
        type: Object,
        required: true,
    }
});

</script>