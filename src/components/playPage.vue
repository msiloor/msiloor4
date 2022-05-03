<template>
  <div @mousewheel="mousewheel" class="ms-playPage" :style="`--color-button:rgba(${AudioPlayStore.AudioPlayColor.r},${AudioPlayStore.AudioPlayColor.g},${AudioPlayStore.AudioPlayColor.b},1)`">
    <div class="pageImg" :style="`background-image: url(${AudioPlayStore.AudioPlayInfo.img});`">背景</div>
    <div class="pageC" :style="`background:linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), rgba(${AudioPlayStore.AudioPlayColor.r},${AudioPlayStore.AudioPlayColor.g},${AudioPlayStore.AudioPlayColor.b},0.4);`">
      <div class="main">
        <div>
          <div :style="`background-image: url(${AudioPlayStore.AudioPlayInfo.img});`"></div>
          <div>
            <div>1</div>
            <div @click="AudioPlayStore.playLast()"><Right style="width: 1rem; margin-left: 0.1875rem" /></div>
            <div @click="playMusic"><Stop v-if="AudioPlayStore.AudioPlayState == 'play'" color="white" style="width: 1.5625rem" /><Play v-else style="width: 1.5625rem" /></div>
            <div @click="AudioPlayStore.playNext()"><Left style="width: 1rem; margin-right: 0.1875rem" /></div>
            <div><PlayListMenu color="white" /></div>
            <transition name="musicList">
              <div ref="musicList" class="musicList" tabindex="0">
                <el-scrollbar wrap-class="sm" view-style="padding:10px 0" max-height="calc(100vh - 4.5rem - 5rem)">
                  <div class="musicListItem" v-for="(item, index) in AudioPlayStore.playList" :key="index" @click="AudioPlayStore.playInList(index)">
                    <div>
                      <b>{{ item.song }} - </b>{{ item.singer[0].name }}
                    </div>
                    <div class="delMusicListItem" @click="AudioPlayStore.playListDel(index)">
                      <el-icon><circle-close-filled /></el-icon>
                    </div>
                  </div>
                </el-scrollbar>
              </div>
            </transition>
          </div>
        </div>
        <div>
          <div>尚未发现歌词</div>
        </div>
      </div>
      <div class="fo">
        <div></div>
        <div>
          <el-slider :max="AudioPlayStore.AudioPlayDuration" :min="0" class="bar" :style="`--el-slider-main-bg-color: ${AudioPlayStore.AudioPlayColor?.rgba};--el-slider-runway-bg-color: rgba(${AudioPlayStore.AudioPlayColor.r},${AudioPlayStore.AudioPlayColor.g},${AudioPlayStore.AudioPlayColor.b},0.3);`" @change="change" v-model="AudioPlayStore.AudioPlayProgress" :format-tooltip="formatTooltip" />
        </div>
        <div></div>
      </div>
    </div>
    <div class="head">
      <div></div>
      <div>
        <div>{{ AudioPlayStore.AudioPlayInfo?.song }}</div>
        <div>{{ AudioPlayStore.AudioPlayInfo.singer[0].name }}</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useAudioPlayStore } from '../global/play'
import Play from '../svg/play.vue'
import Right from '../svg/right.vue'
import Left from '../svg/left.vue'
import PlayListMenu from '../svg/playListMenu.vue'
import Stop from '../svg/stop.vue'

const AudioPlayStore = useAudioPlayStore()
function playMusic() {
  if (AudioPlayStore.AudioPlayState == 'play') {
    AudioPlayStore.stop()
  } else {
    AudioPlayStore.play()
  }
}
function change(val: any) {
  AudioPlayStore.setCurrentTime(val)
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
        } else if (y == 2) {
          if (t) return 'b'
          AudioPlayStore.playPage = false
        }
      } else if (y == 0) {
        if (x == 1) {
          if (t) return 'c'
          console.log('下一曲')
          AudioPlayStore.playNext()
        } else if (x == 2) {
          if (t) return 'd'
          console.log('上一曲')
          AudioPlayStore.playLast()
        }
      }
    } else {
      if (t) return 'e'
      console.log('归零')
    }
  }
}

