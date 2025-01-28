<script setup>
import { closeModal, confirmModal } from '@kolirt/vue-modal';
import { defineProps, reactive } from 'vue';
import { useToast } from '../composables/useToast';
import axios from '../plugins/axios';
import loader from '../composables/loader';
import { afterSlot } from '../composables/afterSlot';

const $toast = useToast();
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  data: {
    type: Object,
    required: false,
    default: () => ({}),
  },
  isEditModel: {
    type: Boolean,
    required: false,
    default: true,
  },

});

const config = reactive({
  isEditView: props.isEditModel,
});

const data = reactive({
  title: props.data.title,
  duration: props.data.duration,
  organization: props.data.organization,
  description: props.data.description,
  id: props.data.id,
});
const OnSave = async () => {

  if (!data.title || data.title == "" || !data.duration || data.duration == "" || !data.organization || data.organization == "") {
    $toast.error("Please fill all the required fields.", 'Error');
    return;
  }

  if (data.id) {
    await UpdateExperience();
  } else {
    await AddExperience();
  }
}
async function AddExperience() {
  loader.BlockWindow(null, afterSlot("Please wait.."));
  var response = await axios.post("/api/experience/create", JSON.stringify(data));

  if (response && response.status === 200) {
    data.id = response.data.id;
    confirmModal(data);

  } else {
    console.error(response);
    $toast.error(response.data.reason, 'Error');
    loader.UnBlockWindow();
  }

}
async function UpdateExperience() {
  loader.BlockWindow(null, afterSlot("Please wait.."));

  var response = await axios.put("/api/experience/update/" + data.id, JSON.stringify(data));

  if (response && response.status === 200) {
    confirmModal(data);

  } else {
    console.error(response);
    $toast.error(response.data.reason, 'Error');
    loader.UnBlockWindow();
  }

}
</script>

<template>
  <SimpleModal :title="props.title" size="lg">
    <form ref="ExperienceForm" class="mt-2">

      <div class="grid grid-cols-1 md:grid-cols-2  gap-4">
        <div class="title">
          <div class="w-full">
            <label class="text-base text-gray-500 font-semibold mb-2 block">Title*</label>
            <input v-model="data.title" type="text" required="required" :disabled="!config.isEditView"
              class="block w-full mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
              placeholder="title">
          </div>
        </div>
        <div class="organization">
          <div class="w-full">
            <label class="text-base text-gray-500 font-semibold mb-2 block">Organization*</label>
            <input v-model="data.organization" required="required" type="text" :disabled="!config.isEditView"
              class="block w-full mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
              placeholder="organization">
          </div>
        </div>
        <div class="duration">
          <div class="w-full">
            <label class="text-base text-gray-500 font-semibold mb-2 block">Duration*</label>
            <input v-model="data.duration" type="text" :disabled="!config.isEditView"
              class="block w-full mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
              placeholder="duration">
          </div>
        </div>

      </div>

      <div class="grid grid-cols-1 gap-4 mt-4">
        <div class="description">
          <div class="w-full">
            <label class="text-base text-gray-500 font-semibold mb-2 block">Description*</label>
            
              <MdEditor v-model="data.description" :disabled="!config.isEditView"/>

          </div>
        </div>
      </div>
    </form>


    <template #footer v-if="config.isEditView">
      <button @click="OnSave" class="text-sm text-white bg-green-500 px-3 py-1 rounded-md" title="Edit">
        <fa icon="save" /> Save
      </button>
      <button @click="closeModal()" class="text-sm text-white bg-red-500 px-3 py-1 rounded-md pl-2" title="Cancel">
        <fa icon="times" /> Cancel
      </button>
    </template>
  </SimpleModal>
</template>

<style scoped></style>