import { defineComponent, createApp } from 'vue'

const RootComponent = defineComponent({
  name: 'RootComponent',

  setup() {
    const locale = navigator.language ?? 'ru-RU'
    const date = new Date();
    const dateISO = date.toISOString()
    const dateLocale = date.toLocaleDateString(locale, { dateStyle: 'long' })

    return {
      dateISO,
      dateLocale,
    }
  },

  template: `
    <p>Сегодня <time :datetime="dateISO">{{ dateLocale }}</time></p>
  `,
})

createApp(RootComponent).mount('#app')
