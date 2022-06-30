import request from '@/utilities/request';
class AppRequestAPI {
  getGameInfo(){
    return request({
      url: `/game/info`,
      method: 'get'
    })
  }

  getNSTF(){
    return request({
      url: `https://cryptoquestnft.com/api/nfts/all`,
      method: 'get'
    })
  }
}

const App = new AppRequestAPI()
export { App as default}