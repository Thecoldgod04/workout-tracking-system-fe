<template>
    <div style="height: 500px;">
        <ag-grid-vue
            :rowData="rowData"
            :columnDefs="columnDefs"
            :defaultColDef="defaultColDef"
            :style='{
                height: maxHeight,
            }'
            :theme="theme"
            :rowModelType="rowModelType"
            :pagination="tableModel.pagingModel != null"
            :paginationPageSize="pageSize"
            :cacheBlockSize="pageSize"
            @grid-ready="onGridReady"
            >
        </ag-grid-vue>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import { AgGridVue } from 'ag-grid-vue3';
    import { themeQuartz, colorSchemeDarkBlue } from 'ag-grid-community';
    import { TableModel, PagingModel } from '~/models/TableModel';
    
    const theme = themeQuartz.withPart(colorSchemeDarkBlue).withParams({
        // Override any theme parameters here
    });

    const defaultColDef = ref({
        flex: 1,  // Makes columns fill the width evenly
        minWidth: 100,
        filter: true,
    });

    const props = defineProps({
        rows: Array,
        onRowClicked: Function,
        maxHeight: String,
        maxWidth: String,
        tableModel: TableModel,
    });
    

    const pageSize = ref(props.tableModel.pagingModel.pageSize);

    const rowModelType = "infinite";

    const columnDefs = ref(props.tableModel.tableDataModel.headers);

    const gridApi = ref(null);
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
                    const response = await fetch(`${props.tableModel.tableDataModel.tableApiModel.url}?limit=${limit}&skip=${skip}`);
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

    // const columnDefs = ref([
    //     { headerName: 'Make', field: 'make' },
    //     { headerName: 'Model', field: 'model' },
    //     { headerName: 'Price', field: 'price' }
    // ]);

    // const rowData = ref([
    //     { make: 'Toyota', model: 'Corolla', price: 35000 },
    //     { make: 'Ford', model: 'Fiesta', price: 32000 },
    //     { make: 'Tesla', model: 'Model 3', price: 60000 },
    //     { make: 'Chevrolet', model: 'Camaro', price: 45000 },
    //     { make: 'Volkswagen', model: 'Golf', price: 32000 },
    //     { make: 'Honda', model: 'Civic', price: 30000 },
    //     { make: 'BMW', model: 'M3', price: 70000 },
    //     { make: 'Audi', model: 'A4', price: 45000 },
    //     { make: 'Mercedes', model: 'C-Class', price: 60000 },
    //     { make: 'Jaguar', model: 'F-Type', price: 90000 },
    //     { make: 'Porsche', model: '911', price: 120000 },
    //     { make: 'Mazda', model: 'MX-5', price: 30000 },
    //     { make: 'Subaru', model: 'WRX', price: 35000 },
    //     { make: 'Kia', model: 'Stinger', price: 40000 },
    //     { make: 'Hyundai', model: 'i30', price: 25000 },
    //     { make: 'Peugeot', model: '308', price: 27000 },
    //     { make: 'Renault', model: 'Clio', price: 20000 },
    //     { make: 'Fiat', model: '500', price: 15000 },
    //     { make: 'Alfa Romeo', model: 'Giulia', price: 45000 },
    //     { make: 'Citroen', model: 'C3', price: 21000 },
    //     { make: 'Dacia', model: 'Sandero', price: 12000 },
    //     { make: 'Suzuki', model: 'Swift', price: 18000 },
    //     { make: 'Seat', model: 'Ibiza', price: 20000 },
    //     { make: 'Skoda', model: 'Octavia', price: 25000 },
    //     { make: 'Volvo', model: 'XC60', price: 50000 },
    //     { make: 'Land Rover', model: 'Discovery', price: 80000 },
    //     { make: 'Jeep', model: 'Wrangler', price: 45000 },
    //     { make: 'Mitsubishi', model: 'Outlander', price: 35000 },
    //     { make: 'Nissan', model: 'Qashqai', price: 30000 },
    //     { make: 'Peugeot', model: '3008', price: 32000 },
    //     { make: 'Renault', model: 'Kadjar', price: 30000 },
    //     { make: 'Skoda', model: 'Kodiaq', price: 40000 },
    //     { make: 'Volkswagen', model: 'Tiguan', price: 35000 },
    //     { make: 'Volvo', model: 'XC90', price: 60000 },
    // ]);

</script>

<style>
    /* .ag-root-wrapper {
        border-radius: 5px;
    } */
</style>