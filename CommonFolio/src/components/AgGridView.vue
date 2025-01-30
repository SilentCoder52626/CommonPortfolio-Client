<template>
    <ag-grid-vue class="ag-theme-alpine" :style="{ height: gridHeight }" :columnDefs="columnDefs" :rowData="rowData"
        :defaultColDef="defaultColDef" :rowSelection="rowSelection" :pagination="pagination" :paginationAutoPageSize="paginationAutoPageSize" :suppressNoRowsOverlay ="true" v-bind="config"  />

</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    columnDefs: {
        type: Array,
        required: true,
    },
    defaultColDef: {
        type: Object,
        required: true,
    },
    rowData: {
        type: Array,
        required: true, // Expecting the parent to provide the data
    },
    rowSelection: {
        type: Object,
        default: () => ({ mode: 'multiRow' }), // Default to single selection
    },
    gridHeight: {
        type: String,
        default: 'calc(100dvh - 260px)', // Default height
    },
    pagination: {
        type: Boolean,
        default: true,
    },
    paginationAutoPageSize: {
        type: Boolean,
        default: true,
    },
    config: {
        type: Object,
        default: null, // Optional parameter for additional configuration
    },
});
</script>

<style scoped>
/* Add any specific styles for the grid component */
</style>