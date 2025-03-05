<template>
    <div class="min-h-screen flex flex-col items-center justify-center p-4">
      <div class="text-center mb-8">
        <UIcon name="i-heroicons-fire-solid" class="text-primary text-5xl mb-4" />
        <h1 class="text-4xl font-bold mb-2">Welcome to WTS</h1>
        <p class="text-gray-500 max-w-md mx-auto">
            Track your workout progress with WTS &#x1F631;
        </p>
      </div>
      
      <UButton 
        size="lg" 
        color="primary" 
        @click="isOpen = true">
        Sign in to your account
      </UButton>
      
      <UModal v-model="isOpen" :ui="{ width: 'sm:max-w-md' }">
        <UCard>
          <template #header>
            <div class="flex justify-between items-center">
              <h3 class="text-xl font-semibold">Sign in</h3>
              <UButton 
                color="gray" 
                variant="ghost" 
                icon="i-heroicons-x-mark" 
                class="-my-1" 
                @click="isOpen = false" 
              />
            </div>
          </template>
          
          <UForm>
            <UFormGroup label="Email" name="email">
              <UInput 
                type="email" 
                placeholder="your@email.com" 
                icon="i-heroicons-envelope" 
                autocomplete="email"/>
            </UFormGroup>
  
            <UFormGroup label="Password" name="password" class="mt-4">
              <UInput 
                type="password" 
                placeholder="••••••••" 
                icon="i-heroicons-lock-closed" 
                autocomplete="current-password"/>
            </UFormGroup>
  
            <div class="flex items-center justify-between mt-4">
              <UCheckbox label="Remember me" name="remember" />
              <UButton variant="link" color="primary" to="#">
                Forgot password?
              </UButton>
            </div>
          </UForm>
          
          <template #footer>
            <div class="flex flex-col gap-3 w-full">
              <UButton 
                type="submit" 
                block 
                color="primary">
                Sign in
              </UButton>
              
              <UDivider label="or continue with" />
              
              <div class="grid grid-cols-2 gap-3">
                <UButton
                  variant="soft" 
                  icon="i-heroicons-academic-cap">
                  Google
                </UButton>
                <UButton
                  variant="soft" 
                  icon="i-heroicons-cube">
                  GitHub
                </UButton>
              </div>
              
              <div class="text-center mt-2">
                <p class="text-sm text-gray-500">
                  Don't have an account?
                  <UButton variant="link" color="primary" to="#" size="xs">
                    Sign up
                  </UButton>
                </p>
              </div>
            </div>
          </template>
        </UCard>
      </UModal>
    </div>
  </template>
  
  <script setup>
    definePageMeta({
        layout: 'blank'
    })

    const isOpen = ref(false)
  </script>

<style>
    input[type="checkbox"] {
        cursor: pointer;
    }
</style>