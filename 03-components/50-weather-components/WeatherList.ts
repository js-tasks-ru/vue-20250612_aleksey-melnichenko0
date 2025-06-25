import { defineComponent } from 'vue'
import { getWeatherData } from './weather.service.ts'

import WeatherCard from './WeatherCard.ts';

export default defineComponent({
  name: 'WeatherList',

  components: {
    WeatherCard,
  },

  setup () {
    const weatherData = getWeatherData()

    return {
      weatherData,
    }
  },

  template: `
    <ul class="weather-list unstyled-list">
      <WeatherCard v-for="item in weatherData" :key="item.id" :item />
    </ul>
  `,
})
