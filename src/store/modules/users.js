import Users from '@/api/UserApi'
import { getToken, setToken, removeToken, getRefreshToken, setRefreshToken, removeRefreshToken } from '@/utilities/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    queued: false,
    game_playing_id: 0,
    game_id: 0,
    token: getToken(),
    refresh_token: getRefreshToken(),
    wallet: '',
    user: {},
    non_nft_entries: 0,
    heroes_mint: [],
    heroes_data: [],
    curent_game_info: {}
  }
}

const state = getDefaultState();

const getters = {
  heroes(state, getters, rootState){
    if(rootState.nfts === undefined)
      return [];
    return _.filter(rootState.nfts, nft => {
      return state.heroes_mint.indexOf(nft.mint) > -1;
    });
  },

  isLoggedIn(state){
    return state.token? true: false;
  },

  heroCommitedTotal(state){
    let findHero = _.filter(state.heroes_data, hero => {
      return hero.active === 1;
    })
    return findHero.length;
  }
}

const mutations = {
  SET_QUEUED: (state, status) => {
    state.queued = status;
  },

  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },

  SET_TOKEN: (state, token) => {
    state.token = token
  },

  SET_REFRESH_TOKEN: (state, token) => {
    state.refresh_token = token
  },

  SET_FULLNAME: (state, fullname) => {
    state.fullname = fullname
  },

  SET_WALLET: (state, wallet) => {
    state.wallet = wallet
  },

  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },

  SET_USER: (state, user) => {
    state.user = user
  },

  SET_HEROES_MINT: (state, list) => {
    state.heroes_mint = list;
  },

  SET_HEROES_DATA: (state, list) => {
    state.heroes_data = list;
  },

  SET_NON_NFT_ENTRIES: (state, amount) => {
    state.non_nft_entries = amount;
  },

  SET_CURENT_GAME_INFO: (sate, info) => {
    state.curent_game_info = info;
  },

  SET_GAME_PLAYING_ID: (state, id) => {
    state.game_playing_id = id;
  },

  SET_GAME_ID: (state, id) => {
    state.game_id = id;
  }
}

const actions = {
  login({ commit }, userInfo) {
    const { email, password } = userInfo
    return new Promise((resolve, reject) => {
      Users.login({ email: email.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        commit('SET_REFRESH_TOKEN', data.refresh_token)
        setToken(data.token)
        setRefreshToken(data.refresh_token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  refreshToken({ state, commit }) {
    return new Promise((resolve, reject) => {
      let data = {
        refresh_token: state.refresh_token
      }

      Users.refreshToken(data).then(response => {
        const { data } = response

        if(data.token !== null){
          commit('SET_TOKEN', data.token)
          setToken(data.token)
        }else{
          removeToken()
          removeRefreshToken();
        }
        
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ state, commit }) {
    return new Promise((resolve, reject) => {
      Users.getInfo().then(response => {
        const { data } = response
        let user = data.user;
        let heroes = data.heroes;
        let heroes_data = data.heroes_data;

        commit('SET_WALLET', user.wallet);
        commit('SET_USER', user);
        commit('SET_HEROES_MINT', heroes);
        commit('SET_HEROES_DATA', heroes_data);
        commit('SET_NON_NFT_ENTRIES', data.non_nft_entries);
        commit('SET_CURENT_GAME_INFO', data.current_entries);
        commit('SET_GAME_PLAYING_ID', data.game_playing_id);
        commit('SET_GAME_ID', data.game_id);

        commit('SET_NFTS_LOADING', false, {root: true});

        if(data.game_playing_id > 0){
          commit('SET_QUEUED', true);
        }

        resolve(data);
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ state, commit }) {
    return new Promise((resolve, reject) => {
      Users.logout().then(() => {
        removeToken() // must remove  token  first
        removeRefreshToken() // must remove  token  first

        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  },

  toggleSelectHero({ state, commit }, data) {
    return new Promise((resolve, reject) => {
      Users.toggleSelectHero(data).then( res => {
        //console.log(res)
        let update_heroes_data = [];
        state.heroes_data.forEach( h => {
          let _h = h;
          if(_h.mint === res.update.mint){
            _h.active = res.update.active;
          }
          update_heroes_data.push(_h);
        });
        commit('SET_HEROES_DATA', update_heroes_data);
        commit('SET_CURENT_GAME_INFO', res.game_info);

        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },

  updateNonNFTEntries({commit}, entries_total){
    return new Promise((resolve, reject) => {
      Users.updateNonNFTEntries({entries: entries_total}).then( res => {
        commit('SET_CURENT_GAME_INFO', res.game_info);
        resolve(res)
      }).catch( error => {
        console.log(error)
        reject(error)
      })
    });
  },

  enterGame({commit}){
    return new Promise((resolve, reject) => {
      Users.enterGame({}).then( res => {
        resolve(res)
      }).catch( error => {
        console.log(error)
        reject(error)
      })
    });
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}