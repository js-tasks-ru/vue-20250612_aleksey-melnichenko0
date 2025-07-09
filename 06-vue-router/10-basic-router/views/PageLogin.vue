<script setup lang="ts">
import { UiButton, UiFormGroup, UiInput } from '@shgk/vue-course-ui'
import { ref } from 'vue'
import MeetupsAuthForm from '../components/MeetupsAuthForm.vue'
import LayoutAuth from '../components/LayoutAuth.vue'
import { login } from '../api.ts'
import { useRouter } from 'vue-router'
import type { LocationQueryValue } from 'vue-router'

const email = ref('demo@email')
const password = ref('password')

const router = useRouter()

async function onSubmit() {
  try {
    await login(email.value, password.value)
    // We are not handling the case when from query parameter is an array for simplicity sake
    // Idealy, we can implement some util function to handle this case
    const to = router.currentRoute.value.query.from as LocationQueryValue
    if (to) {
      router.push({ path: to })
    } else {
      router.push({ path: '/' })
    }
  } catch (error) {
    alert((error as Error).message)
  }
}
</script>

<template>
  <LayoutAuth title="Вход">
    <MeetupsAuthForm @submit="onSubmit">
      <UiFormGroup label="Email">
        <UiInput v-model="email" name="email" type="email" placeholder="demo@email" large required />
      </UiFormGroup>

      <UiFormGroup label="Пароль">
        <UiInput v-model="password" name="password" type="password" placeholder="password" large required />
      </UiFormGroup>

      <template #submit>
        <UiButton kind="primary" type="submit" wide size="large">Войти</UiButton>
      </template>

      <template #append>
        Нет аккаунта?
        <RouterLink to="/register">Зарегистрируйтесь</RouterLink>
      </template>
    </MeetupsAuthForm>
  </LayoutAuth>
</template>
