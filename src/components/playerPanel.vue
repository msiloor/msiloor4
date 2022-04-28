<script setup lang="ts">
import '../assets/css/app.css'
import { ref } from 'vue'
import Right from '../svg/right.vue';
import Left from '../svg/left.vue';
import Logo from '../svg/logo.vue';
import Play from '../svg/play.vue';
import PlayListMenu from '../svg/playListMenu.vue';

defineProps({
  msg: String
})

const count = ref(0)
</script>

<template>
  <div class="ms-player">
    <div class="a1">
      <div>
        <PlayListMenu />
      </div>
      <div><b>歌曲名 - </b>歌手</div>
    </div>
    <div class="a2">
      <div>
        <Right />
      </div>
      <div class="play">
        <div>
          <Logo />
        </div>
        <div v-if="false">
          <Play />
        </div>
      </div>
      <div>
        <Left />
      </div>
    </div>
  </div>
</template>

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

.a1>div:nth-child(1) {
  width: 1rem;
  height: 1rem;
  margin-left: 1.6875rem;
  margin-right: .75rem;
}

.a1>div:nth-child(2) {
  font-weight: 700;
  font-size: .625rem;
  line-height: .625rem;

  color: #585858;
}

.a1>div:nth-child(2)>b {
  font-weight: 700;
  font-size: .875rem;
  line-height: .875rem;
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

.a2>div:nth-child(1) {
  height: 1rem;
  width: 1rem;
  margin-right: .6875rem;
}

.a2>div:nth-child(2) {
  height: 5rem;
  width: 5rem;
  border-radius: 5rem;
  background: rgba(255, 255, 255, 0.64);
  backdrop-filter: blur(2.8125rem);
  box-shadow: 0px .25rem 2.8125rem rgba(0, 0, 0, 0.25);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  position: relative;
}

.a2>div:nth-child(3) {
  height: 1rem;
  width: 1rem;
  margin-left: .6875rem;
}

.play>div {
  position: absolute;
}

.play>div:nth-child(1) {
  position: absolute;
  width: 100%;
  height: 100%;
}

.play>div:nth-child(2) {
  position: absolute;
  width: 2rem;
  height: 2rem;
}
</style>
