<template>
  <div class="main-game-heroes-entries" v-if="queued">
    <div class="container">
      <div class="section-wrapper">
        <div class="heroes-list col-left">
          <h3>Heroes ({{heroes.length}})</h3>

          <div class="heroes-list-inner mb-30">
            <div class="heroes-list-inner">
              <ul v-if="loading">
                <li v-for="i in 3" :key="i">
                  <HeroPlaceHolder :is-loading="true" />
                </li>
              </ul>
              <ul v-else>
                <li v-for="hero in heroes_data" :key="hero.mint">
                  <HeroItemX :hero="hero" />
                </li>
              </ul>
              <ul v-if="!loading && heroes.length == 0">
                <li v-for="i in 3" :key="i">
                  <HeroPlaceHolder />
                </li>
              </ul>
            </div>
          </div>

          <!-- <div class="heroes-list-inner">
            <ul v-if="loading">
              <li v-for="i in 3" :key="i">
                <HeroPlaceHolder :is-loading="true" />
              </li>
            </ul>
            <ul v-else>
              <li v-for="hero in heroes" :key="hero.mint">
                <HeroItem :hero="hero" />
              </li>
            </ul>
            <ul v-if="!loading && heroes.length == 0">
              <li v-for="i in 3" :key="i">
                <HeroPlaceHolder />
              </li>
            </ul>
          </div> -->
        </div>

        <div class="entries-section col-right">
          <h3>Entries</h3>
          <div class="entries-section-inner">
            <div class="status-n-action">
              <span>Entries Committed: {{ heroCommitedLabel }}</span>
              <el-button type="text">Select All</el-button>
            </div>
            <div class="sm-row">
              <label class="label-x">Cost Per Hero:</label> 
              <del>{{ costPerHeroOrigin | currency }}</del> 
              <span class="inline-block ml-10">{{ costPerHero | currency }} x {{heroCount}}</span><br />
              <label class="label-x">Hero Discount:</label> {{ disCount | currency }}
            </div>
            <div class="sm-row">
              <label class="label-x">Non-NFT Entries:</label>
              <el-input-number 
                v-model="non_nft_entries_input" 
                controls-position="right" 
                size="small" 
                @change="handleNonNftEntries"
                :min="0">
              </el-input-number>
            </div>
            <div class="sm-row">
              <label class="label-x">Loot boost? Enchanted Entries?:</label> <el-checkbox v-model="loot_boost">-50 Loot</el-checkbox>
            </div>
            <div class="sm-row">
              <label class="label-x">Total Entries:</label> {{ curent_game_info.entry_total }} <br />
              <label class="label-x">Total Cost:</label> <strong class="money">{{ curent_game_info.TotalSpent | currency }} <i class="amout-sol">({{amount}} Sol)</i></strong>
            </div>

            <div class="sm-row last">
              <el-button 
                class="queue-thieves-button" 
                type="primary" 
                :loading="entering" 
                @click="transferSOL"
                :disabled="isDisabled">Queue Thieves</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Connection, clusterApiUrl, PublicKey, SystemProgram, LAMPORTS_PER_SOL, Transaction } from '@solana/web3.js'
import { mapActions, mapGetters, mapState } from 'vuex';
import HeroPlaceHolder from './HeroPlaceHolder.vue';
import HeroItem from './HeroItem.vue';
import HeroItemX from './HeroItemX.vue';
import MainMX from '@/mixins/MainMX';

