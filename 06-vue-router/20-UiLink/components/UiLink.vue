<script setup lang="ts">
// Does not work for me without importing RouterLink
import { RouterLink } from 'vue-router';

defineProps<{
  to?: string | { path?: string, name?: string; params?: Record<string, any>; query?: Record<string, any> };
  href?: string;
}>();
</script>

<template>
  <component
    :is="to ? RouterLink : 'a'"
    class="link"
    v-bind="to ? { to } : { href }"
  >
    <slot/>
  </component>
</template>

<style scoped>
.link {
  color: var(--color-text-primary);
}

.link:hover {
  text-decoration: underline;
}
</style>
