<template>
  <div :class="{ dark: darkMode }">
    <div class="min-h-full bg-white dark:bg-dim-900">
      <LoadingPage v-if="isAuthLoading" />
      <!-- App -->
      <div
        v-else-if="user"
        class="grid grid-cols-12 mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:gap-5"
      >
        <!-- Left sidebar -->
        <div class="hidden md:block xs:col-span-1 xl:col-span-2">
          <div class="sticky top-0">
            <SidebarLeft />
          </div>
        </div>

        <!-- Main content -->
        <main class="col-span-12 md:col-span-8 xl:col-span-6">
          <router-view />
        </main>

        <!-- Right Sidebar -->
        <div class="hidden col-span-12 md:block md:col-span-3 xl:col-span-4">
          <div class="sticky top-0">
            <SidebarRight />
          </div>
        </div>
      </div>

      <!-- AuthPage -->
      <AuthPage v-else />
    </div>
  </div>
</template>

<script setup>
const darkMode = ref(false)
const { useAuthUser, initAuth, useAuthLoading } = useAuth()
const isAuthLoading = useAuthLoading()
const user = useAuthUser()

onBeforeMount(() => {
  initAuth()
})
</script>