export default {
  data:() => ({
    heroesActive: {},
    non_nft_entries_input: '',
    loot_boost: false,
    entering: false
  }),

  mixins: [MainMX],

  components: {
    HeroPlaceHolder,
    HeroItem,
    HeroItemX
  },

  computed: {
    ...mapState({
      queued: state => state.users.queued,
      game_playing_id: state => state.users.game_playing_id,
      loading: state => state.nfts_loading,
      nfts: state => state.nfts,
      heroes_data: state => state.users.heroes_data,
      non_nft_entries: state => state.users.non_nft_entries,
      curent_game_info: state => state.users.curent_game_info,
      solRate: state => state.sol_rate,
      primaryWallet: state => state.primary_wallet
    }),

    ...mapGetters({
      heroes: 'users/heroes',
      heroCommitedTotal: 'users/heroCommitedTotal',
    }),

    provider(){
      return this.getProvider();
    },

    heroTotal(){
      return this.heroes_data.length;
    },

    heroCount(){
      const nne_hero = this.non_nft_entries;
      return this.heroCommitedTotal + nne_hero;
    },

    totalEntries(){
      return this.curent_game_info.entry_total;
    },

    totalSpent(){
      return this.curent_game_info.TotalSpent;
    },

    costPerHeroOrigin(){
      if(this.heroCount === 0)
        return 0;
      return this.totalEntries / this.heroCount;
    },

    costPerHero(){
      if(this.heroCount === 0)
        return 0;
      return this.totalSpent / this.totalEntries;
    },

    disCount(){
      return this.costPerHeroOrigin - this.costPerHero;
    },

    heroCommitedLabel(){
      return `${this.heroCommitedTotal}/${this.heroTotal}`;
    },

    isDisabled(){
      return this.heroCount === 0 && this.non_nft_entries_input === 0;
    },

    amount(){
      let amount = 1/this.solRate*parseFloat(this.totalSpent);
      amount = amount.toFixed(2);
      return amount;
    }
  },

  watch: {
    non_nft_entries(newVal, oldVal){
      if(newVal !== oldVal){
        if(newVal === '' || newVal === undefined)
          newVal = 0;
        this.non_nft_entries_input = newVal;
      }
    }
  },

  mounted() {
    //console.log(this.non_nft_entries)
    this.non_nft_entries_input = this.non_nft_entries;
    this.getConnectInfo();
  },

  methods: {
    ...mapActions({
      updateNonNFTEntries: 'users/updateNonNFTEntries',
      enterGame: 'users/enterGame',
      doLogout: 'users/logout'
    }),

    handleNonNftEntries(value){
      if(value === '' || value === undefined)
        value = 0;
      this.non_nft_entries_input = 0;

      this.$store.commit('users/SET_NON_NFT_ENTRIES', value);
      this.updateNonNFTEntries(value).then( () => {
        this.$store.dispatch('get_game_info');
      }).catch( error => {
        console.log(error)
      })
    },

    enterGameToday(){
      this.enterGame().then( () => {
        this.entering = false;
        this.$store.dispatch('get_game_info');
        this.$notify({
          title: 'Success',
          message: 'This is a success message',
          type: 'success'
        });
      }).catch(error => {
        this.entering = false;
      });
    },

    async getConnectInfo(){
      //const provider = this.provider;
      this.provider.connect({ onlyIfTrusted: true })
        .then(({ publicKey }) => {
            // Handle successful eager connection
            console.log(publicKey.toString())
        }).catch( async (error) => {
          console.log(error);
            // Handle connection failure as usual
          await this.doLogout();
          this.$router.push(`/connect-wallet?redirect=${this.$route.fullPath}`)
        })


      //console.log(provider.publicKey.toString());
        // 26qv4GCcx98RihuK3c4T6ozB3J7L6VwCuFVc7Ta2A3Uo 
      //console.log(provider.isConnected);
      // true
    },

    async transferSOL() {
      this.entering = true;
      const amount = this.amount;
      const commitment = 'confirmed';
      // Detecing and storing the phantom wallet of the user (creator in this case)
      var provider = this.provider;
      console.log("Public key of the emitter: ", provider.publicKey.toString());

      // Establishing connection
      const connection = new Connection(clusterApiUrl('testnet'), commitment)

      // Airdrop some SOL to the sender's wallet, so that it can handle the txn fee
      // var airdropSignature = await connection.requestAirdrop(
      //   provider.publicKey,
      //   LAMPORTS_PER_SOL,
      // );

      // // Confirming that the airdrop went through
      // await connection.confirmTransaction(airdropSignature);
      // console.log("Airdropped");

      try{
        var transaction = new Transaction().add(
          SystemProgram.transfer({
            fromPubkey: provider.publicKey,
            toPubkey: new PublicKey(this.primaryWallet),
            lamports: (amount*LAMPORTS_PER_SOL) //Investing 1 SOL. Remember 1 Lamport = 10^-9 SOL.
          }),
        );
        
        // Setting the variables for the transaction
        transaction.feePayer = await provider.publicKey;
        //let blockhashObj = await connection.getRecentBlockhash();
        let blockhash = (await connection.getLatestBlockhash("finalized")).blockhash;
        transaction.recentBlockhash = blockhash;

        // Transaction constructor initialized successfully
        if(transaction) {
          console.log("Txn created successfully");
        }
        
        // Request creator to sign the transaction (allow the transaction)
        let signed = await provider.signTransaction(transaction);
        // The signature is generated
        let signature = await connection.sendRawTransaction(signed.serialize());
        // Confirm whether the transaction went through or not
        await connection.confirmTransaction(signature);

        //Signature chhap diya idhar
        console.log("Signature: ", signature);
        this.enterGameToday(signature);
      }catch(error){
        console.log(error);
        this.entering = false;
      };
    },
  }
}
</script>