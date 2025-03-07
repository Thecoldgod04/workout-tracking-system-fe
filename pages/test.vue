<script setup>
const user = reactive({
  name: 'Jesselyn Wang',
  title: 'Lead Product Designer at Apple',
  location: 'Seoul, South Korea',
  followers: 6476,
  connections: '500+',
  avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRWb_N3YRLlE9bGxlSAJlB9shvF15V7KRwOw&s', // Replace with your actual avatar path
  banner: 'bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500'
})

const companies = [
  { name: 'Apple', logo: 'i-heroicons-apple-logo' },
  { name: 'Kretya Studio', logo: 'i-heroicons-square-3-stack-3d' }
]

const peopleAlsoViewed = [
  { 
    name: 'Amanda Reyes', 
    title: 'Marketing Manager at Alibaba Group', 
    avatar: '/placeholder.svg?height=40&width=40' 
  },
  { 
    name: 'Han Ryujin', 
    title: 'CTO at Google', 
    avatar: '/placeholder.svg?height=40&width=40' 
  },
  { 
    name: 'Paul Arriola', 
    title: 'Lead Engineer at Tesla', 
    avatar: '/placeholder.svg?height=40&width=40' 
  },
  { 
    name: 'Tafari Sans', 
    title: 'Principal Designer at Spotify', 
    avatar: '/placeholder.svg?height=40&width=40' 
  },
  { 
    name: 'Velasco Timmber', 
    title: 'Sr. Product Designer at Netflix', 
    avatar: '/placeholder.svg?height=40&width=40' 
  },
  { 
    name: 'Han Soo Hee', 
    title: 'Actor, Public Figure', 
    avatar: '/placeholder.svg?height=40&width=40' 
  },
  { 
    name: 'Salsabilla Aslley', 
    title: 'Content Creator', 
    avatar: '/placeholder.svg?height=40&width=40' 
  }
]

const showAllPeople = ref(false)
const displayedPeople = computed(() => {
  return showAllPeople.value ? peopleAlsoViewed : peopleAlsoViewed.slice(0, 5)
})

const toggleShowMore = () => {
  showAllPeople.value = !showAllPeople.value
}

const posts = [
  // Add your posts data here
]
</script>

<template>
  <div class="max-w-4xl mx-auto bg-white rounded-lg shadow-sm">
    <!-- Banner -->
    <div :class="[user.banner, 'h-40 rounded-t-lg']"></div>
    
    <!-- Profile Info -->
    <div class="px-6 relative">
      <!-- Avatar -->
      <div class="absolute -top-16 border-4 border-white rounded-full overflow-hidden">
        <UAvatar
          :src="user.avatar"
          alt="Profile picture"
          size="2xl"
          class="w-32 h-32"
        />
      </div>
      
      <div class="pt-20 pb-4">
        <!-- Name and Title -->
        <div class="flex justify-between items-start">
          <div>
            <h1 class="text-2xl font-bold">{{ user.name }}</h1>
            <p class="text-gray-600">{{ user.title }}</p>
            <div class="flex items-center text-gray-500 text-sm mt-1">
              <UIcon name="i-heroicons-map-pin" class="mr-1" />
              <span>{{ user.location }}</span>
            </div>
          </div>
          
          <!-- Companies -->
          <div class="flex gap-2">
            <UBadge v-for="company in companies" :key="company.name" color="gray" variant="solid" class="px-3 py-2">
              <UIcon :name="company.logo" class="mr-1" />
              {{ company.name }}
            </UBadge>
          </div>
        </div>
        
        <!-- Stats -->
        <div class="flex gap-4 mt-4">
          <div>
            <span class="font-bold">{{ user.followers.toLocaleString() }}</span>
            <span class="text-gray-500 ml-1">followers</span>
          </div>
          <div>
            <span class="font-bold">{{ user.connections }}</span>
            <span class="text-gray-500 ml-1">connections</span>
          </div>
        </div>
        
        <!-- Action Buttons -->
        <div class="flex gap-2 mt-4">
          <UButton
            color="blue"
            icon="i-heroicons-user-plus"
            class="px-6"
          >
            Follow
          </UButton>
          <UButton
            color="gray"
            variant="outline"
            icon="i-heroicons-ellipsis-horizontal"
          >
            More
          </UButton>
        </div>
      </div>
    </div>
    
    <!-- Main Content -->
    <div class="flex gap-6 px-6 py-4">
      <!-- Left Column -->
      <div class="flex-grow">
        <UCard>
          <template #header>
            <h2 class="text-xl font-bold">Posts</h2>
          </template>
          
          <div v-if="posts.length === 0" class="py-8 text-center text-gray-500">
            No posts yet
          </div>
          
          <div v-else>
            <!-- Posts would go here -->
          </div>
        </UCard>
      </div>
      
      <!-- Right Column -->
      <div class="w-80">
        <UCard>
          <template #header>
            <h3 class="font-bold">People also viewed</h3>
          </template>
          
          <div class="space-y-4">
            <div v-for="person in displayedPeople" :key="person.name" class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <UAvatar :src="person.avatar" :alt="person.name" size="sm" />
                <div>
                  <div class="font-medium">{{ person.name }}</div>
                  <div class="text-xs text-gray-500">{{ person.title }}</div>
                </div>
              </div>
              <UButton
                color="gray"
                variant="ghost"
                icon="i-heroicons-plus"
                size="xs"
                class="flex-shrink-0"
              />
            </div>
          </div>
          
          <template #footer>
            <UButton
              color="gray"
              variant="ghost"
              size="sm"
              block
              @click="toggleShowMore"
              class="text-blue-600"
            >
              Show {{ showAllPeople ? 'less' : 'more' }}
              <UIcon :name="showAllPeople ? 'i-heroicons-chevron-up' : 'i-heroicons-chevron-down'" class="ml-1" />
            </UButton>
          </template>
        </UCard>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add any additional custom styles here */
</style>

