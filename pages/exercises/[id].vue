<template>
  <div class="min-h-screen py-4 px-4">
    <div>
      <!-- Header with back button -->
      <div class="flex items-center pb-4">
        <UButton
          variant="ghost"
          icon="i-heroicons-arrow-left"
          to="/exercises"
        >
          Back to Exercises
        </UButton>
      </div>

      <UDivider/>

      <div class="p-4">
        <!-- Exercise header -->
        <div class="mb-6">
          <h1 class="text-2xl font-bold">{{ exerciseInfo?.name }}</h1>
          <div class="text-gray-500 flex items-center text-sm">
            <UIcon name="i-heroicons-adjustments-horizontal" class="mr-1" />
            {{ exercise.category }}
          </div>
        </div>

        <!-- Exercise image -->
        <!-- <div class="rounded-lg overflow-hidden mb-6 bg-gray-100 h-64 relative">
          <img
            :src="exercise.image"
            :alt="exercise.name"
            class="w-full h-full object-cover"
          />
        </div> -->

        <div class="video-container mb-6 flex justify-center">
          <iframe
            class="rounded-lg w-[70%] h-96"
            src="https://www.youtube.com/embed/XpC0O61NiVI"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>

        <!-- Tags -->
        <div class="flex flex-wrap gap-2 mb-6">
          <UBadge
            v-for="muscle in exerciseInfo?.targetMuscles"
            :key="muscle.muscleName"
            color="primary"
            variant="soft"
            size="sm"
          >
            {{ muscle.muscleName }}
          </UBadge>
          <UBadge size="sm" variant="soft" color="gray">
            {{ exerciseInfo?.difficulty }}
          </UBadge>
          <UBadge size="sm" variant="soft" color="gray">
            {{ exercise.equipment }}
          </UBadge>
        </div>

        <!-- Description -->
        <p class="text-gray-600 mb-6">
          {{ exercise.description }}
        </p>

        <!-- Tabs -->
        <UTabs :items="tabs" class="mb-6">
          <template #item="{ item }">
            <div class="p-4">
              <ol v-if="item.key === 'instructions'" class="list-decimal list-inside space-y-2">
                <li v-for="(instruction, index) in exercise.instructions" :key="index" class="text-sm">
                  {{ instruction }}
                </li>
              </ol>
              <ul v-else-if="item.key === 'tips'" class="list-disc list-inside space-y-2">
                <li v-for="(tip, index) in exercise.tips" :key="index" class="text-sm">
                  {{ tip }}
                </li>
              </ul>
            </div>
          </template>
        </UTabs>

        <!-- Stats -->
        <UCard class="mb-6 bg-gray-50">
          <template #header>
            <h3 class="text-base font-medium">Your Stats</h3>
          </template>
          <div class="space-y-3">
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-600">Personal Best</span>
              <span class="text-sm font-medium">
                {{ exercise.personalBest.weight }} lbs × {{ exercise.personalBest.reps }} reps
              </span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-600">Last Workout</span>
              <span class="text-sm font-medium">
                {{ exercise.recentWorkouts[0].weight }} lbs × 
                {{ exercise.recentWorkouts[0].sets }} sets × 
                {{ exercise.recentWorkouts[0].reps }} reps
              </span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-600">Total Sessions</span>
              <span class="text-sm font-medium">{{ exercise.totalSessions }}</span>
            </div>
          </div>
        </UCard>

        <!-- Action button -->
        <UButton
          block
          color="primary"
          icon="i-heroicons-plus"
          @click="addToWorkout"
        >
          Add to Workout
        </UButton>
      </div>
    </div>
  </div>
</template>

<script setup>

const { request } = useApp();

const { id } = useRoute().params;

const exerciseInfo = ref(undefined);

// --------------- Functions ---------------

onMounted(loadAsyncData);

async function loadAsyncData() {
  const exerciseInfoRequest = await request(
    'GET',
    '/exercises/info',
    [{key: 'exerciseId', value: id}],
    null
  );

  if(!exerciseInfoRequest) {
    // Throw 404 (currently malfunctions)
    throw createError({
      statusCode: 404,
      statusMessage: 'Resource Not Found!'
    });
  }

  exerciseInfo.value = exerciseInfoRequest;

  console.log(exerciseInfoRequest);
}

// Tabs configuration
const tabs = [
  {
    key: 'instructions',
    label: 'Instructions',
  },
  {
    key: 'tips',
    label: 'Tips',
  },
];

// Mock exercise data (in a real app, this would come from an API)
const exercise = {
  id: "bench-press",
  name: "Bench Press",
  category: "Strength Training",
  image: "https://placehold.co/800x400",
  muscleGroups: ["Chest", "Triceps", "Shoulders"],
  difficulty: "Intermediate",
  equipment: "Barbell",
  description: "The bench press is a compound exercise that develops the chest, shoulders, and triceps. It involves lying on a bench and pressing weight upward using either a barbell or dumbbells.",
  instructions: [
    "Lie on a flat bench with your feet flat on the floor.",
    "Grip the barbell slightly wider than shoulder-width apart.",
    "Unrack the barbell and lower it to your mid-chest.",
    "Press the barbell back up to the starting position.",
    "Repeat for the desired number of repetitions."
  ],
  tips: [
    "Keep your wrists straight and elbows at a 45-degree angle.",
    "Maintain a slight arch in your lower back.",
    "Keep your feet flat on the floor for stability.",
    "Breathe out when pushing the weight up."
  ],
  recentWorkouts: [
    { date: "2023-03-10", weight: 135, reps: 10, sets: 3 },
    { date: "2023-03-03", weight: 135, reps: 8, sets: 3 },
    { date: "2023-02-24", weight: 125, reps: 10, sets: 3 }
  ],
  personalBest: { weight: 155, reps: 8, date: "2023-01-15" },
  totalSessions: 24
};

// Function to add exercise to workout
const addToWorkout = () => {
  // In a real app, this would add the exercise to the current workout
  // or navigate to a workout creation page
  alert(`Added ${exercise.name} to your workout`);
};
</script>