<template>
  <div>
    <h2>注册</h2>
    <form @submit.prevent="handleLogin">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">注册</button>
    </form>
    <p v-if="error" style="color: red">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { register } from '@/api/auth'
const email = ref('1810649011@qq.com');
const password = ref('123456');
const error = ref('');
const router = useRouter();

const handleLogin = async () => {
  try {
    const res = await register({ email: email.value, password: password.value })
    console.log('注册成功');
    // 跳转到主页或其他受保护页面
    router.push('/login');
  } catch (err) {
    error.value = err.response?.data?.error || 'Login failed';
  }
};
</script>