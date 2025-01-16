<template>
    <tr class="w-full" ref="HighlightDetailRow">
        <td class="border border-gray-300 px-3 py-2 1/5">
            {{ props.highlight.title }}
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
import HighlightAddEditModel from './HighlightAddEditModel.vue';

const $toast = useToast();

const HighlightDetailRow = ref(null);
const OnView = () => {
    openModal(HighlightAddEditModel, { title: 'View Highlight Details', data: props.highlight, isEditModel : false }
    ).catch((error) => {
    });
}
const OnEdit = () => {

    openModal(HighlightAddEditModel, { title: 'Edit Highlight Details', data: props.highlight, isEditModel : true }
    ).then((data) => {
        props.highlight.title = data.title;
       
        props.highlight.description = data.description;
        
        $toast.success("Highlight Detail updated successfully.");
        loader.UnBlockWindow();
    }).catch((error) => {
    });
}

const OnDelete = async () => {
    loader.BlockWindow(null, afterSlot("Please wait.."));
    confirm("Are you sure you want to delete this Highlight Detail?") ? DeleteHighlight() : loader.UnBlockWindow();

}
async function DeleteHighlight() {
    var response = await axios.delete("/api/highlight/delete/" + props.highlight.id);
    if (response && response.status === 200) {
        $toast.success("Highlight Detail deleted successfully.");
        loader.UnBlockWindow();
        HighlightDetailRow.value.remove();
    } else {
        loader.UnBlockWindow();
        console.error(response);
        $toast.error(response.data.reason, 'Error');
    }
}



const props = defineProps({
    highlight: {
        type: Object,
        required: true,
    }
});

</script>