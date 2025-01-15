<template>
    <tr class="w-full" ref="SkillTypeRow">
        
        <td class="border border-gray-300 px-3 py-2 w-2/3">
            <template v-if="config.isEditing || config.isNewEntry">

                <input required v-model="data.Title" class="border rounded px-2 py-1 w-full" placeholder="Enter Title" />
            </template>
            <template v-else>
                {{ rawData.Title }}
            </template>
        </td>

        <td class="border border-gray-300 px-3 py-2 w-1/3">
            <input type="hidden" class="link-id" v-model="data.Id" />
            <template v-if="config.isEditing || config.isNewEntry">
                <button @click="OnSave" class="text-sm text-white bg-green-500 px-3 py-1 rounded-md" title="Save">
                    <fa icon="save" /> Save
                </button>
                <button @click="OnCancel" class="text-sm text-white bg-red-500 px-3 py-1 rounded-md ml-2"
                    title="Cancel">
                    <fa icon="times" /> Cancel
                </button>

            </template>
            <template v-else>
                <button @click="OnEdit" :class="`text-sm text-white bg-blue-500 px-3 py-1 rounded-md`" title="Edit">
                    <fa icon="edit" /> Edit
                </button>
                <button @click="OnDelete" class="text-sm text-white bg-red-500 px-3 py-1 rounded-md ml-2"
                    title="Delete">
                    <fa icon="trash" /> Delete
                </button>
            </template>

        </td>
    </tr>
</template>

<script setup>

import { defineProps, reactive, onMounted, ref } from 'vue';

import axios from '../plugins/axios';
import loader from '../composables/loader';
import { useToast } from '../composables/useToast';
import { afterSlot } from '../composables/afterSlot';

const $toast = useToast();

const SkillTypeRow = ref(null);

const config = reactive({
    isEditing: false,
    isNewEntry: false
});
const OnEdit = () => {
    config.isEditing = true;
}
const OnCancel = () => {
    config.isEditing = false;
    if (config.isNewEntry) {
        SkillTypeRow.value.remove();
    }
    data.Name = rawData.Name;
    data.Link = rawData.Link;
}
const OnDelete = async () => {
    loader.BlockWindow(null, afterSlot("Please wait.."));
    confirm("Are you sure you want to delete this skill type?") ? DeleteLink() : loader.UnBlockWindow();

}
async function DeleteLink() {
    var response = await axios.delete("/api/skill-type/delete/" + data.Id);
    if (response && response.status === 200) {
        $toast.success("Skill Type deleted successfully.");
        loader.UnBlockWindow();
        SkillTypeRow.value.remove();
    } else {
        loader.UnBlockWindow();
        console.error(response);
        $toast.error(response.data.reason, 'Error');
    }
}
const data = reactive({
    Title: '',
    Id: ''
});
const rawData = reactive({
    Title: '',
    Id: ''
});
const OnSave = async () => {

    loader.BlockWindow(null, afterSlot("Please wait.."));
    if (data.Title === '' ) {
        $toast.error("Please enter all the required fields.", 'Error');
        loader.UnBlockWindow();
        return;
    }
    if (data.Id) {
        await UpdateLink();
    } else {
        await SaveLink();

    }

}
async function SaveLink() {
    const formData = new FormData();

    formData.append('title', data.Title);

    var response = await axios.post("/api/skill-type/create/", formData);
    if (response && response.status === 200) {
        $toast.success("Skill Types added successfully.");

        data.Id = response.data.id;

        loader.UnBlockWindow();

        config.isEditing = false;
        config.isNewEntry = false;

        rawData.Title = data.Title;
        rawData.Id = data.Id;
    } else {
        loader.UnBlockWindow();
        console.error(response);
        $toast.error(response.data.reason, 'Error');
    }
}

async function UpdateLink() {
    const formData = new FormData();

    formData.append('title', data.Title);

    var response = await axios.put("/api/skill-type/update/" + data.Id, formData);
    if (response && response.status === 200) {
        $toast.success("Skill Type updated successfully.");

        
        rawData.Title = data.Title;

        loader.UnBlockWindow();
        config.isEditing = false;

    } else {
        loader.UnBlockWindow();
        console.error(response);
        $toast.error(response.data.reason, 'Error');
    }
}

onMounted(() => {
    data.Title = props.skillType.title;
    data.Id = props.skillType.id;

    rawData.Title = props.skillType.title;
    rawData.Id = props.skillType.id;

    config.isNewEntry = props.isNewEntry;
});

const props = defineProps({
    skillType: {
        type: Object,
        required: true,
    },
    isNewEntry: {
        type: Boolean,
        default: false
    }
});

</script>