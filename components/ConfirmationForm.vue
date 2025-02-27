<template>
    <div>
        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            {{ formName }}
        </span>

        <UForm class="space-y-4 mt-6" :state="state" @submit="onSubmit">
            <div class="flex gap-3">
                <UButton type="submit" label="Yes" class="px-6"/>
                <UButton label="No" color="red" @click="onCancel" class="px-6"/>
            </div>
        </UForm>
    </div>
</template>

<script setup>
    import { ref, reactive } from 'vue';

    const emit = defineEmits([
        'submit',
        'cancel'
    ])

    const props = defineProps({
        formName: String,
    });

    const state = reactive({});

    function onSubmit() {
        emit('submit', state);
    }
    function onCancel() {
        emit('cancel');
    }
</script>

<style>
</style>