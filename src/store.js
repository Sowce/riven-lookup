import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    rivens: [],
    init: false
  },
  mutations: {
    setRivens(state, rivens) {
      state.rivens = rivens;
      state.init = true;
    }
  },
  actions: {}
});

export default store;

fetch("https://n9e5v4d8.ssl.hwcdn.net/repos/weeklyRivensPC.json")
  .then(result => result.json())
  .then(rivens => {
    store.commit("setRivens", rivens);
  });
