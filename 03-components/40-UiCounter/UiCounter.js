import { defineComponent } from 'vue'
import { UiButton } from '@shgk/vue-course-ui'
import './UiCounter.css'

export default defineComponent({
  name: 'UiCounter',

  components: {
    UiButton,
  },

  props: {
    count: {
      type: Number,
      required: true,
    },

    min: {
      type: Number,
      required: false,
      default: () => 0,
    },

    max: {
      type: Number,
      required: false,
      default: () => undefined,
    },
  },

  emits: ['update:count'],

  setup(props, { emit }) {
    function handleChange(newCount) {
      // Just in case :)
      if (newCount < props.min || (props.max && newCount > props.max)) return
      emit('update:count', newCount)
    }
    // Рекомендуется для практики реализовать обработку событий внутри setup, а не непосредственно в шаблоне

    return {
      handleChange,
    }
  },

  template: `
    <div class="counter">
      <UiButton aria-label="Decrement" :disabled="count <= min" @click="handleChange(count - 1)">➖</UiButton>
      <span class="count" data-testid="count">{{ count }}</span>
      <UiButton aria-label="Increment" :disabled="max && count >= max" @click="handleChange(count + 1)">➕</UiButton>
    </div>
  `,
})
