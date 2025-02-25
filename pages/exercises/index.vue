<template>
  <div class="w-full">
    <ListView 
      listName="Exercises"
      :tableDataModel="tableDataModel"
    />
  </div>
</template>

<script setup>
  import { TableApiModel, TableDataModel } from '@/models/TableModel';

  // const url = 'https://dummyjson.com/users';
  // const tableApiModel = new TableApiModel(
  //   url,
  //   "limit",
  //   "skip",
  //   "total",
  //   "users"
  // );

  // const headers = [
  //   { headerName: 'ID', field: 'id' },
  //   { headerName: 'First Name', field: 'firstName' },
  //   { headerName: 'Last Name', field: 'lastName' },
  //   { headerName: 'Email', field: 'email' },
  //   { headerName: 'Age', field: 'age' }
  // ];

  const url = 'https://dummyjson.com/c/98fc-86cf-498a-ae12';
  const tableApiModel = new TableApiModel(
    url,
    null,
    null,
    "total",
    "exercises"
  );

  const headers = [
    { headerName: 'ID', field: 'id' },
    { headerName: 'Name', field: 'name' },
    { headerName: 'Difficulty', field: 'difficulty' },
  ]

  // const url = 'https://fakestoreapi.com/products';
  // const tableApiModel = new TableApiModel(
  //   url,
  //   null,
  //   null,
  //   null,
  //   null
  // );

  // const headers = [
  //   { headerName: 'ID', field: 'id' },
  //   { headerName: 'Title', field: 'title' },
  //   { headerName: 'Price', field: 'price' },
  //   { headerName: 'Category', field: 'category' },
  // ]

  const tableDataModel = new TableDataModel(headers, tableApiModel, null);

</script>

<style>

</style>