import { da } from 'element-plus/lib/locale'
import { defineStore } from 'pinia'
import { nextTick, Ref, ref } from 'vue'

export interface singerInfo {
  name: string
  id?: string
  img?: string
}
export interface albumInfo {
  name: string
  id: string
  img: string
}

export interface AudoPlayListItem {
  song: string
  singer: Array<singerInfo>
  album?: Array<albumInfo>
  img?: string
  url: string
  defUrl?: number
  path?: string
  id?: string
  lrc?: { id: string; url: string; data: string }
}

export const useAudioPlayStore = defineStore('AudioPlay', () => {
  let AudioObj: any
  /** 绑定音频标签 */
  function bindAudioObj(Audio: any) {
    console.log('绑定音频', Audio)

    AudioObj = Audio
    console.log('绑定音频x', AudioObj)
  }
  /** 播放状态 */
  const AudioPlayState = ref<'play' | 'stop'>('stop')
  const AudioPlayDuration = ref(0)
  const AudioPlayProgress = ref(0)
  /** 播放信息 */
  const AudioPlayInfo = ref<AudoPlayListItem>()
  /** 播放列表-当前歌曲 */
  const playListIndex = ref<number>(0)
  /** 播放列表 */
  const playList = ref<Array<AudoPlayListItem>>([])
  const playNextType = ref<'OrderPlay' | 'Repeat' | 'Shuffle'>('OrderPlay')
  const playListAlready = ref<Array<number>>([])
  /*var AudioContext = window.AudioContext
  const audioCtx = ref(new AudioContext())

  var oscillatorNode = audioCtx.value.createOscillator()
  var gainNode = audioCtx.value.createGain()
  var finish = audioCtx.value.destination*/
  const TimeRe = ref<NodeJS.Timer>()
  const fps = ref(100)
  async function runTimeRe() {
    if (TimeRe.value) await stopTimeRe()
    TimeRe.value = setInterval(TimeReFun, fps.value)
  }
  async function stopTimeRe() {
    if (TimeRe.value) {
      clearInterval(TimeRe.value)
      TimeRe.value == undefined
    }
  }

  async function TimeReFun() {
    //console.log(AudioObj.value.duration, AudioObj.value.currentTime)
    AudioPlayProgress.value = AudioObj.value.currentTime

    if (AudioObj.value.duration == AudioObj.value.currentTime) {
      playNext()
    }
  }

  function play() {
    AudioObj.value.play()
    console.log(AudioObj.value.paused, AudioObj.value.ended, AudioObj.value.error)

    if (AudioObj.value.paused) {
    } else {
      AudioPlayDuration.value = AudioObj.value.duration
      runTimeRe()
      AudioPlayState.value = 'play'
    }
  }

  function stop() {
    AudioObj.value.pause()
    stopTimeRe()
    AudioPlayState.value = 'stop'
  }
  function playInData(data: AudoPlayListItem, addList?: boolean) {
    if (AudioPlayInfo.value?.url == data.url) {
      play()
      return
    }
    if (addList) playList.value.push(data)
    AudioPlayInfo.value = data
    nextTick(() => {
      play()
    })
  }
  function playInList(index: number) {
    if (index > playList.value.length - 1) return
    if (index < 0) return
    if (playList.value.length == 0) return
    if (playListAlready.value.length > 0) {
      if (playListAlready.value.length > 2000) {
        playListAlready.value.splice(0, 1)
      }
      if (playListAlready.value[playListAlready.value.length - 1] != playListIndex.value) {
        playListAlready.value.push(playListIndex.value)
      }
    } else playListAlready.value.push(playListIndex.value)
    
    playListIndex.value = index
    if (AudioPlayInfo.value?.url == playList.value[index].url) {
      AudioObj.value.currentTime = 0
      play()
      return
    }
    AudioPlayInfo.value = playList.value[index]
    nextTick(() => {
      play()
    })
  }
  //上一曲
  function playLast() {
    AudioObj.value.currentTime = 0
    if (playListAlready.value.length - 2 <= 0) {
      playInList(0)
      return
    }
    playListAlready.value.pop()
    const i = playListAlready.value[playListAlready.value.length - 1]
    playInList(i)
  }
  //下一曲
  function playNext() {
    AudioObj.value.currentTime = 0
    switch (playNextType.value) {
      case 'OrderPlay':
        //顺序播放
        if (playListIndex.value + 1 > playList.value.length - 1) {
          playInList(0)
          return
        }
        playInList(playListIndex.value + 1)
        break
      case 'Repeat':
        //单曲循环
        playInList(playListIndex.value)
        break
      case 'Shuffle':
        //随机播放
        const i = Math.round(Math.random() * playList.value.length - 1)
        playInList(i)
        break
    }
  }
  function playListAdd(data: AudoPlayListItem) {
    playList.value.push(data)
  }
  function playListDel(index: number) {
    if (index > playList.value.length) return
    if (index < 0) return
    if (index < playListIndex.value) playListIndex.value - 1
    playList.value.splice(index, 1)
  }

  return {
    bindAudioObj,
    stop,
    play,
    playInData,
    playInList,
    playListDel,
    playListAdd,
    playLast,
    playNext,
    playList,
    AudioPlayInfo,
    AudioPlayState,
    AudioPlayDuration,
    AudioPlayProgress
  }
})
