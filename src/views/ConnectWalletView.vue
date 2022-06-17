<template>
  <div class="connect-wallet-layout">
    <div class="container">
      <h1 class="align-center">This is an connect wallet page</h1>
      <div class="align-center">
        <el-button :loading="loading" @click="fakeConnect">Connect</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  data(){
    return {
      loading: false,
      redirect: undefined
    }
  },

  watch: {
    $route: {
      handler: function(route) {
        console.log(route)
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },

  methods: {
    ...mapActions({
      login: 'users/login'
    }),

    fakeConnect(){
      this.loading = true;
      this.login({email: 'tai.ictu@gmail.com', password: 'stdev@123456'}).then( res => {
        console.log(res)
        this.$router.push({ path: this.redirect || '/' })
        this.loading = false;
      }).catch( error => {
        console.log(error)
        this.loading = false;
      })
    }
  }
}
</script>
