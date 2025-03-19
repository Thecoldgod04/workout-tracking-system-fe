<template>
    <div class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8 text-center">
        <div class="space-y-4">
          <UIcon 
            name="i-heroicons-exclamation-circle" 
            class="mx-auto h-24 w-24 text-red-500"
          />
          
          <h1 class="text-4xl font-bold text-gray-900 dark:text-slate-400">
            {{ error?.statusCode || '404' }}
          </h1>
          
          <h2 class="text-2xl font-semibold text-gray-700 dark:text-slate-500">
            {{ error?.statusMessage || 'Page not found' }}
          </h2>
          
          <p class="mt-2 text-base text-gray-600">
            {{ error?.message || "Sorry, we couldn't find the page you're looking for." }}
          </p>
        </div>
        
        <div class="mt-8">
          <UButton
            color="primary"
            size="lg"
            @click="handleError"
          >
            Back to Home
          </UButton>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  // Get the error from the props
  const props = defineProps({
    error: Object
  })
  
  // Clear the error and return to the home page
  const handleError = () => {
    clearError({ redirect: '/' })
  }
  </script>
  
  <style>
  /* You can add custom styles here if needed */
  </style>