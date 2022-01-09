// 狀態管理模組
import { SET_WIN_WIDTH, SET_IS_SCROLL } from "@/store/mutation-types";
export default {
  namespaced: true,
  state: {
    // 視窗寬
    windowWidth: 0,
    // 捲動距離
    isScroll: false,
  },
  mutations: {
    // 變更 state 視窗寬
    [SET_WIN_WIDTH](state, val) {
      state.windowWidth = val;
    },
    // 向下捲動位移
    [SET_IS_SCROLL](state, val) {
      state.isScroll = val;
    },
  },
  actions: {
    /**
     * 更新視窗高
     *
     * @param {Store} context - 狀態倉儲
     * @param {number} val - 視窗高
     */
    setWindowWidth({ commit }, val) {
      commit(SET_WIN_WIDTH, val);
    },
    /**
     * 更新是否向下捲動
     *
     * @param {Store} context - 狀態倉儲
     * @param {number} val - 向下捲動位移
     */
    setIsScroll({ commit }, val) {
      commit(SET_IS_SCROLL, val);
    },
  },
};
