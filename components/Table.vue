<template>
    <div>
        <ag-grid-vue
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
            :rowSelection="rowSelection"
            :selectionColumnDef="checkboxColumn"
            @selection-changed="onSelectionChanged"
            @grid-ready="onGridReady"
            >
        </ag-grid-vue>
    </div>
</template>

<script setup>
    import { ref, defineEmits } from 'vue';
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

    const emit = defineEmits([
        'rowClicked',
        'rowSelected',
    ]);
    

    const pageSize = ref(props.tableModel.pagingModel.pageSize);

    const rowModelType = "infinite";

    const gridApi = ref(null);

    // Custom checkbox column (manual "Select All" workaround)
    import CustomSelectionHeader from '~/components/CustomSelectionHeader.vue';
    import CustomSelectionRow from '~/components/CustomSelectionRow.vue';

    const rowSelection = {
        mode: "multiRow",
        checkboxes: false,

    };

    const isAllSelected = ref(false);

    const selectedRows = defineModel();

    const checkboxColumn = {
        width: 70,
        headerComponent: CustomSelectionHeader,
        cellRenderer: CustomSelectionRow,
        suppressMovable: true,
        headerComponentParams: {
            onClicked: () => toggleSelectAll(),
            isAllSelected: isAllSelected,
        },
        cellRendererParams: {
        },
    };

    const columnDefs = ref(props.tableModel.tableDataModel.headers);

    // ------- Functions -------
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
                    let fullUrl = props.tableModel.tableDataModel.tableApiModel.url + '?';

                    if(props.tableModel.tableDataModel.tableApiModel.limitKeyword) {
                        fullUrl += props.tableModel.tableDataModel.tableApiModel.limitKeyword + '=' + limit;
                    }
                    if(props.tableModel.tableDataModel.tableApiModel.offsetKeyword) {
                        fullUrl += '&' + props.tableModel.tableDataModel.tableApiModel.offsetKeyword + '=' + skip;
                    }
                    // const response = await fetch(`${props.tableModel.tableDataModel.tableApiModel.url}?limit=${limit}&skip=${skip}`);
                    const response = await fetch(fullUrl);
                    const data = await response.json();

                    // Send fetched rows to AG Grid
                    if(Array.isArray(data)) {
                        params.successCallback(data, data.length);
                    }
                    else {
                        params.successCallback(data[props.tableModel.tableDataModel.tableApiModel.dataKeyword], data[props.tableModel.tableDataModel.tableApiModel.totalKeyword]);
                    }
                } catch (error) {
                    console.error("Error fetching rows:", error);
                    params.failCallback();
                }
            },
        };

        // Set the data source for AG Grid
        params.api.setGridOption("datasource", dataSource);
    };

    // Select or Deselect all loaded rows manually
    const toggleSelectAll = () => {
        if (!gridApi.value) return;

        isAllSelected.value = !isAllSelected.value;
        
        gridApi.value.forEachNode((node) => {
            node.setSelected(isAllSelected.value);
        });
    };

    const onSelectionChanged = () => {
        if(!gridApi.value) return;
        selectedRows.value = gridApi.value.getSelectedRows();
        emit('rowSelected', selectedRows);
    };

</script>
    
<style>
    input[type="checkbox"] {
        cursor: pointer;
    }
</style>