<template>
  <div>
    <nuxt-link
      to="#"
      class="flex items-center p-3 w-min hover:bg-gray-200 rounded-full dark:hover:bg-dim-200 dark:text-white"
    >
      <span class="w-6 h-6 text-dark" :class="defaultTransition">
        <slot name="icon" />
      </span>

      <span class="hidden xl:block ml-4 text-xl" :class="textClasses">
        <slot name="name" />
      </span>
    </nuxt-link>
  </div>
</template>

<script setup>
const { defaultTransition } = useTailwindConfig()

const props = defineProps({
  active: {
    type: Boolean,
    default: false
  }
})

const textClasses = computed(() =>
  props.active ? 'font-semibold' : 'font-normal'
)
</script>
