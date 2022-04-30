import { defineStore } from 'pinia'
import { Ref, ref } from 'vue'

export interface singerInfo {
  name: string
  id: string
  img: string
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
  url: string
  defUrl: number
  path: string
  id: string
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
  /** 播放信息 */
  const AudioPlayInfo = ref<AudoPlayListItem>()
  /** 播放列表-当前歌曲 */
  const playListIndex = ref<number>(0)
  /** 播放列表 */
  const playList = ref<Array<AudoPlayListItem>>([])

  /*var AudioContext = window.AudioContext
  const audioCtx = ref(new AudioContext())

  var oscillatorNode = audioCtx.value.createOscillator()
  var gainNode = audioCtx.value.createGain()
  var finish = audioCtx.value.destination*/
  const TimeRe = ref<NodeJS.Timer>()
  const fps = ref(1000)
  async function runTimeRe() {
    if (TimeRe.value) await stopTimeRe()
    TimeRe.value = setInterval(TimeReFun, fps.value)
    console.log(TimeRe)
  }
  async function stopTimeRe() {
    console.log(TimeRe.value)
    if (TimeRe.value) {
      clearInterval(TimeRe.value)
      TimeRe.value == undefined
    }
  }

  async function TimeReFun() {
    console.log(AudioObj.value.duration, AudioObj.value.currentTime)
  }

  function play() {
    AudioObj.value.play()
    runTimeRe()
    AudioPlayState.value = 'play'
  }

  function stop() {
    AudioObj.value.pause()
    stopTimeRe()
    AudioPlayState.value = 'stop'
  }

  return { bindAudioObj, stop, play, playList,AudioPlayInfo, AudioPlayState }
})
