<template>
  <div class="ms-player">
    <transition name="musicList">
      <div ref="musicList" class="musicList" @mousewheel="mousewheelS" tabindex="0" @blur="closeMusicList" v-if="musicListShow">
        <el-scrollbar wrap-class="sm" @scroll="Scrollbar" view-style="padding:10px 0" max-height="calc(100vh - 4.5rem - 5rem)">
          <div class="musicListItem" v-for="item in 100">
            <div><b>歌曲名 - </b>歌手</div>
            <div class="delMusicListItem">
              <el-icon><circle-close-filled /></el-icon>
            </div>
          </div>
        </el-scrollbar>
      </div>
    </transition>
    <div class="a1" @mousewheel="mousewheel">
      <div @click="listclick">
        <PlayListMenu />
      </div>
      <div><b>歌曲名 - </b>歌手</div>
    </div>
    <div class="a2" @mousewheel="mousewheel">
      <div><Right /></div>
      <div class="play">
        <div><Logo class="noSvg" /></div>
        <div v-if="false"><Play /></div>
      </div>
      <div><Left /></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import '../assets/css/app.css'
import { nextTick, ref } from 'vue'
import Right from '../svg/right.vue'
import Left from '../svg/left.vue'
import Logo from '../svg/logo.vue'
import Play from '../svg/play.vue'
import PlayListMenu from '../svg/playListMenu.vue'

defineProps({
  msg: String,
})

const count = ref(0)
const musicList = ref()
const musicListShow = ref(false)
const musicListShowLook = ref(false)

/** 打开面板 */
function openMusicList() {
  if (!musicListShowLook.value) {
    musicListShow.value = true
    nextTick(() => {
      if (musicListShow.value == true) {
        musicList.value.focus()
        musicListShowLook.value = true
      }
    })
  }
}
function closeMusicList() {
  musicListShow.value = false
  //除颤
  setTimeout(() => {
    if (musicListShow.value == false) musicListShowLook.value = false
  }, 300)
}

function listclick() {
  musicListShow.value == true ? closeMusicList() : openMusicList()
}

let xG = 0
let yG = 0
function mousewheel(res: any, t?: boolean) {
  let x = 0
  let y = 0
  const power = 50
  if (res.deltaY > power) y = 1
  if (res.deltaY < -power) y = 2
  if (res.deltaX > power) x = 1
  if (res.deltaX < -power) x = 2
  if (xG === x && yG === y) {
  } else {
    xG = Number(x)
    yG = Number(y)
    if (x != 0 || y != 0) {
      if (x == 0) {
        if (y == 1) {
          if (t) return 'a'
          openMusicList()
        } else if (y == 2) {
          if (t) return 'b'
          closeMusicList()
        }
      } else if (y == 0) {
        if (x == 1) {
          if (t) return 'c'
          console.log('下一曲')
        } else if (x == 2) {
          if (t) return 'd'
          console.log('上一曲')
        }
      }
    } else {
      if (t) return 'e'
      console.log('归零')
    }
  }
}
let isTop = true
function Scrollbar(res: any) {
  if (res.scrollTop == 0) {
    setTimeout(() => {
      if (res.scrollTop == 0) isTop = true
    }, 800)
  } else {
    isTop = false
  }
}

function mousewheelS(res: any) {
  if (isTop) {
    const da = mousewheel(res, true)
    if (da == 'b') {
      closeMusicList()
    }
  }
}
</script>
<style scoped>
.a1 {
  position: absolute;
  width: 100%;
  height: 2.8125rem;
  background: rgba(255, 255, 255, 0.64);
  backdrop-filter: blur(2.8125rem);
  border-radius: 2.8125rem 0px 0px 2.8125rem;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

.a1 > div:nth-child(1) {
  width: 1rem;
  height: 1rem;
  margin-left: 1.6875rem;
  margin-right: 0.75rem;
}

.a1 > div:nth-child(2) {
  user-select: none;
  font-weight: 700;
  font-size: 0.625rem;
  line-height: 0.625rem;

  color: #585858;
}

.a1 > div:nth-child(2) > b {
  font-weight: 700;
  font-size: 0.875rem;
  line-height: 0.875rem;
  color: #585858;
}

.a2 {
  position: absolute;
  height: 100%;
  display: flex;
  right: 1.5625rem;
  align-items: center;
  justify-content: center;
  flex-direction: row;
}

.a2 > div:nth-child(1) {
  height: 1rem;
  width: 1rem;
  margin-right: 0.6875rem;
}

.a2 > div:nth-child(2) {
  height: 5rem;
  width: 5rem;
  border-radius: 5rem;
  background: rgba(255, 255, 255, 0.64);
  backdrop-filter: blur(2.8125rem);
  box-shadow: 0px 0.25rem 2.8125rem rgba(0, 0, 0, 0.25);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  position: relative;
}

.a2 > div:nth-child(3) {
  height: 1rem;
  width: 1rem;
  margin-left: 0.6875rem;
}

.play > div {
  position: absolute;
}

.play > div:nth-child(1) {
  position: absolute;
  width: 100%;
  height: 100%;
}

.play > div:nth-child(2) {
  position: absolute;
  width: 2rem;
  height: 2rem;
}

.musicList {
  position: absolute;
  width: calc(100% - 0.3125rem);
  background: rgba(255, 255, 255, 0.64);
  backdrop-filter: blur(2.8125rem);
  height: auto;
  min-height: 10vh;
  max-height: calc(100vh - 4.5rem - 5rem);
  bottom: 4.5rem;
  right: 0.3125rem;
  border-radius: 1rem;
  overflow: hidden;

  outline: none;
}
.musicList:focus {
  border: 0;
}
.musicList-enter-active {
  animation: musiclistshow 0.3s 1;
  transform-origin: center;
  animation-direction: normal;
  -webkit-animation-direction: normal;
  -webkit-transform-origin: center;
  animation-iteration-count: 1;
}
.musicList-leave-active {
  animation: musiclistshow 0.3s 1;
  transform-origin: center;
  animation-direction: reverse;
  -webkit-animation-direction: reverse;
  -webkit-transform-origin: center;
  animation-iteration-count: 1;
}

@keyframes musiclistshow {
  0% {
    opacity: 0;
    transform: scale(0.9) translateY(5rem);
    -webkit-transform: scale(0.9) translateY(5rem);
  }
  25% {
    opacity: 1;
  }
  100% {
    transform: scale(1) translateY(0);
    -webkit-transform: scale(1) translateY(0);
  }
}

.musicListItem {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 0.9375rem;
  margin: 0 1.25rem;
  border-radius: 10px;
  user-select: none;
  font-weight: 700;
  font-size: 0.625rem;
  line-height: 0.625rem;
  color: #585858;
  transform-origin: center;
  -webkit-transform-origin: center;
  transition: all 0.3s;
}

.musicListItem:hover {
  background-color: #ffa3a3;
  color: rgb(255, 255, 255);
  transform: scale(1.1);
}
.musicListItem:active {
  transform: scale(1);
}

.delMusicListItem {
  display: none;
  transform-origin: center;
  -webkit-transform-origin: center;
  transition: all 0.3s;
  color: rgb(255, 255, 255);
}
.musicListItem:hover > .delMusicListItem {
  display: block;
}
</style>
