import { defineComponent } from 'vue'

export default defineComponent({
  name: 'UiAlert',

  props: {
    icon: {
      type: String,
      required: false,
      default: () => '⚠️',
    },

    desc: {
      type: String,
      required: false,
      default: () => '',
    },
  },

  template: `
    <div class="weather-alert">
      <span v-if="icon" class="weather-alert__icon">{{ icon }}</span>
      <span class="weather-alert__description">
        <slot />
        {{ desc }}
      </span>
    </div>
  `,
})
