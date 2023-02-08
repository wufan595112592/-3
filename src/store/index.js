import { createStore } from 'vuex'
import D3Mixin from '@/hooks/D3Mixin'
let { FullScreen } = D3Mixin()

export default createStore ({
  state: {
    isFullScreen: false
  },
  mutations: {
    toggleFullScreen(state) {
      FullScreen(state.isFullScreen);
      state.isFullScreen = !state.isFullScreen;
    }
  },
  actions: {},
  modules: {}
})