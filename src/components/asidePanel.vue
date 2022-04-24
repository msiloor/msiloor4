<script setup lang="ts">
import '../assets/css/app.css'
import { routes } from '../router'
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Settings from '../svg/settings.vue'
const route = useRoute()
const router = useRouter()
const selectUrl = ref('')
defineProps({
  msg: String,
})

function toPath(url: string, value: string) {
  router.push(url)
  selectUrl.value = value

}

</script>

<template>
  <div class="ms-aside">
    <div class="avatar">
      <el-avatar style="--el-avatar-size: var(--ms-width-avatar)"></el-avatar>
    </div>
    <div class="control">
      <div class="title">在线音乐</div>
      <div @click="router.push('/')">推荐</div>
      <div @click="router.push('/music')">音乐馆</div>
      <div @click="router.push('/radio')">电台</div>
      <div class="title">我的音乐</div>
      <div @click="router.push('/like')">我喜欢</div>
      <div @click="router.push('/localFile')">本地音乐</div>
      <div @click="router.push('/playList')">歌单列表</div>
    </div>
    <div class="settings">
      <div style="margin-bottom: 2.5rem; line-height: 0">
        <Settings />
      </div>
    </div>
  </div>
</template>

<style scoped>
.avatar {
  max-height: var(--ms-width-aside);
  height: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 0.9375rem;
  min-height: 3.75rem;
}

.control {
  user-select: none;

}

.control>div {
  font-weight: 200;
  font-size: 0.75rem;
  line-height: 1rem;
  text-decoration: none;
  text-align: center;
  display: block;
  color: #000000;
  width: 7.5rem;
  padding: 0.5rem;
  margin: 0.25rem;
  border-radius: 12px;
  transition: background-color 0.35s;
  -webkit-app-region: no-drag
}

.control>div:hover {
  color: #dd5353;
  background: #e1dede52;
}

.control>.router-link-exact-active {
  background: #ffc5c5;
  color: #fff;
}

.control>.title {
  font-size: 0.9375rem;
  line-height: 0.75rem;
  color: #c3c1c1;
  margin-top: 1.25rem;
  transform: scale(0.6);
  margin-bottom: 8px;
}

.settings {
  height: var(--ms-width-aside);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-top: 0.9375rem;
}
</style>