function formatTooltip(val: number) {
  const time = val
  let h = <number | string>parseInt(String((time / 60 / 60) % 24))
  h = h < 10 ? '0' + h : h
  let m = <number | string>Number(parseInt(String((time / 60) % 60)))
  m = m < 10 ? '0' + m : m
  let s = <number | string>Number(parseInt(String(time % 60)))
  s = s < 10 ? '0' + s : s
  // 作为返回值返回
  return `${h}:${m}:${s}`
}
</script>
<style>
.ms-playPage {
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  background-color: aliceblue;
  z-index: 999;
  overflow: hidden;
  color: rgb(255, 255, 255);
}
.pageImg {
  transition: all 0.25s;
  height: 100%;
  width: 100%;
  background-size: 100% auto;
  background-position: center center;
  /*filter: blur(2.8125rem);*/
}
.pageC {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  backdrop-filter: blur(4.0625rem);
  -webkit-backdrop-filter: blur(4.0625rem);
  user-select: none;
  -webkit-user-select: none;
  -webkit-app-region: drag;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.bar:hover > .el-slider__runway > .el-slider__bar,
.bar:hover > .el-slider__runway > .el-slider__button-wrapper {
  transition: none;
  transition-timing-function: cubic-bezier(0.45, 0.45, 0.45, 0.45);
}
.bar > .el-slider__runway > .el-slider__bar,
.bar > .el-slider__runway > .el-slider__button-wrapper {
  transition: all 1s;
  transition-timing-function: cubic-bezier(0.45, 0.45, 0.45, 0.45);
}
</style>
<style scoped>
.head {
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  position: absolute;
  top: 2.8125rem;
}
.head > div:nth-child(1) {
  margin-left: 1.875rem;
}
.head > div:nth-child(2) {
  margin-right: 2.8125rem;
}
.head > div:nth-child(2) > div:nth-child(1) {
  font-style: normal;
  font-weight: 700;
  font-size: 1.5rem;
  line-height: 1.5rem;
  margin-bottom: 0.625rem;
  text-align: right;
}
.head > div:nth-child(2) > div:nth-child(2) {
  font-style: normal;
  font-weight: 300;
  font-size: 1rem;
  line-height: 1rem;
  text-align: right;
}
.main {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  height: calc(100% - 3.75rem);
}
.main > div:nth-child(1) {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.main > div:nth-child(1) > div:nth-child(1) {
  width: 15.625rem;
  height: 15.625rem;
  background-color: rgb(52, 52, 52);
  border-radius: 15.625rem;
  margin-bottom: 4.375rem;
  background-size: 100% auto;
  background-position: center center;
  -webkit-app-region: no-drag;
}
.main > div:nth-child(1) > div:nth-child(2) {
  height: 3.125rem;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  position:relative;
}
.main > div:nth-child(1) > div:nth-child(2) > div {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3.125rem;
  transition: all 0.3s;
  transform-origin: center;
  -webkit-transform-origin: center;
  -webkit-app-region: no-drag;
}
.main > div:nth-child(1) > div:nth-child(2) > div:hover {
  opacity: 0.8;
}
.main > div:nth-child(1) > div:nth-child(2) > div:active {
  transform: scale(0.8);
  -webkit-transform: scale(0.8);
}
.main > div:nth-child(1) > div:nth-child(2) > div:nth-child(1),
.main > div:nth-child(1) > div:nth-child(2) > div:nth-child(5) {
  height: 2.0625rem;
  width: 2.0625rem;
  background-color: var(--color-button);
  margin: 0 1rem;
}

.main > div:nth-child(1) > div:nth-child(2) > div:nth-child(2),
.main > div:nth-child(1) > div:nth-child(2) > div:nth-child(4) {
  height: 2.625rem;
  width: 2.625rem;
  background-color: var(--color-button);
}
.main > div:nth-child(1) > div:nth-child(2) > div:nth-child(3) {
  height: 3.125rem;
  width: 3.125rem;
  background-color: var(--color-button);
  margin: 0 1.25rem;
}
.main > div:nth-child(2) {
  min-width: 16.5625rem;
}
.fo {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  height: 3.75rem;
}
.fo > div:nth-child(2) {
  width: 70%;
}
.bar {
  --el-slider-height: 0.3125rem;
  --el-slider-button-size: 0.4375rem;
  -webkit-app-region: no-drag;
}

.musicList {
  position: absolute;
  width: calc(100% - 0.3125rem);
  background: rgba(255, 255, 255, 0.64);
  backdrop-filter: blur(2.8125rem);
  -webkit-backdrop-filter: blur(2.8125rem);
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
</style>
