<template>
  <div class="flex flex-col">
    <!-- Preview Card: What's Happening -->
    <SidebarRightPreviewCard title="What's Happening">
      <SidebarRightPreviewCardItem
        v-for="item in whatsHappeningItems"
        :key="item.title"
      >
        <div>
          <h2 class="font-bold text-gray-800 dark:text-white">
            {{ item.title }}
          </h2>
          <p class="text-xs text-gray-400">{{ item.count }}</p>
        </div>
      </SidebarRightPreviewCardItem>
    </SidebarRightPreviewCard>

    <!-- Preview Card: Who to follow -->
    <SidebarRightPreviewCard title="Who to follow">
      <SidebarPreviewCardItem v-for="item in whoToFollowItems" :key="item.name">
        <div class="flex justify-between items-center p-2">
          <div class="flex flex-row">
            <img class="w-10 h-10" :src="item.image" alt="profile picture" />
            <div class="flex flex-col ml-2">
              <h1 class="text-sm font-bold text-gray-900 dark:text-white">
                {{ item.name }}
              </h1>
              <p class="text-xs text-gray-400">{{ item.handle }}</p>
            </div>
          </div>
          <div class="flex h-full">
            <button
              class="px-4 py-2 font-bold text-xs text-white dark:text-black bg-black dark:bg-white rounded-full"
            >
              Follow
            </button>
          </div>
        </div>
      </SidebarPreviewCardItem>
    </SidebarRightPreviewCard>
  </div>
</template>

<script setup>
const whatsHappeningItems = ref([
  {
    title: 'SpaceX',
    count: '18.8k Tweets'
  },
  {
    title: '#CodingIsFun',
    count: '18.8k Tweets'
  },
  {
    title: '#artforall',
    count: '1.8k Tweets'
  }
])

const whoToFollowItems = ref([
  {
    name: 'Elon Musk',
    handle: '@elonmusk',
    image: 'https://picsum.photos/200/200'
  },
  {
    name: 'Elon Musk',
    handle: '@elonmusk',
    image: 'https://picsum.photos/200/200'
  },
  {
    name: 'Elon Musk',
    handle: '@elonmusk',
    image: 'https://picsum.photos/200/200'
  }
])
</script>
