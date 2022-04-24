<script setup>
import '../assets/css/app.css'
import { ref } from 'vue'
import { Back, Search } from '@element-plus/icons-vue'

defineProps({
  msg: String,
})

const count = ref(0)
</script>

<template>
  <div class="ms-system-button">
    <div class="l">
      <div class="return">
        <el-icon style="font-size: 1.25rem"><back /></el-icon>
      </div>
      <div class="search">
        <el-icon style="font-size: 0.9rem; margin-right: 5px"><search /></el-icon>搜索
      </div>
    </div>
    <div class="r">
      <div>
        <div>1</div>
        <div>2</div>
        <div>3</div>
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

  font-style: normal;
  font-weight: bold;
  font-size: 0.625rem;
  line-height: 0.625rem;
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
  width: 12.5rem;
  position: absolute;
  background: rgba(255, 255, 255, 0.64);
  backdrop-filter: blur(2.8125rem);
  border-radius: 2.8125rem 0rem 0rem 7.5rem;
  padding-left: 1rem;
}
</style>
