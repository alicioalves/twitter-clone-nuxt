<template>
  <form class="pt-5 space-y-6" @submit.prevent="handleLogin">
    <UIInput label="Username" placeholder="@username" v-model="data.username" />
    <UIInput
      label="Password"
      placeholder="*********"
      type="password"
      v-model="data.password"
    />
    <div>
      <button type="submit">Submit</button>
    </div>
  </form>
</template>

<script setup>
const data = reactive({
  username: '',
  password: '',
  loading: false
})

const handleLogin = async () => {
  const { login } = useAuth()

  data.loading = true
  try {
    await login({
      username: data.username,
      password: data.password
    })
  } catch (error) {
    console.log(error)
  } finally {
    data.loading = false
  }
}
</script>
