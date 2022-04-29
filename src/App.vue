<script setup lang="ts">
import './assets/css/app.css'
import AsidePanel from './components/asidePanel.vue'
import SystemButton from './components/systemButton.vue'
import PlayerPanel from './components/playerPanel.vue'
//import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div class="ms-nav">
    <el-container>
      <!-- 功能按钮 -->
      <el-aside width="var(--ms-width-aside)">
        <aside-panel></aside-panel>
      </el-aside>
      <!-- main页面 -->
      <el-main id="nav_main" class="ms-main">
        <el-scrollbar>
          <router-view v-slot="{ Component }">
            <transition name="fades" appear>
              <component :is="Component" />
            </transition>
          </router-view>
        </el-scrollbar>
      </el-main>
    </el-container>
    <system-button></system-button>
    <player-panel></player-panel>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
