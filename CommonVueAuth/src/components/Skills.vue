<template>
    <tr class="w-full" ref="SkillRow">
        <td class="border border-gray-300 px-3 py-2 w-1/4">

            <template v-if="config.isEditing || config.isNewEntry">

                <select v-model="data.SkillTypeId" class="border rounded px-2 py-1 w-full" required>
                    <option v-for="type in skillTypes" :key="type.id" :value="type.id">
                        {{ type.title }}
                    </option>
                </select>
            </template>
            <template v-else>
                {{ GetSkillTypeTitle(rawData.SkillTypeId) }}
            </template>

        </td>
        <td class="border border-gray-300 px-3 py-2 w-1/4">
            <template v-if="config.isEditing || config.isNewEntry">

                <input required v-model="data.Title" class="border rounded px-2 py-1 w-full"
                    placeholder="Enter Title" />
            </template>
            <template v-else>
                {{ rawData.Title }}
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

const SkillRow = ref(null);

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
        SkillRow.value.remove();
    }
    data.Title = rawData.Title;
    data.SkillTypeId = rawData.SkillTypeId;
}
const OnDelete = async () => {
    loader.BlockWindow(null, afterSlot("Please wait.."));
    confirm("Are you sure you want to delete this skill?") ? DeleteLink() : loader.UnBlockWindow();

}
async function DeleteLink() {
    var response = await axios.delete("/api/skill/delete/" + data.Id);
    if (response && response.status === 200) {
        $toast.success("Skill deleted successfully.");
        loader.UnBlockWindow();
        SkillRow.value.remove();
    } else {
        loader.UnBlockWindow();
        console.error(response);
        $toast.error(response.data.reason, 'Error');
    }
}
const data = reactive({
    SkillTypeId: '',
    Title: '',
    Id: ''
});
const rawData = reactive({
    SkillTypeId: '',
    Title: '',
    Id: ''
});
const OnSave = async () => {

    loader.BlockWindow(null, afterSlot("Please wait.."));
    if (data.Title === '' || data.SkillTypeId === '') {
        $toast.error("Please enter all the required fields.", 'Error');
        loader.UnBlockWindow();
        return;
    }
    if (data.Id) {
        await UpdateSkill();
    } else {
        await SaveSkill();

    }

}
async function SaveSkill() {
    const formData = new FormData();

    formData.append('title', data.Title);
    formData.append('skillTypeId', data.SkillTypeId);

    var response = await axios.post("/api/skill/create/", formData);
    if (response && response.status === 200) {
        $toast.success("Skill added successfully.");

        data.Id = response.data.id;

        loader.UnBlockWindow();

        config.isEditing = false;
        config.isNewEntry = false;

        rawData.Title = data.Title;
        rawData.SkillTypeId = data.SkillTypeId;
        rawData.Id = data.Id;
    } else {
        loader.UnBlockWindow();
        console.error(response);
        $toast.error(response.data.reason, 'Error');
    }
}

async function UpdateSkill() {
    const formData = new FormData();

    formData.append('title', data.Title);
    formData.append('skillTypeId', data.SkillTypeId);

    var response = await axios.put("/api/skill/update/" + data.Id, formData);
    if (response && response.status === 200) {
        $toast.success("Skill updated successfully.");


        rawData.Title = data.Title;
        rawData.SkillTypeId = data.SkillTypeId;

        loader.UnBlockWindow();
        config.isEditing = false;

    } else {
        loader.UnBlockWindow();
        console.error(response);
        $toast.error(response.data.reason, 'Error');
    }
}
function GetSkillTypeTitle(id) {
    const skill = props.skillTypes.find((type) => type.id === id);
    return skill ? skill.title : "";
}
onMounted(() => {
    data.Title = props.skill.title;
    data.SkillTypeId = props.skill.skillTypeId;
    data.Id = props.skill.id;

    rawData.Title = props.skill.title;
    rawData.SkillTypeId = props.skill.skillTypeId;
    rawData.Id = props.skill.id;

    config.isNewEntry = props.isNewEntry;
});

const props = defineProps({
    skill: {
        type: Object,
        required: true,
    },
    skillTypes: {
        type: Array,
        required: true,
    },
    isNewEntry: {
        type: Boolean,
        default: false
    }
});

</script>