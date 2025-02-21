<script setup>

  // All the props for this component
  const props = defineProps([
    "listName",
    "entries"
  ]);

  const {
    // entries,
    lists,
    selected,
    page,
    pageCount,
    currentFilter,
    clickRow,
    paged,
    filtered
  } = useListView(props.entries);
</script>

<template>
  <div>
    <!-- Action Bar -->
    <div id="action-bar" class="flex">
      <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
        {{ listName }}
      </span>

      <div id="actions" class="w-full">
        <ul class="flex float-right gap-3">
          <li>
            <UTooltip text="Create New [...]">
              <UButton icon="i-heroicons-plus"/>
            </UTooltip>
          </li>
          <li v-if="selected.length > 0">
            <UTooltip text="Remove [...]">
              <UButton icon="i-heroicons-trash" color="red"/>
            </UTooltip>
          </li>
          <li v-else>
            <UTooltip text="Remove [...]">
              <UButton icon="i-heroicons-trash" color="red" variant="soft" disabled/>
            </UTooltip>
          </li>
        </ul>
      </div>
    </div>

    <div id="list-content" class="flex mt-6 container">
      <div class="w-1/5 mr-3">
        <UVerticalNavigation :links="lists"/>
      </div>

      <!-- Table -->
      <div id="table" class="w-full overflow-auto h-1/2">
        <UInput v-model="currentFilter" placeholder="Filter..." class="w-1/4"/>
        <UTable v-model="selected" :rows="paged" @select="clickRow" class=""/>
        <div class="flex justify-end mt-3">
          <UPagination v-model="page" :page-count="pageCount" :total="entries.length" />
        </div>
      </div>
    </div>

  </div>
</template>

<style>

</style>