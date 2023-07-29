<template>
  <div class="border-x" :class="twitterBorderColor">
    <section
      class="sticky top-0 px-4 py-3 bg-white/80 backdrop-blur-md dark:bg-dim-900/80"
    >
      <h2 class="text-xl font-bold text-gray-800 dark:text-gray-100">
        {{ props.title }}
      </h2>
    </section>

    <span
      v-if="isLoading"
      class="flex items-center justify-center p-4 border-b"
      :class="twitterBorderColor"
    >
      <UILoading />
    </span>
    <slot v-else />
  </div>
</template>

<script setup>
const { twitterBorderColor } = useTailwindConfig()
const props = defineProps({
  title: {
    type: String,
    required: true
  },

  isLoading: {
    type: Boolean,
    required: true
  }
})
</script>
