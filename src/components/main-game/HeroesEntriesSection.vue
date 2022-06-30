<template>
  <div class="main-game-heroes-entries">
    <div class="container">
      <div class="section-wrapper">
        <div class="heroes-list col-left">
          <h3>Heroes ({{heroes.length}})</h3>

          <div class="heroes-list-inner">
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
          </div>
        </div>

        <div class="entries-section col-right">
          <h3>Entries</h3>
          <div class="entries-section-inner">
            <div class="status-n-action">
              <span>Hero's Commited: {{ heroCommitedLabel }}</span>
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
            <div class="sm-row last">
              <label class="label-x">Total Entries:</label> {{ curent_game_info.entry_total }} <br />
              <label class="label-x">Total Cost:</label> <strong class="money">{{ curent_game_info.TotalSpent | currency }}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import HeroPlaceHolder from './HeroPlaceHolder.vue';
import HeroItem from './HeroItem.vue';

export default {
  data:() => ({
    heroesActive: {},
    non_nft_entries_input: '',
    loot_boost: false
  }),

  components: {
    HeroPlaceHolder,
    HeroItem
  },

  computed: {
    ...mapState({
      loading: state => state.nfts_loading,
      nfts: state => state.nfts,
      heroes_data: state => state.users.heroes_data,
      non_nft_entries: state => state.users.non_nft_entries,
      curent_game_info: state => state.users.curent_game_info,
    }),

    ...mapGetters({
      heroes: 'users/heroes',
      heroCommitedTotal: 'users/heroCommitedTotal',
    }),

    heroTotal(){
      return this.heroes_data.length;
    },

    heroCount(){
      const nne_hero = this.non_nft_entries > 0? 1: 0;
      return this.heroCommitedTotal + nne_hero;
    },

    costPerHeroOrigin(){
      if(this.heroCount === 0)
        return 0;
      return this.curent_game_info.entry_total / this.heroCount;
    },

    costPerHero(){
      if(this.heroCount === 0)
        return 0;
      return this.curent_game_info.TotalSpent / this.heroCount;
    },

    disCount(){
      return this.costPerHeroOrigin - this.costPerHero;
    },

    heroCommitedLabel(){
      return `${this.heroCommitedTotal}/${this.heroTotal}`;
    }
  },

  watch: {
    non_nft_entries(newVal, oldVal){
      if(newVal !== oldVal){
        this.non_nft_entries_input = newVal;
      }
    }
  },

  mounted() {
    //console.log(this.non_nft_entries)
    this.non_nft_entries_input = this.non_nft_entries;
  },

  methods: {
    ...mapActions({
      updateNonNFTEntries: 'users/updateNonNFTEntries'
    }),

    handleNonNftEntries(value){
      this.$store.commit('users/SET_NON_NFT_ENTRIES', value);
      this.updateNonNFTEntries(value).then( res => {
        //console.log(res)
      }).catch( error => {
        console.log(error)
      })
    }
  }
}
</script>