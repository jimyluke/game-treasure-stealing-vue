import request from '@/utilities/request';
class AppRequestAPI {
  getNSTF(){
    return request({
      url: `https://cryptoquestnft.com/api/nfts/all`,
      method: 'get'
    })
  }
}

const App = new AppRequestAPI()
export { App as default}