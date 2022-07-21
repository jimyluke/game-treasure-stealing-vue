import Vuex from 'vuex';
import Vue from 'vue';
import users from "./modules/users";
import App from "../api/AppApi";
import getters from './getters'

Vue.use(Vuex);

const io = require("socket.io-client");
const socket = io(process.env.VUE_APP_SOCKET_URL+'/gts.dashboard', {});

const store = new Vuex.Store({
  modules: {
    users: users
  },
  state: {
    version: '1.0.1',
    sidebar: false,
    device: '',
    nfts_loading: false,
    nfts: [],
    SolTotal: 0,
    socket: socket,
    game_info: {},
    node_type: 'devnet',
    sol_rate: 1,
    primary_wallet: ''
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
    },

    SET_GAME_INFO: (state, info) => {
      state.game_info = info;
    },

    SET_SOL_RATE: (state, rate) => {
      state.sol_rate = rate;
    },

    SET_PRIMARY_WALLET: (state, wallet_address) => {
      state.primary_wallet = wallet_address;
    },

    SET_NODE_TYPE: (state, type) => {
      state.node_type = type;
    }
  },

  actions: {
    get_game_info({commit}){
      return new Promise((resolve, reject) => {
        App.getGameInfo().then( res => {
          commit('SET_GAME_INFO', res.game_info);
          commit('SET_SOL_RATE', res.sol_usd_rate);
          commit('SET_PRIMARY_WALLET', res.primary_wallet);
          commit('SET_NODE_TYPE', res.node_type);
          resolve(res)
        }).catch( error => {
          console.log(error)
          reject(error)
        })
      });
    },

    valid({commit}){
      return new Promise((resolve, reject) => {
        App.validAuth().then( res => {
          resolve(res)
        }).catch( error => {
          console.log(error)
          reject(error)
        })
      });
    },

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
