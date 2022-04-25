<script setup lang="ts">
import '../assets/css/app.css'
import { routes } from '../router'
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Settings from '../svg/settings.vue'
import Tabbar from './tabbar.vue'
const route = useRoute()
const router = useRouter()
const selectUrl = ref('')
defineProps({
  msg: String,
})
router.afterEach((to, from) => {
  selectUrl.value = <string>to.name

})

function toPath(url: string, value: string) {
  router.push(url)
  //selectUrl.value = value

}

</script>

<template>
  <div class="ms-aside">
    <div class="avatar">
      <el-avatar style="--el-avatar-size: var(--ms-width-avatar)"></el-avatar>
    </div>
    <div class="control">
      <div class="title">在线音乐</div>
      <Tabbar :toPath="toPath" to="/" value="Home" :select="selectUrl">推荐</Tabbar>
      <Tabbar :toPath="toPath" to="/music" value="Music" :select="selectUrl">音乐馆</Tabbar>
      <Tabbar :toPath="toPath" to="/radio" value="Radio" :select="selectUrl">电台</Tabbar>
      <div class="title">我的音乐</div>
      <Tabbar :toPath="toPath" to="/like" value="Like" :select="selectUrl">我喜欢</Tabbar>
      <Tabbar :toPath="toPath" to="/localFile" value="LocalFile" :select="selectUrl">本地音乐</Tabbar>
      <Tabbar :toPath="toPath" to="/playList" value="PlayList" :select="selectUrl">歌单列表</Tabbar>
    </div>
    <div class="settings">
      <div style="margin-bottom: 2.5rem; line-height: 0">
        <Settings />
      </div>
    </div>
  </div>
</template>

<style >
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
  transition: background 0.35s, color 0.35s;

  -webkit-app-region: no-drag
}

.control>div:hover {

  background: #e1dede52;
  font-weight: 400;
}

.control>.router-link-exact-active {
  background: #ffc5c5;
  color: #fff;
  font-weight: 400;
}

.control>.router-link-exact-active:hover {
  background: #ffa3a3;
  color: #fff;
  font-weight: 400;
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
