<script setup lang="ts">
import type { MeetupDTO } from '@shgk/vue-course-ui'

type PropsType = Pick<MeetupDTO, 'description'>

const { description } = defineProps<PropsType>()
</script>

<template>
  <div class="meetup-description">{{ description }}</div>
</template>

<style scoped>
/* _meetup-description.css */
.meetup-description {
  margin: var(--spacing-large) 0;
  white-space: pre-wrap;
}
</style>
