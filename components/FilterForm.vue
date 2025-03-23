<template>
    <div class="p-6 font-semibold">Filter</div>
    <UDivider/>
    <div class="h-full overflow-auto px-6 py-3">
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
        </UForm>
    </div>
    <UDivider/>
    <div class="p-6 flex items-center justify-center">
        <UButton @click="onSubmit" icon="i-heroicons-adjustments-vertical-solid" label="Apply"/>
    </div>
</template>
  
<script setup>

    // Defining props
    const props = defineProps({
      fields: Array,
    });

    let reactiveObj = {};
    for (let field of props.fields) {
        reactiveObj[field.name] = field.initialValue;
    }
    
    const state = reactive(reactiveObj);

    const emit = defineEmits([
        'submit',
    ]);

    // ----------------- Functions -----------------
    function onSubmit() {
        console.log(state);
        emit('submit', state);
    }

</script>

<style>

</style>