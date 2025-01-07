<template>
  <div class="user" ref="userTemplate">
    <AgGridView
      :columnDefs="columnDefs.value"
      :defaultColDef="defaultColDef.value"
      :rowData="rowData.value"
      :config="extraConfig"
    />
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
