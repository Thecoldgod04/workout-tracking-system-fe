<script setup>

  const { request } = useApp();

  const router = useRouter();

  const userProfile = ref(null);
  const items = ref([]);
  const links = ref([]);

  onMounted(fetchUserProfile);

  links.value = [{
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
  }];

  async function fetchUserProfile() {
    userProfile.value = await request('GET', '/user-info', null, null);  // Request for the user info data
  
    items.value = [
      [{
        label: 'Profile',
        avatar: {
          src: userProfile.value.avatarUrl
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
        label: 'Logout',
        icon: 'i-heroicons-arrow-left-start-on-rectangle-20-solid',
        click: () => {
          logout();
        }
      }]
    ];
  }

  function logout() {
    const response = request(
      'POST',
      '/auth/logout',
      null,
      null
    );

    if(response) {
      router.push('/login');
    }
  }
</script>

<template>

  <nav class="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700 sticky top-0 z-50">
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
                <!-- <UButton icon="i-heroicons-user-solid" variant="ghost" size="md" trailing-icon="i-heroicons-chevron-down-20-solid"/> -->
                <UButton variant="ghost" size="md" trailing-icon="i-heroicons-chevron-down-20-solid">
                  <UAvatar :src="userProfile?.avatarUrl" size="2xs"/>
                </UButton>
              </UTooltip>
            </UDropdown>
          </li>
        </ul>
      </div>

    </div>
  </nav>

</template>
