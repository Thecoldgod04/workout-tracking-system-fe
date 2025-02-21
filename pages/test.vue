<template>
  <UTable 
    :rows="paginatedRows" 
    :columns="columns"
    :ui="{
      wrapper: 'max-h-[100px] overflow-y-auto',
      thead: 'sticky top-0 bg-white dark:bg-gray-800',
    }"
  />
  <UPagination v-model="page" :total="totalItems" :page-count="pageSize" />


</template>

<script setup>

const columns = ref([
  { key: "id", label: "ID" },
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
]);

const allRows = ref([
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" },
  { id: 3, name: "Charlie", email: "charlie@example.com" },
  { id: 4, name: "David", email: "david@example.com" },
  { id: 5, name: "Eve", email: "eve@example.com" },
  { id: 6, name: "Frank", email: "frank@example.com" },
]);

const page = ref(1);
const pageSize = 3; // Number of rows per page

const totalItems = computed(() => allRows.value.length);

const paginatedRows = computed(() => {
  const start = (page.value - 1) * pageSize;
  return allRows.value.slice(start, start + pageSize);
});
</script>
