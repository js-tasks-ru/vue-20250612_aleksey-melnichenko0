import { defineComponent, computed } from 'vue'
import type { PropType } from 'vue'
import { WeatherConditionIcons } from './weather.service.ts'
import type { WeatherData } from './weather.service.ts'
import UiAlert from './UiAlert.ts'
import WeatherDetail from './WeatherDetail.ts'

export default defineComponent({
  name: 'WeatherCard',

  components: {
    UiAlert,
    WeatherDetail,
  },

  props: {
    item: {
      type: Object as PropType<WeatherData>,
      required: true,
    },
  },

  setup(props) {

    // function timeToMinutes(val: string) {
    //   const [hours, minutes] = val.split(':').map(Number)
    //   return hours * 60 + minutes
    // }

    function kelvinToCelcius(val: number) {
      return (val - 273.15).toFixed(1)
    }

    function mpaToMmHg(val: number) {
      return Math.round(val * 0.75)
    }

    function getWeatherIcon(id: keyof typeof WeatherConditionIcons) {
      return WeatherConditionIcons[id] ?? '❓'
    }

    // const isNightV1 = computed<boolean>(() => {
    //   const curMins = timeToMinutes(props.item.current.dt)
    //   const riseMins = timeToMinutes(props.item.current.sunrise)
    //   const setMins = timeToMinutes(props.item.current.sunset)
    //   return curMins < riseMins || curMins > setMins
    // })

    const isNightV2 = computed<boolean>(() => {
      // Assuming that we have properly formatted time strings in HH:MM format
      // Otherwise this solution will not be shorter that V1
      return props.item.current.dt < props.item.current.sunrise ||
             props.item.current.dt > props.item.current.sunset
    })
    
    return {
      isNightV2,
      kelvinToCelcius,
      mpaToMmHg,
      getWeatherIcon,
    }
  },

  template: `
    <li class="weather-card" :class="{ 'weather-card--night': isNightV2 }">
      <UiAlert v-if="item.alert">
        {{ item.alert.sender_name }}: {{ item.alert.description }}
      </UiAlert>
      <div>
        <h2 class="weather-card__name">
          {{ item.geographic_name }}
        </h2>
        <div class="weather-card__time">
          {{ item.current.dt }}
        </div>
      </div>
      <div class="weather-conditions">
        <div class="weather-conditions__icon" :title="item.current.weather.description">{{ getWeatherIcon(item.current.weather.id) }}</div>
        <div class="weather-conditions__temp">{{ kelvinToCelcius(item.current.temp) }} °C</div>
      </div>
      <div class="weather-details">
        <WeatherDetail label="Давление, мм рт. ст." :value="mpaToMmHg(item.current.pressure)" />
        <WeatherDetail label="Влажность, %" :value="item.current.humidity" />
        <WeatherDetail label="Облачность, %" :value="item.current.clouds" />
        <WeatherDetail label="Ветер, м/с" :value="item.current.wind_speed" />
      </div>
    </li>
  `,
})
