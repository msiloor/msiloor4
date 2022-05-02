<script setup lang="ts">
import './assets/css/app.css'
import AsidePanel from './components/asidePanel.vue'
import SystemButton from './components/systemButton.vue'
import PlayerPanel from './components/playerPanel.vue'
//import HelloWorld from './components/HelloWorld.vue'
import { useAudioPlayStore } from './global/play'
import { ref } from 'vue'
import PlayPage from './components/playPage.vue'
const Audio = ref() //主音频

const AudioPlayStore = useAudioPlayStore()
const { bindAudioObj } = AudioPlayStore
bindAudioObj(Audio)

const refss = ref()
</script>

<template>
  <transition name="slide-fade" enter-active-class="animate__animated animate__fadeInDown" leave-active-class="animate__animated animate__fadeOutUp">
    <div class="ms-nav" v-if="!AudioPlayStore.playPage">
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
            {{ refss }}
          </el-scrollbar>
        </el-main>
      </el-container>
      <system-button></system-button>
      <player-panel></player-panel>
    </div>
    <play-page v-else
  /></transition>
  <audio ref="Audio" :currentTime="refss" :src="AudioPlayStore.AudioPlayInfo?.url"></audio>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  position: relative;
}

.ms-nav.animate__animated.animate__fadeOutUp {
  animation: musiclistshow 0.5s 1;
  transform-origin: center;
  animation-direction: normal;
  -webkit-animation-direction: normal;
  -webkit-transform-origin: center;
  animation-iteration-count: 1;
}
.ms-playPage.animate__animated.animate__fadeInDown {
  animation: musiclistshow3 0.5s 1;
  transform-origin: center;
  /*animation-direction: reverse;
  -webkit-animation-direction: reverse;
  */
  animation-direction: normal;
  -webkit-animation-direction: normal;
  -webkit-transform-origin: center;
  animation-iteration-count: 1;
  border-radius: 0.8rem 0.8rem 0 0;
}

.ms-nav.animate__animated.animate__fadeInDown {
  animation: musiclistshow 0.5s 1;
  transform-origin: center;
  animation-direction: reverse;
  -webkit-animation-direction: reverse;
  -webkit-transform-origin: center;
  animation-iteration-count: 1;
}
.ms-playPage.animate__animated.animate__fadeOutUp {
  animation: musiclistshow3 0.5s 1;
  transform-origin: center;
  animation-direction: reverse;
  -webkit-animation-direction: reverse;
  -webkit-transform-origin: center;
  animation-iteration-count: 1;
  border-radius: 0.8rem 0.8rem 0 0;
}

@keyframes musiclistshow {
  0% {
    transform: translateY(0%);
    -webkit-transform: translateY(0%);
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translateY(-70%);
    -webkit-transform: translateY(-70%);
  }
}

@keyframes musiclistshow2 {
  0% {
    opacity: 0;
    transform: translateY(60%);
    -webkit-transform: translateY(60%);
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translateY(0);
    -webkit-transform: translateY(0);
  }
}
@keyframes musiclistshow3 {
  0% {
    transform: translateY(100%);
    -webkit-transform: translateY(100%);
  }
  100% {
    transform: translateY(0);
    -webkit-transform: translateY(0);
  }
}
</style>
