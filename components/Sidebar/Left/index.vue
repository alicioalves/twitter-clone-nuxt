<template>
  <div class="flex flex-col h-screen">
    <div
      class="p-2 my-2 rounded-full hover:bg-blue-50 w-min dark:hover:bg-white/20"
      :class="defaultTransition"
    >
      <nuxt-link to="/">
        <div class="w-8 h-8">
          <LogoTwitter />
        </div>
      </nuxt-link>
    </div>

    <div>
      <SidebarLeftTab v-for="item in menuItems" :key="item.name">
        <template #icon>
          <component :is="item.icon" />
        </template>
        <template #name>{{ item.name }}</template>
      </SidebarLeftTab>
    </div>
  </div>
</template>

<script setup>
import {
  HomeIcon,
  MagnifyingGlassIcon,
  BellIcon,
  InboxIcon,
  BookmarkIcon,
  DocumentTextIcon,
  UserIcon,
  EllipsisHorizontalCircleIcon
} from '@heroicons/vue/24/outline'

const { defaultTransition } = useTailwindConfig()

const menuItems = [
  {
    icon: HomeIcon,
    name: 'Home'
  },
  {
    icon: MagnifyingGlassIcon,
    name: 'Explore'
  },
  {
    icon: BellIcon,
    name: 'Notifications'
  },
  {
    icon: InboxIcon,
    name: 'Messages'
  },
  {
    icon: BookmarkIcon,
    name: 'Bookmarks'
  },
  {
    icon: DocumentTextIcon,
    name: 'Lists'
  },
  {
    icon: UserIcon,
    name: 'Profile'
  },
  {
    icon: EllipsisHorizontalCircleIcon,
    name: 'More'
  }
]
</script>
