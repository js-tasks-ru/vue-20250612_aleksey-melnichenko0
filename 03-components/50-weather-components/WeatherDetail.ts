import { defineComponent } from 'vue'

export default defineComponent({
  name: 'WeatherDetail',

  props: {
    label: {
      type: String,
      required: false,
      default: () => '',
    },

    value: {
      type: [String, Number],
      required: false,
      default: () => '',
    },
  },

  template: `
    <div class="weather-details__item">
      <div class="weather-details__item-label">{{ label }}</div>
      <div class="weather-details__item-value">{{ value }}</div>
    </div>
  `,
})
