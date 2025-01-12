<template>
    <tr class="w-full" ref="AccountLinkRow">
        <td class="border border-gray-300 px-3 py-2 w-1/4">

            <template v-if="config.isEditing || config.isNewEntry">

                <select v-model="data.Name" class="border rounded px-2 py-1 w-full" required>
                    <option v-for="type in linkTypes" :key="type" :value="type">
                        {{ type }}
                    </option>
                </select>
            </template>
            <template v-else>
                {{ link.name }}
            </template>

        </td>
        <td class="border border-gray-300 px-3 py-2 w-1/4">
            <template v-if="config.isEditing || config.isNewEntry">

                <input required v-model="data.Link" class="border rounded px-2 py-1 w-full" />
            </template>
            <template v-else>
                <a :href="link.url" target="_blank">{{ link.url }}</a>
            </template>
        </td>

        <td class="border border-gray-300 px-3 py-2 w-1/4">
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

const AccountLinkRow = ref(null);

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
        AccountLinkRow.value.remove();
    }
}
const OnDelete = async () => {
    loader.BlockWindow(null, afterSlot("Please wait.."));
    confirm("Are you sure you want to delete this account link?") ? DeleteLink() : loader.UnBlockWindow();

}
async function DeleteLink() {
    var response = await axios.delete("/api/account-link/delete/" + data.Id);
    if (response && response.status === 200) {
        $toast.success("Account Links deleted successfully.");
        loader.UnBlockWindow();
        AccountLinkRow.value.remove();
    } else {
        loader.UnBlockWindow();
        console.error(response);
        $toast.error(response.data.reason, 'Error');
    }
}
const data = reactive({
    Name: '',
    Link: '',
    Id: ''
});
const OnSave = async () => {

    loader.BlockWindow(null, afterSlot("Please wait.."));
    if (data.Name === '' || data.Link === '') {
        $toast.error("Please enter all the required fields.", 'Error');
        loader.UnBlockWindow();
        return;
    }
    if (data.Id) {
        await UpdateLink();
    } else {
        console.log("Before SaveLink: isNewEntry =", config.isNewEntry);
        await SaveLink();
        console.log("After SaveLink: isNewEntry =", config.isNewEntry);

    }

}
async function SaveLink() {
    const formData = new FormData();

    formData.append('title', data.Name);
    formData.append('url', data.Link);

    var response = await axios.post("/api/account-link/create/", formData);
    if (response && response.status === 200) {
        $toast.success("Account Links added successfully.");

        data.Id = response.data.id;

        props.link.name = data.Name;
        props.link.url = data.Link;
        props.link.id = data.Id;

        loader.UnBlockWindow();

        config.isEditing = false;
        config.isNewEntry = false;

    } else {
        loader.UnBlockWindow();
        console.error(response);
        $toast.error(response.data.reason, 'Error');
    }
}

async function UpdateLink() {
    const formData = new FormData();

    formData.append('name', data.Name);
    formData.append('url', data.Link);

    var response = await axios.put("/api/account-link/update/" + data.Id, formData);
    if (response && response.status === 200) {
        $toast.success("Account Links updated successfully.");

        props.link.name = data.Name;
        props.link.url = data.Link;

        loader.UnBlockWindow();
        config.isEditing = false;

    } else {
        loader.UnBlockWindow();
        console.error(response);
        $toast.error(response.data.reason, 'Error');
    }
}

onMounted(() => {
    data.Name = props.link.name;
    data.Link = props.link.url;
    data.Id = props.link.id;

    config.isNewEntry = props.isNewEntry;
});

const props = defineProps({
    link: {
        type: Object,
        required: true,
    },
    linkTypes: {
        type: Array,
        required: true,
    },
    isNewEntry: {
        type: Boolean,
        default: false
    }
});

</script>