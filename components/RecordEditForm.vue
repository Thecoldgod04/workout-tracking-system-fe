<template>
  <div class="w-full">
    <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
      {{ formName }}
    </span>
    <UForm class="space-y-4 mt-6" :state="state" @submit="onSubmit">
      <UFormGroup v-for="field in fields" :label="field.label" :name="field.name">
        <UInput 
          v-if="field.type!='PICKLIST' && 
                field.type!='TEXTAREA' && 
                field.type!='DATE' && 
                field.type!='TIME' && 
                field.type!='DATETIME'" 
          :type="field.type" v-model="state[field.name]"/>
        <USelectMenu 
          v-else-if="field.type=='PICKLIST'" 
          :options="field.data" v-model="state[field.name]"/>
      </UFormGroup>

      <UDivider class="pt-3 pb-3" label="Finally"/>

      <div class="flex justify-center">
        <UButton type="submit" class="px-5 mb-3">Submit</UButton>
      </div>
    </UForm>
  </div>
</template>

<script setup>
  import { ref, reactive } from 'vue';

  const props = defineProps({
    formName: String,
    fields: Array,
  });

  const emit = defineEmits([
    'submit',
  ]);

  let reactiveObj = {};
  for (let field of props.fields) {
    reactiveObj[field.name] = field.initialValue;
  }
  
  const state = reactive(reactiveObj);

  function onSubmit() {
    emit('submit', state);
  }

</script>

<style>

</style>