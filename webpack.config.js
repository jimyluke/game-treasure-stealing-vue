{
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      }, 
      {
          test: /\.s[a|c]ss$/,
          loader: 'style!css!sass'
      }
    ]
  },
  
  {
    loaders: {
      scss: 'style!css!sass'
    }
  }
}