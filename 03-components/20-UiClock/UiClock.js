import { defineComponent, onBeforeUnmount, onMounted, ref } from 'vue'

export default defineComponent({
  name: 'UiClock',

  setup() {
    const time = ref('')

    const locale = navigator.language || 'en-GB'
    let interval

    const updateTime = () => {
      time.value = new Date().toLocaleTimeString(locale, { timeStyle: 'medium' })
    }

    onMounted(() => {
      updateTime()
      interval = setInterval(updateTime, 1000)
    })

    onBeforeUnmount(() => {
      clearInterval(interval)
    })

    return {
      time,
    }
  },

  template: `<div class="clock">{{ time }}</div>`,
})
