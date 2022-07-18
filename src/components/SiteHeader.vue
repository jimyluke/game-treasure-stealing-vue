<template>
  <div class="header-section">
    <div class="container">
      <nav class="main-menu left-side">
        <router-link to="/">Home</router-link>
        <router-link to="/inventory">Inventory</router-link>
      </nav>

      <div class="user-coin-info right-side" v-if="isLoggedIn">
        <span>{{ totalSol }} SOL ({{inDollars | currency}})</span>
        <span>{{ totalLoot }} Loot</span>

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
import MainMX from '@/mixins/MainMX';

export default {
  data(){
    return {

    }
  },

  mixins: [MainMX],

  computed: {
    ...mapState({
      wallet: state => state.users.wallet,
      wallet_balance: state => state.users.wallet_balance,
      user: state => state.users.user,
      sol_rate: state => state.sol_rate
    }),

    isPhantom(){
      return solana?.isPhantom;
    },

    provider(){
      return this.getProvider();
    },

    ...mapGetters({
      isLoggedIn: 'users/isLoggedIn'
    }),

    totalSol(){
      return this.wallet_balance;
    },

    inDollars(){
      return this.totalSol*this.sol_rate;
    },

    totalLoot(){
      return this.user.total_loot;
    }
  },

  methods: {
    ...mapActions({
      doLogout: 'users/logout'
    }),

    async logout(){
      this.disconnectPhantom();
      await this.doLogout();
      this.$router.push(`/connect-wallet?redirect=${this.$route.fullPath}`)
    },

    copyWallet(){
      copy(this.wallet);
      this.$message({
        message: 'Wallet address copied.',
        type: 'success'
      });
    },

    async disconnectPhantom(){
      console.log(this.provider)
      this.provider.disconnect();
    },
  }
}
</script>