<script setup>
import '../assets/css/app.css'
import { ref } from 'vue'

import Settings from '../svg/settings.vue'

defineProps({
  msg: String,
})

const count = ref(0)
</script>

<template>
  <div class="ms-aside">
    <div class="avatar"><el-avatar style="--el-avatar-size: var(--ms-width-avatar)"></el-avatar></div>
    <div class="control">
      <div class="title">在线音乐</div>
      <div class="open">推荐</div>
      <div>音乐馆</div>
      <div>电台</div>
      <div class="title">我的音乐</div>
      <div>我喜欢</div>
      <div>本地音乐</div>
      <div>歌单列表</div>
    </div>
    <div class="settings">
      <div style="margin-bottom: 2.5rem; line-height: 0"><Settings /></div>
    </div>
  </div>
</template>

<style scoped>
.avatar {
  height: var(--ms-width-aside);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.control {
}

.control > div {
  font-family: Microsoft JhengHei;
  font-style: normal;
  font-weight: bold;
  font-size: 0.75rem;
  line-height: 1rem;

  text-align: center;

  color: #000000;

  width: 7.5rem;
  padding: 0.5rem;
  margin: 0.25rem;
  border-radius: 12px;
}
.control > .open {
  background: #ffc5c5;
  color: #fff;
}
.control > .title {
  font-size: 0.5625rem;
  line-height: 0.75rem;
  color: #c3c1c1;
  margin-top: 0.9375rem;
}
.settings {
  height: var(--ms-width-aside);
  display: flex;
  align-items: flex-end;
  justify-content: center;
}
</style>
