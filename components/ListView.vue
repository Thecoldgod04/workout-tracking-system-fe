<script setup>

  import { TableModel, PagingModel, TableDataModel, TableApiModel } from '@/models/TableModel';

  // All the props for this component
  const props = defineProps({
    listName: String,
    entries: Array,
    tableDataModel: TableDataModel,
    fields: Array,
  });

  const lists = [{
    label: 'All',
  }, {
    label: 'Easy Exercises',
  }, {
    label: 'Outdated Exercises',
  }];

  const selected = ref([]);

  const pagingModel = new PagingModel(20, null);

  const tableModel = new TableModel(props.tableDataModel, pagingModel);
  
  const tableMaxHeight = ref("700px");

  const isModalOpen = ref(false);
  const currentModal = ref("");

  const refreshTable = ref(false);

  const moreActions = [
    [{
      label: 'Edit',
      icon: 'i-heroicons-pencil-square-20-solid',
      click: () => {
        console.log('Edit')
      }
    },],
    [{
      label: 'Import',
      icon: 'i-heroicons-arrow-down-on-square-solid',
      click: () => {
        console.log('Import');
      }
    }, {
      label: 'Export',
      icon: 'i-heroicons-arrow-up-on-square-solid',
      click: () => {
        console.log('Export');
      }
    },]
  ]

  // ------------ Functions ------------

  function onRowClicked(rowData) {
    console.log(rowData);
  }

  function onModalOpen(currModal) {
    isModalOpen.value = true;
    currentModal.value = currModal;
  }
  function onModalClose() {
    isModalOpen.value = false;
  }

  async function onFormSubmit(data) {
    // console.log(data);
    isModalOpen.value = false;
    const url = props.tableDataModel.tableApiModel.url + '/save';

    const toast = useToast();
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }).then(
        toast.add({
          title: 'Success',
          description: 'The record has been saved successfully.',
          icon: 'i-heroicons-check-circle'
        }),
        refreshTable.value = !refreshTable.value
      );
    }
    catch(error) {
      console.log('Error', error);
    }
  }

</script>

<template>
  <div>
    <!-- Modals -->
    <UModal v-model="isModalOpen">
      <div class="p-6 flex justify-center">
        <RecordEditForm v-if="currentModal=='edit'" 
          :fields="fields" formName="Add Record" @submit="onFormSubmit"/>
        <ConfirmationForm v-else-if="currentModal=='confirmation'"
          formName="Are You Sure?" @submit="" @cancel="onModalClose"/>
      </div>
    </UModal>

    <!-- Action Bar -->
    <div id="action-bar" class="flex">
      <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
        {{ listName }}
      </span>

      <div id="actions" class="w-full">
        <ul class="flex float-right gap-3">
          <li>
            <UTooltip text="Create New [...]">
              <UButton icon="i-heroicons-plus" @click="() => onModalOpen('edit')"/>
            </UTooltip>
          </li>
          <li v-if="selected.length > 0">
            <UTooltip text="Remove [...]">
              <UButton icon="i-heroicons-trash" color="red" @click="() => onModalOpen('confirmation')"/>
            </UTooltip>
          </li>
          <li v-else>
            <UTooltip text="Remove [...]">
              <UButton icon="i-heroicons-trash" color="red" variant="soft" disabled/>
            </UTooltip>
          </li>
            <UDropdown :items="moreActions" :popper="{ placement: 'bottom-end' }">
              <UTooltip text="More Actions">
                <UButton label="More Actions" variant="outline" trailing-icon="i-heroicons-chevron-down-20-solid"/>
              </UTooltip>
            </UDropdown>
          <li>

          </li>

        </ul>
      </div>
    </div>

    <div id="list-content" class="flex mt-6 container">
      <div class="w-1/5 mr-3 border-r border-gray-600"> 
        <span class="text-xl font-semibold dark:text-white">Lists</span>
        <UVerticalNavigation :links="lists" class="mt-3"/>
      </div>

      <!-- Table -->
      <div id="table" class="w-full overflow-auto h-1/2">
        <!-- <UInput v-model="currentFilter" placeholder="Filter..." class="w-1/4"/> -->
        <Table
          :onRowClicked="onRowClicked" 
          :maxHeight="tableMaxHeight"
          :tableModel="tableModel"
          v-model="selected"
          :key="refreshTable"
        />
      </div>
    </div>

  </div>
</template>

<style>

</style>