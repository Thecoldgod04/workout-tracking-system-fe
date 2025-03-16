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

  const { request } = useApp();

  const selected = ref([]);

  const pagingModel = new PagingModel(20, null);

  const tableModel = new TableModel(props.tableDataModel, pagingModel);
  
  const tableMaxHeight = ref("700px");

  const isModalOpen = ref(false);
  const currentModal = ref("");

  const refreshTable = ref(false);

  const moreActions = [
    [{
      label: 'Refresh',
      icon: 'i-heroicons-arrow-path-20-solid',
      click: () => {
        refreshTable.value = !refreshTable.value
      }
    }, {
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
  ];

  const customLists = ref([]);

  const toast = useToast();

  // ------------ Functions ------------

  onMounted(loadAsyncData)

  async function loadAsyncData() {
    const customListsRequest = await request(
      'GET',
      '/custom-list',
      [{
        key: 'moduleName',
        value: props.listName
      }],
      null
    );
    customLists.value = customListsRequest.map(obj => ({
      label: obj.label
    }));
  }

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

  async function onEditFormSubmit(data) {
    isModalOpen.value = false;

    await request(
      'POST',
      '/exercises/save',
      null,
      data,
      false
    );
    refreshTable.value = !refreshTable.value;
  }

  async function onRemovalConfirmed() {
    isModalOpen.value = false;
    const selectedIds = [];
    selected.value.forEach(element => {
      selectedIds.push(element.id);
    });

    await request(
      'DELETE', 
      '/exercises/delete',
      null,
      selectedIds,
      false
    );
    refreshTable.value = !refreshTable.value
    selected.value = [];
  }

</script>

<template>
  <div class="mt-3">
    <!-- Modals -->
    <UModal v-model="isModalOpen">
      <div class="p-6 flex justify-center">
        <RecordEditForm v-if="currentModal=='edit'" 
          :fields="fields" formName="Add Record" @submit="onEditFormSubmit"/>
        <ConfirmationForm v-else-if="currentModal=='confirmation'"
          formName="Are You Sure?" @submit="onRemovalConfirmed" @cancel="onModalClose"/>
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
      <!-- <div class="w-1/5 mr-3 border-r border-gray-600 pr-3"> 
        <span class="text-xl font-semibold dark:text-white">Lists</span>
        <UVerticalNavigation :links="customLists" class="mt-3"/>
      </div> -->

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