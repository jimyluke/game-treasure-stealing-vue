import Vuex from 'vuex';
import Vue from 'vue';
import users from "./modules/users";
import App from "../api/AppApi";
import getters from './getters'

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    users: users
  },
  state: {
    version: '1.0.1',
    nfts_loading: false,
    nfts: [],
    SolTotal: 0,
  },
  getters,

  mutations: {
    SET_NFTS_LOADING: (state, status) => {
      state.nfts_loading = status;
    },

    SET_NFTS_DATA: (state, nfts) => {
      state.nfts = nfts;
    },

    SET_SOL_TOTAL: (state, total) => {
      state.SolTotal = total;
    }
  },

  actions: {
    get_nfts({commit}){
      commit('SET_NFTS_LOADING', true);
      return new Promise((resolve, reject) => {
        App.getNSTF().then( res => {
          commit('SET_NFTS_DATA', res.nfts);
          commit('SET_NFTS_LOADING', false);
          resolve(res)
        }).catch( error => {
          console.log(error)
          commit('SET_NFTS_LOADING', false);
          reject(error)
        })
      });
    }
  }
});

export default store;
