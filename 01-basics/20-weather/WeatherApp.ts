import { defineComponent } from 'vue'
import { getWeatherData, WeatherConditionIcons } from './weather.service.ts'

type TimeString = `${number}:${number}`;

export default defineComponent({
  name: 'WeatherApp',

  setup () {
    const weatherData = getWeatherData()

    function timeToMinutes(val: TimeString) {
      const [hours, minutes] = val.split(':').map(Number)
      return hours * 60 + minutes
    }

    function isNight(current: TimeString, sunrise: TimeString, sunset: TimeString) {
      const curMins = timeToMinutes(current)
      const riseMins = timeToMinutes(sunrise)
      const setMins = timeToMinutes(sunset)
      return curMins < riseMins || curMins > setMins
    }

    function kelvinToCelcius(val: number) {
      return (val - 273.15).toFixed(1)
    }

    function mpaToMmHg(val: number) {
      return Math.round(val * 0.75)
    }

    function getWeatherIcon(id: keyof typeof WeatherConditionIcons) {
      return WeatherConditionIcons[id] ?? '❓'
    }

    return {
      weatherData,
      isNight,
      kelvinToCelcius,
      mpaToMmHg,
      getWeatherIcon,
    }
  },

  template: `
    <div>
      <h1 class="title">Погода в Средиземье</h1>

      <ul class="weather-list unstyled-list">
        <li v-for="item in weatherData" class="weather-card" :class="{ 'weather-card--night': isNight(item.current.dt, item.current.sunrise, item.current.sunset) }">
          <div v-if="item.alert" class="weather-alert">
            <span class="weather-alert__icon">⚠️</span>
            <span class="weather-alert__description">{{ item.alert.sender_name }}: {{ item.alert.description }}</span>
          </div>
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
            <div class="weather-details__item">
              <div class="weather-details__item-label">Давление, мм рт. ст.</div>
              <div class="weather-details__item-value">{{ mpaToMmHg(item.current.pressure) }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Влажность, %</div>
              <div class="weather-details__item-value">{{ item.current.humidity }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Облачность, %</div>
              <div class="weather-details__item-value">{{ item.current.clouds }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Ветер, м/с</div>
              <div class="weather-details__item-value">{{ item.current.wind_speed }}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  `,
})
