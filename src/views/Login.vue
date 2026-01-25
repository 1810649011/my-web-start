<template>
  <div>
    <h2>Login</h2>
    <input v-model="email" type="email" placeholder="Email" required />
    <input v-model="password" type="password" placeholder="Password" required />
    <button @click="handleLogin">Login</button>
    <button @click="goRegister">去注册</button>

    <p v-if="error" style="color: red">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { login } from '@/api/auth'
const email = ref('1810649011@qq.com');
const password = ref('123456');
const error = ref('');
const router = useRouter();

const handleLogin = async () => {

  const res = await login({ email: email.value, password: password.value })
  console.log(res);
  // 保存 token 到 localStorage
  localStorage.setItem('token', res.data.token);
  localStorage.setItem('userId', res.data.userId);

  // 跳转到主页或其他受保护页面
  router.push('/');
};
const goRegister = () => {
  router.push('/register');

}
</script>