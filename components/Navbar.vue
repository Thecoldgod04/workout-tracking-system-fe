<script setup>
  const links = [{
    label: 'Home',
    icon: 'i-heroicons-home-solid',
    to: '/'
  }, {
    label: 'Exercises',
    icon: 'i-heroicons-fire-solid',
    to: '/exercises'
  }, {
    label: 'About',
    icon: 'i-heroicons-information-circle-solid',
    to: '/about'
  }]

  const items = [
    [{
      label: 'Profile',
      avatar: {
        src: 'https://avatars.githubusercontent.com/u/739984?v=4'
      }
    }], [{
      label: 'Edit',
      icon: 'i-heroicons-pencil-square-20-solid',
      shortcuts: ['E'],
      click: () => {
        console.log('Edit')
      }
    }, {
      label: 'Duplicate',
      icon: 'i-heroicons-document-duplicate-20-solid',
      shortcuts: ['D'],
      disabled: true
    }], [{
      label: 'Archive',
      icon: 'i-heroicons-archive-box-20-solid'
    }, {
      label: 'Move',
      icon: 'i-heroicons-arrow-right-circle-20-solid'
    }], [{
      label: 'Delete',
      icon: 'i-heroicons-trash-20-solid',
      shortcuts: ['⌘', 'D']
    }]
  ]
</script>

<template>

  <nav class="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      
      <!-- Passing values into the props -->
      <Logo logo="https://flowbite.com/docs/images/logo.svg" appName="WTS"/>

      <div class="">
        <ul class="flex gap-4">
          <li v-for="link in links" :key="link.label">
            <UTooltip :text="link.label">
              <UButton :to="link.to" :icon="link.icon" variant="ghost" size="md"/>
            </UTooltip>
          </li>
          <li>
            <UDropdown :items="items" :popper="{ placement: 'bottom-end' }">
              <UTooltip text="Profile">
                <UButton icon="i-heroicons-user-solid" variant="ghost" size="md" trailing-icon="i-heroicons-chevron-down-20-solid"/>
              </UTooltip>
            </UDropdown>
          </li>
        </ul>
      </div>

    </div>
  </nav>

</template>
