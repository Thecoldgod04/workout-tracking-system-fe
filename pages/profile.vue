<template>
  <div class="w-full h-full">
    <div name="banner" class="h-64 w-full rounded-b-xl bg-cover bg-center bg-[url('https://plus.unsplash.com/premium_photo-1664443577542-06294d3354ff?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]">
    </div>

    <div name="content" class=" flex flex-col pt-5 gap-5 relative">
      <img class=" absolute -top-5 left-10 w-24 h-24 rounded-full outline outline-8 outline-white dark:outline-slate-950" :src="userProfile?.avatarUrl"/>
      
      <div name="username" class="ml-40">
        <span class="self-center text-3xl font-semibold whitespace-nowrap dark:text-white">
          {{ userProfile?.username }}
        </span>

        <UButton label="Edit Profile" icon="i-heroicons-pencil-solid" class="float-end px-6"/>
      </div>

      <UCard name="achievements" class="mt-6">
        <template #header>
          <span class="self-center text-xl whitespace-nowrap dark:text-white">Achievements</span>
        </template>

        <div class="flex gap-6">

          <UPopover v-for="achievement in achievements" mode="hover">
            <UBadge
              :icon="achievement.icon"
              :label="achievement.label"
              :color="achievement.color"
              class="cursor-pointer"/>
            
            <template #panel>
              <div class="p-3">
                <div class="self-center text-lg font-bold whitespace-nowrap dark:text-white">
                  <UIcon :name="achievement.icon"/>
                  {{ achievement.label }}
                </div>
                <UDivider/>
                <div>{{ achievement.description }}</div>
              </div>
            </template>
            
          </UPopover>

        </div>

      </UCard>

      <UCard name="basic-detials" class="mt-6">
        <template #header>
          <span class="self-center text-xl whitespace-nowrap dark:text-white">Basic Details</span>
        </template>

        <div class="flex flex-col gap-6">
          <div>
            <span class="self-center text-md whitespace-nowrap text-slate-500 mr-3">Email</span>
            <span class="self-center text-md font-semibold whitespace-nowrap dark:text-white">{{ userProfile?.email }}</span>
          </div>
  
          <div>
            <span class="self-center text-md whitespace-nowrap text-slate-500 mr-3">Phone</span>
            <!-- <span class="self-center text-md font-semibold whitespace-nowrap dark:text-white">{{ userProfile?.phone }}</span> -->
            <span class="self-center text-md font-semibold whitespace-nowrap dark:text-white">0397350616</span>
            
          </div>
        </div>

      </UCard>

    </div>
  </div>
</template>

<script setup>

  const { request } = useApp();
  const userProfile = ref(null);

  const bannerImgSrc = ref("https://plus.unsplash.com/premium_photo-1664443577542-06294d3354ff?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");

  const achievements = ref([
    {
      icon: 'i-heroicons-fire-solid',
      label: 'First Exercise',
      color: 'primary',
      description: 'Do your first exercise'
    },
    {
      icon: 'i-heroicons-rocket-launch-solid',
      label: 'Go Far',
      color: 'fuchsia',
      description: 'Unlock your 10th exercise'
    },
  ]);

  async function loadUserProfile() {
    userProfile.value = await request('GET', '/user-info', null, null);
  }

  onMounted(loadUserProfile);

</script>

<style>
</style>