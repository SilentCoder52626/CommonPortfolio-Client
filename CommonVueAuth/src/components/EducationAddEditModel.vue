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
  university: props.data.university,
  startYear: props.data.startYear,
  endYear: props.data.endYear,
  id: props.data.id,
  address: props.data.address,
  description: props.data.description,
});
const OnSave = async () => {

  if( !data.title || data.title == "" || !data.university || data.university == "" || !data.startYear || data.startYear == "" || !data.address || data.address == "" || !data.description || data.description == "" ){
    $toast.error("Please fill all the required fields.", 'Error');
    return;
  }

  if (data.id) {
    await UpdateEducation();
  } else {
    await AddEducation();
  }
}
async function AddEducation() {
  loader.BlockWindow(null, afterSlot("Please wait.."));
  var response = await axios.post("/api/education/create", JSON.stringify(data));

  if (response && response.status === 200) {
    data.id = response.data.id;
    confirmModal(data);

  } else {
    console.error(response);
    $toast.error(response.data.reason, 'Error');
    loader.UnBlockWindow();
  }

}
async function UpdateEducation() {
  loader.BlockWindow(null, afterSlot("Please wait.."));

  var response = await axios.put("/api/education/update/" + data.id, JSON.stringify(data));

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
    <form ref="EducationForm" class="mt-2">

      <div class="grid grid-cols-1 md:grid-cols-2  gap-4">
        <div class="title">
          <div class="w-full">
            <label class="text-base text-gray-500 font-semibold mb-2 block">Title*</label>
            <input v-model="data.title" type="text" required="required" :disabled="!config.isEditView"
              class="block w-full mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
              placeholder="title">
          </div>
        </div>
        <div class="university">
          <div class="w-full">
            <label class="text-base text-gray-500 font-semibold mb-2 block">University*</label>
            <input v-model="data.university"  required="required" type="text" :disabled="!config.isEditView"
              class="block w-full mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
              placeholder="university">
          </div>
        </div>
        <div class="address">
          <div class="w-full">
            <label class="text-base text-gray-500 font-semibold mb-2 block">Address*</label>
            <input v-model="data.address" type="text" :disabled="!config.isEditView"
              class="block w-full mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
              placeholder="address">
          </div>
        </div>
        <div class="startYear">
          <div class="w-full">
            <label class="text-base text-gray-500 font-semibold mb-2 block">Start Year*</label>
            <input v-model="data.startYear" type="number" max="9999" min="999" :disabled="!config.isEditView"
              class="block w-full mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
              placeholder="start year">
          </div>
        </div>
        <div class="endYear">
          <div class="w-full">
            <label class="text-base text-gray-500 font-semibold mb-2 block">End Year</label>
            <input v-model="data.endYear" type="number" max="9999" min="999" :disabled="!config.isEditView"
              class="block w-full mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
              placeholder="end year">
          </div>
        </div>
        <div class="description">
          <div class="w-full">
            <label class="text-base text-gray-500 font-semibold mb-2 block">Description*</label>
            <textarea v-model="data.description" type="text" :disabled="!config.isEditView"
              class="block w-full mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
              placeholder="description"> </textarea>
          </div>
        </div>
      </div>


    </form>


    <template #footer  v-if="config.isEditView">
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