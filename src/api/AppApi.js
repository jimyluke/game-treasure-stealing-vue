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

  validAuth(){
    return request({
      url: `/app/valid`,
      method: 'post'
    })
  }
}

const App = new AppRequestAPI()
export { App as default}