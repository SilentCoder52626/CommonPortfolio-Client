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
            <input type="hidden" class="edu-id" v-model="props.edu.id" /> 
                <button @click="OnEdit" class="text-sm text-white bg-blue-500 px-3 py-1 rounded-md" title="Edit">
                    <fa icon="edit" /> Edit
                </button>
                <button @click="OnDelete" class="text-sm text-white bg-red-500 px-3 py-1 rounded-md ml-2"
                    title="Delete">
                    <fa icon="trash" /> Delete
                </button>

        </td>
    </tr>
</template>

<script setup>

import { defineProps, ref } from 'vue';

import axios from '../plugins/axios';
import loader from '../composables/loader';
import { useToast } from '../composables/useToast';
import { afterSlot } from '../composables/afterSlot';

const $toast = useToast();

const EducationDetailRow = ref(null);

const OnEdit = () => {
    //show  popup edit mode
    console.log("Edit clicked");
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