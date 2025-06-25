import { defineComponent } from 'vue'

import WeatherList from './WeatherList.ts';

import './WeatherApp.css'

export default defineComponent({
  name: 'WeatherApp',

  components: {
    WeatherList,
  },

  template: `
    <div>
      <h1 class="title">Погода в Средиземье</h1>
      <WeatherList />
    </div>
  `,
})
