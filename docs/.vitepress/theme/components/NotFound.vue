<script setup lang="ts">
import { onMounted, ref } from "vue";
import { withBase } from "vitepress";

const seconds = ref(3);

onMounted(() => {
  const timer = setInterval(() => {
    seconds.value -= 1;
    if (seconds.value <= 0) {
      clearInterval(timer);
      window.location.replace(withBase("/"));
    }
  }, 1000);
});
</script>

<template>
  <div class="not-found">
    <p class="code">404</p>
    <p class="title">这一页不存在</p>
    <p class="tip">{{ seconds }} 秒后自动回到蓝皮书首页……</p>
    <a class="home-link" :href="withBase('/')">立即回到首页</a>
  </div>
</template>

<style scoped>
.not-found {
  padding: 96px 24px;
  text-align: center;
}
.not-found .code {
  font-size: 56px;
  font-weight: 700;
  color: var(--vp-c-brand-1);
  margin: 0;
}
.not-found .title {
  font-size: 20px;
  font-weight: 600;
  margin: 12px 0 0;
}
.not-found .tip {
  color: var(--vp-c-text-2);
  margin: 12px 0 24px;
}
.not-found .home-link {
  display: inline-block;
  padding: 8px 20px;
  border-radius: 10px;
  background: var(--vp-button-brand-bg);
  color: #fff;
  font-weight: 600;
}
</style>
