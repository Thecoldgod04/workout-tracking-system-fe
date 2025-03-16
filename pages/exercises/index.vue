<template>
  <div class="w-full">
    <ListView v-if="tableDataModel !== null"
      listName="Exercises"
      :tableDataModel="tableDataModel"
      :fields="fields"
    />
  </div>
</template>

<script setup>
  import { TableApiModel, TableDataModel } from '@/models/TableModel';
  import { FieldModel } from '~/models/FieldModel';

  const { request } = useApp();

  const url = 'http://localhost:8080/exercises';
  const tableApiModel = new TableApiModel(
    url,
    "pageNumber",
    "pageSize",
    "page.totalElements",
    "content"
  );

  // const headers = [
  //   { headerName: 'ID', field: 'id' },
  //   { headerName: 'Name', field: 'name' },
  //   { headerName: 'Difficulty', field: 'difficulty' },
  // ];

  // const fields = [
  //   new FieldModel('name', 'Name', 'text', true, null, null),
  //   new FieldModel('difficulty', 'Difficulty', 'picklist', true, 'Easy', ['Easy', 'Medium', 'Hard', 'Very Hard']),
  // ];

  // const tableDataModel = new TableDataModel(headers, tableApiModel, null);

  const fields = ref([]);

  const tableDataModel = ref(null);

  // ----------------- Functions -----------------

  onMounted(loadAsyncData);

  async function loadAsyncData() {
    const fieldRequest = await request(
      'GET',
      '/fields',
      [{ key: 'moduleName', value: 'Exercises' }],
      null
    );

    const headers = fieldRequest
      .filter(obj => obj.isHeader === true)
      .map(obj => ({
        headerName: obj.label,
        field: obj.label.toLowerCase()
      }));

    fields.value = fieldRequest
      .filter(obj => obj.fieldType !== 'ID')
      .map((obj) => {

        // TODO: Get any values or initial values here
        let initalValue = undefined;
        let data = undefined;
        if(obj.fieldType === 'PICKLIST') {
          // Hard coding this for now
          initalValue = 'Easy';
          data = ['Easy', 'Medium', 'Hard', 'Very Hard'];
        }

        return new FieldModel(
          obj.label.toLowerCase(), 
          obj.label, 
          obj.fieldType, 
          obj.required, 
          initalValue, 
          data
        );
      });

    tableDataModel.value = new TableDataModel(headers, tableApiModel, null);
  }

</script>

<style>

</style>