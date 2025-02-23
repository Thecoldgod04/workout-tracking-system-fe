<script setup>
import { ref } from "vue";
import { AgGridVue } from "ag-grid-vue3";
// import "ag-grid-community/styles/ag-grid.css";
// import "ag-grid-community/styles/ag-theme-alpine.css";

import { themeQuartz, colorSchemeDarkBlue } from 'ag-grid-community';
const theme = themeQuartz.withPart(colorSchemeDarkBlue);

// API Endpoint
const API_URL = "https://dummyjson.com/users";

const gridApi = ref(null);
const columnDefs = ref([
  { field: "id", headerName: "ID", width: 80 },
  { field: "firstName", headerName: "First Name", width: 150 },
  { field: "lastName", headerName: "Last Name", width: 150 },
  { field: "email", headerName: "Email", width: 250 },
  { field: "age", headerName: "Age", width: 100 },
]);

const rowModelType = "infinite";
const pageSize = 10; // Number of records per page

const onGridReady = (params) => {
    gridApi.value = params.api;

    // Set up Infinite Row Model data source
    const dataSource = {
        rowCount: null, // Unknown total row count
        getRows: async (params) => {
            const { startRow, endRow } = params;
            const limit = endRow - startRow;
            const skip = startRow;

            try {
                const response = await fetch(`${API_URL}?limit=${limit}&skip=${skip}`);
                const data = await response.json();

                // Send fetched rows to AG Grid
                params.successCallback(data['users'], data['total']);
            } catch (error) {
                console.error("Error fetching rows:", error);
                params.failCallback();
            }
        },
    };

  // Set the data source for AG Grid
  params.api.setGridOption("datasource", dataSource);
};
</script>

<template>
  <div style="height: 500px; width: 100%">
    <ag-grid-vue
        :columnDefs="columnDefs"
        :rowModelType="rowModelType"
        :pagination="true"
        :paginationPageSize="pageSize"
        :cacheBlockSize="pageSize"
        @grid-ready="onGridReady"
        :theme="theme"
        style="height: 500px;"
    />
  </div>
</template>
