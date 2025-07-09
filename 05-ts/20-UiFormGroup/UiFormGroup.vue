<script setup lang="ts">
import type { Slot } from 'vue'

type PropsType = {
  for?: string
  label?: string
  description?: string
  hint?: string
  showHint?: boolean
  invalid?: boolean
}

// As 'for' is a reserved keyword in JS, we must rename it to avoid conflicts
const { for: htmlFor } = defineProps<PropsType>()

defineSlots<{
  default?: Slot
  label?: Slot
  description?: Slot
}>()
</script>

<template>
  <div class="form-group">
    <div class="form-group__label-wrapper">
      <label v-if="label" :for="htmlFor" class="form-group__label">
        <slot name="label">
          {{ label }}
        </slot>
      </label>
      <div v-if="description" class="form-group__description">
        <slot name="description">
          {{ description }}
        </slot>
      </div>
    </div>
    <div class="form-group__control">
      <slot name="default" />
    </div>
    <div v-if="hint" class="form-group__hint" :class="{ 'form-group__hint--invalid': invalid }">
      <span v-if="showHint || invalid">{{ hint }}</span>
    </div>
  </div>
</template>

<style scoped>
/* _form-group.css */
.form-group__label-wrapper {
  margin-block-end: var(--spacing-small);
}

.form-group__label {
  display: block;
  font-size: var(--font-size-control);
}

.form-group__description {
  color: var(--color-dimmed);
}

.form-group__hint {
  font-size: var(--font-size-small);
  color: var(--color-dimmed);
  min-height: 1lh;

  &.form-group__hint--invalid {
    color: var(--color-danger);
  }
}
</style>
