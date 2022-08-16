<template>
  <div class="header">
    <div class="container-head">
      <nav class="main-menu left-side">
        <a class="header-logo" title="Crypto Quest - Home Page" href="https://cryptoquestnft.com">
          <img class="header-logo__back" src="../assets/images/header/Ribbon.svg"/>
          <img class="header-logo__front" src="../assets/images/header/CQ big.png"/>
        </a>
      </nav>

     <nav class="nav ripped-right">
      <div class="nav__container">
        <ul class="nav__menu">
          <p class="hidden-desktop">
            <a href="https://cryptoquestnft.com">Home</a>
          </p>
          <p>
            <a href="https://cryptoquestnft.com/nfts">Nfts</a>
          </p>
          <p>
            <a href="https://cryptoquestnft.com/inventory">Inventory</a>
          </p>
          <p>
            <a href="https://cryptoquestnft.com/mobile">Mobile</a>
          </p>
          <p>
            <a href="https://cryptoquestnft.com/podcast">Podcast</a>
          </p>
          <p>
            <a
              href="https://docs.cryptoquestnft.com"
              target="_blank"
              rel="noreferrer"
            >
              Whitepaper
            </a>
          </p>
          <p>
            <a href="https://cryptoquestnft.com/">Terms</a>
          </p>
        </ul>

        <ul class="header__icons header__icons--mobile justify-content-center icon-group mt-6 hidden-desktop">
          <p class="d-flex">
            <button
              class="border-none bg-transparent"
            >
            </button>


          </p>
          <p class="d-flex">
            <a
              href="https://twitter.com/CryptoQuest_NFT"
              target="_blank"
              rel="noreferrer"
            >
            </a>
          </p>
        </ul>
      </div>
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
            <el-button class="wallet-button" @click="logout">Disconnect</el-button>
          </div>

          <el-button type="text" slot="reference" icon="el-icon-user-solid">My Account</el-button>
        </el-popover>
      </div>

      <div class="right-side" v-else>
        <router-link to="/connect-wallet">
        <button class="wallet-button">
        
        <span>Connect Wallet</span>
        </button>
        </router-link>
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