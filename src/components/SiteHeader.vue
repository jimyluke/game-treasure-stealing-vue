<template>
  <div class="header-section">
    <div class="container">
      <nav class="main-menu left-side">
        <router-link to="/">Home</router-link>
        <router-link to="/inventory">Inventory</router-link>
      </nav>

      <div class="user-coin-info right-side" v-if="isLoggedIn">
        <span>{{ totalSol }} SOL ($5)</span>
        <span>504 thief coin</span>

        <el-popover
          placement="bottom"
          title="My Account"
          width="260"
          trigger="click">
          <div class="p-row">
            <label class="block">Wallet Address: </label>
            <strong>{{ wallet }}</strong> <el-button icon="el-icon-copy-document" type="text" @click="copyWallet"></el-button>
          </div>
          <div class="p-row">
            <label class="block">Balance:</label>
            <strong>{{ totalSol }} SOL</strong>
          </div>
          <div class="p-row">
            <el-button @click="logout">Disconnect</el-button>
          </div>

          <el-button type="text" slot="reference" icon="el-icon-user-solid">My Account</el-button>
        </el-popover>
      </div>

      <div class="user-coin-info right-side" v-else>
        <router-link to="/connect-wallet">Connect Wallet</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import copy from 'copy-to-clipboard';
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
  data(){
    return {

    }
  },

  computed: {
    ...mapState({
      wallet: state => state.users.wallet,
      user: state => state.users.user,
    }),

    ...mapGetters({
      isLoggedIn: 'users/isLoggedIn'
    }),

    totalSol(){
      return this.user.sol_balance;
    }
  },

  methods: {
    ...mapActions({
      doLogout: 'users/logout'
    }),

    async logout(){
      await this.doLogout();
      this.$router.push(`/connect-wallet?redirect=${this.$route.fullPath}`)
    },

    copyWallet(){
      copy(this.wallet);
      this.$message({
        message: 'Wallet address copied.',
        type: 'success'
      });
    }
  }
}
</script>