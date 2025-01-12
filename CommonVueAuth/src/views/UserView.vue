<template>
  <div class="user">
    <div class="rounded overflow-x-hidden shadow-lg p-3">
      <div class="border-b-2 border-indigo-500 pb-3 flex justify-between items-center">
        <h4 class="text-xl font-medium text-gray-700 capitalize mb-0">
          <fa icon="fa fa-users" /> Users
        </h4>
      </div>
      <div class="pt-2"  ref="userTemplate">
        
      <AgGridView :columnDefs="columnDefs.value" :defaultColDef="defaultColDef.value" :rowData="rowData.value"
        :config="extraConfig" />
    </div>
    
  </div>
  </div>
</template>

<script setup>
import { reactive, onMounted, ref } from 'vue';
import AgGridView from '@/components/AgGridView.vue';
import axios from '../plugins/axios';
import loader from '../composables/loader';
import { afterSlot } from '../composables/afterSlot';

const columnDefs = reactive({
  value: [
    { headerName: 'Id', field: 'id' },
    { headerName: 'Name', field: 'name' },
    { headerName: 'Role', field: 'role' },
    { headerName: 'Contact', field: 'contact' },
    { headerName: 'Email', field: 'email' },
  ],
});

const defaultColDef = reactive({
  value: {
    sortable: true,
    filter: true,
    flex: 1,
    minWidth: 100,
    resizable: true,
  },
});

const rowData = reactive({
  value: [],
});

const userTemplate = ref(null);
onMounted(async () => {
  try {
    loader.BlockWindow(userTemplate.value, afterSlot("Loading users..."));

    const response = await axios.get("/api/users");
    if (response.status === 200) {
      const users = response.data;
      rowData.value = users;
      loader.UnBlockWindow();
    } else {
      $toast.error("Something went wrong.", "Error!");
      loader.UnBlockWindow();
    }
  } catch (error) {
    console.error("Error fetching users", error);
  }
});
// Example of extra configuration
const extraConfig = reactive({
  rowHeight: 50,
});
</script>

<style></style>
