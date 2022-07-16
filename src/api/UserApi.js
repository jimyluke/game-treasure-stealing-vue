import request from '@/utilities/request';
class UserApi {
  login(data){
    return request({
      url: '/auth/login',
      method: 'post',
      data
    })
  }

  connectWallet(data){
    return request({
      url: '/auth/connect-wallet',
      method: 'post',
      data
    })
  }

  refreshToken(data) {
    return request({
      url: '/auth/refresh-token',
      method: 'post',
      data
    })
  }
  
  getInfo(params) {
    return request({
      url: '/auth/info',
      method: 'get',
      params: params
    })
  }
  
  logout() {
    return request({
      url: '/auth/logout',
      method: 'post'
    })
  }

  toggleSelectHero(data) {
    return request({
      url: '/user/update-hero-status',
      method: 'post',
      data
    })
  }

  updateNonNFTEntries(data){
    return request({
      url: '/user/update-non-nft-entries',
      method: 'post',
      data
    })
  }

  enterGame(data){
    return request({
      url: '/user/enter-game',
      method: 'post',
      data
    })
  }
}

const User = new UserApi()
export { User as default }