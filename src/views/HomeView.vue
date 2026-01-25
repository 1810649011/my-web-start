<template>
  <div>
    我是首页

    <el-button type="primary" @click="handleTodo">随手记</el-button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref } from "vue";
const router = useRouter();

const handleTodo = () => {
  router.push('/todo')
}

</script>
