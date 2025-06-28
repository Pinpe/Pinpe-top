<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { computed, ref } from "vue";

const props = defineProps<{
  title: string;
  link: string;
  desc: string;
  img?: string;
}>();

const isImageError = ref(false);

const hasCover = computed(() => props.img && isImageError.value === false);
</script>

<template>
  <div
    class="flex flex-nowrap items-stretch h-28 gap-4 rounded-[var(--radius-large)]"
  >
    <div
      class="w-28 h-28 flex-shrink-0 rounded-lg overflow-hidden bg-zinc-200 dark:bg-zinc-900"
    >
      <img
        v-if="hasCover"
        :src="img"
        alt="站点头像"
        class="w-full h-full object-cover"
        @error="() => (isImageError = true)"
      />
    </div>
    <div class="grow w-full">
      <div
        class="font-bold transition text-lg text-neutral-900 dark:text-neutral-100 mb-1"
      >
        {{ title }}
      </div>
      <div class="text-50 text-sm font-medium">{{ desc }}</div>
    </div>
    <a
      :href="link"
      target="_blank"
      rel="noopener noreferrer"
      class="flex btn-regular w-[3.25rem] rounded-lg bg-[var(--enter-btn-bg)] hover:bg-[var(--enter-btn-bg-hover)] active:bg-[var(--enter-btn-bg-active)] active:scale-95"
    >
      <Icon
        icon="material-symbols:chevron-right-rounded"
        class="transition text-[var(--primary)] text-4xl mx-auto"
      >
      </Icon>
    </a>
  </div>
</template>
