const getters = {
  sidebar: state => state.sidebar,
  device: state => state.device,
  token: state => state.users.token,
  avatar: state => state.users.avatar,
  name: state => state.users.name
}
export default getters
