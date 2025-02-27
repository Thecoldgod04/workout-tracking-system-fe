<template>
  <div class="w-full">
    <ListView 
      listName="Exercises"
      :tableDataModel="tableDataModel"
      :fields="fields"
    />
  </div>
</template>

<script setup>
  import { TableApiModel, TableDataModel } from '@/models/TableModel';
import { FieldModel } from '~/models/FieldModel';

  const url = 'http://localhost:8080/exercises';
  const tableApiModel = new TableApiModel(
    url,
    "pageNumber",
    "pageSize",
    "page.totalElements",
    "content"
  );

  const headers = [
    { headerName: 'ID', field: 'id' },
    { headerName: 'Name', field: 'name' },
    { headerName: 'Difficulty', field: 'difficulty' },
  ];

  const fields = [
    new FieldModel('name', 'Name', 'text', true, null, null),
    new FieldModel('difficulty', 'Difficulty', 'picklist', true, 'Easy', ['Easy', 'Medium', 'Hard', 'Very Hard']),
  ];

  const tableDataModel = new TableDataModel(headers, tableApiModel, null);

</script>

<style>

</style>