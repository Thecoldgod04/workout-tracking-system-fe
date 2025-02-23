<template>
  <div class="w-full">
    <ListView 
      listName="Exercises" 
      :entries="entries"
      :tableDataModel="tableDataModel"
    />
  </div>
</template>

<script setup>
import { TableApiModel, TableDataModel } from '@/models/TableModel';


  const url = 'https://dummyjson.com/users';
  // const {data, error} = await useFetch(url);
  // const entries = toRaw(data.value.users);
  // console.log(toRaw(data.value.users)[0]);

  // const url = 'https://dummyjson.com/users';
  const tableApiModel = new TableApiModel(
    url,
    "limit",
    "skip",
    "total",
    "users"
  );

  const headers = [
    { headerName: 'ID', field: 'id' },
    { headerName: 'First Name', field: 'firstName' },
    { headerName: 'Last Name', field: 'lastName' },
    { headerName: 'Email', field: 'email' },
    { headerName: 'Age', field: 'age' }
  ];

  const tableDataModel = new TableDataModel(headers, tableApiModel, null);

</script>

<style>

</style>