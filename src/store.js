// src/store.js
import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      data: null,
      loading: false,
      error: null,
    };
  },
  mutations: {
    setLoading(state, payload) {
      state.loading = payload;
    },
    setData(state, payload) {
      state.data = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
  },
  actions: {
    async fetchData({ commit }, query = '') {
      commit('setLoading', true);
      commit('setError', null);
      try {
        // Substitua pela URL da sua API
        var cep = query.replace('-','')
        const response = await fetch(`http://localhost/cep-api/${cep}/`);

        if (!response.ok) {
          throw new Error(`Erro na requisição: ${response.statusText}`);
        }

        const resp = await response.json();
        const {data} = resp;
        commit('setData', data);
      } catch (error) {
        commit('setError', error.message);
      } finally {
        commit('setLoading', false);
      }
    },
  },
  getters: {
    getData(state) {
      return state.data;
    },
    isLoading(state) {
      return state.loading;
    },
    getError(state) {
      return state.error;
    },
  },
});

export default store;
