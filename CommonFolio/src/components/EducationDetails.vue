<template>
    <tr class="w-full" ref="EducationDetailRow">
        <td class="border border-gray-300 px-3 py-2 1/5">
            {{ props.edu.title }}
        </td>
        <td class="border border-gray-300 px-3 py-2  w-1/5">
            {{ props.edu.university }}
        </td>
        <td class="border border-gray-300 px-3 py-2 w-1/5">
            {{ props.edu.startYear }}
        </td>

        <td class="border border-gray-300 px-3 py-2 w-1/5">
            {{ props.edu.endYear }}
        </td>

        <td class="border border-gray-300 px-3 py-2 w-1/5">
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
import EducationAddEditModel from './EducationAddEditModel.vue';

const $toast = useToast();

const EducationDetailRow = ref(null);
const OnView = () => {
    openModal(EducationAddEditModel, { title: 'View Education Details', data: props.edu, isEditModel : false }
    ).catch((error) => {
    });
}
const OnEdit = () => {

    openModal(EducationAddEditModel, { title: 'Edit Education Details', data: props.edu, isEditModel : true }
    ).then((data) => {
        props.edu.title = data.title;
        props.edu.university = data.university;
        props.edu.address = data.address;
        props.edu.startYear = data.startYear;
        props.edu.endYear = data.endYear;
        props.edu.description = data.description;
        
        $toast.success("Education detail updated successfully.");
        loader.UnBlockWindow();
    }).catch((error) => {
    });
}

const OnDelete = async () => {
    loader.BlockWindow(null, afterSlot("Please wait.."));
    confirm("Are you sure you want to delete this education detail?") ? DeleteEducation() : loader.UnBlockWindow();

}
async function DeleteEducation() {
    var response = await axios.delete("/api/education/delete/" + props.edu.id);
    if (response && response.status === 200) {
        $toast.success("Education detail deleted successfully.");
        loader.UnBlockWindow();
        EducationDetailRow.value.remove();
    } else {
        loader.UnBlockWindow();
        console.error(response);
        $toast.error(response.data.reason, 'Error');
    }
}



const props = defineProps({
    edu: {
        type: Object,
        required: true,
    }
});

</script>