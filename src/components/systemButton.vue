<script setup lang="ts">
import '../assets/css/app.css'
import { nextTick, ref } from 'vue'
import Return from '../svg/return.vue'
import Search from '../svg/search.vue'
import Minimize from '../svg/minimize.vue'
import Maximize from '../svg/maximize.vue'
import Close from '../svg/close.vue'


defineProps({
  msg: String,
})

const searcPanel = ref(false)
const searcPanelLook = ref(false)
const searcInput = ref()
function click() {
  searcPanelLook.value = false
  searcPanel.value = true
  nextTick(() => {
    searcInput.value.focus() //
  })
}
function blure() {
  searcPanelLook.value = true
  setTimeout(() => {
    if (searcPanelLook.value == true) searcPanel.value = false
  }, 500)
}
function focuse() {
  searcPanelLook.value = false
}

interface RestaurantItem {
  value: string
  link: string
}

const state1 = ref('')
const state2 = ref('')

const restaurants = ref<RestaurantItem[]>([])
const querySearch = (queryString: string, cb: any) => {
  const results = queryString ? restaurants.value.filter(createFilter(queryString)) : restaurants.value
  // call callback function to return suggestions
  cb(results)
}
const createFilter = (queryString: string) => {
  return (restaurant: RestaurantItem) => {
    return restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
  }
}

const handleSelect = (item: any) => {
  console.log(item)
}

restaurants.value = [
  { value: 'vue', link: 'https://github.com/vuejs/vue' },
  { value: 'element', link: 'https://github.com/ElemeFE/element' },
  { value: 'cooking', link: 'https://github.com/ElemeFE/cooking' },
  { value: 'mint-ui', link: 'https://github.com/ElemeFE/mint-ui' },
  { value: 'vuex', link: 'https://github.com/vuejs/vuex' },
  { value: 'vue-router', link: 'https://github.com/vuejs/vue-router' },
  { value: 'babel', link: 'https://github.com/babel/babel' },
]
//e
</script>

<template>
  <div class="ms-system-button">
    <div class="l">
      <div class="return"><Return /></div>
      <div class="search" :style="searcPanel ? 'width:230px' : ''" @click="click">
        <Search v-show="!searcPanel" />
        <b v-show="!searcPanel">{{ state1 != '' ? state1 : '搜索歌曲' }}</b>
        <el-autocomplete @focus="focuse" @blur="blure" :style="searcPanel ? '' : 'display:none'" ref="searcInput" v-model="state1" :fetch-suggestions="querySearch" clearable class="inline-input" placeholder="搜索歌曲" @select="handleSelect" />
      </div>
    </div>
    <div class="r" style="display:none">
      <div>
        <div><Minimize /></div>
        <div><Maximize /></div>
        <div><Close /></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.l {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
.return {
  height: var(--ms-height-system-buttom);
  width: var(--ms-height-system-buttom);
  background: rgba(255, 255, 255, 0.64);
  backdrop-filter: blur(2.8125rem);
  border-radius: 0rem 2.5rem 2.5rem 0rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.search {
  width: 8.8125rem;
  height: 2.1875rem;
  background: rgba(255, 255, 255, 0.64);
  backdrop-filter: blur(2.8125rem);
  margin-left: 1rem;
  border-radius: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: width 0.5s;
  overflow: hidden;
}
.search > b {
  font-weight: 200;
  font-size: 0.625rem;
  line-height: 0.625rem;
  color: #000000;
  margin-right: 1.5625rem;
  margin-left: 1.5625rem;
}

.r {
  position: relative;
  height: var(--ms-height-system-buttom);
}
.r > div {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  top: 0;
  right: 0;
  height: 2.5rem;
  width: 11.5rem;
  position: absolute;
  background: rgba(255, 255, 255, 0.64);
  backdrop-filter: blur(2.8125rem);
  border-radius: 2.8125rem 0rem 0rem 7.5rem;
  padding-left: 1rem;
}
</style>
<style>
.search .el-input > input {
  margin-right: 0.8rem;
  margin-left: 0.8rem;
  outline: none;
  border: 0;
  background: #0000;
  width: 100%;
  box-shadow: none;
}
.el-autocomplete__popper.el-popper[role='tooltip'] {
  background: #ffffffcf;
  border: 0px solid var(--el-border-color-light);
  box-shadow: var(--el-box-shadow-light);
  border-radius: 10px;
}
</style>
