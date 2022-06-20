<template>
  <div class="main-game-heroes-entries">
    <div class="container">
      <div class="section-wrapper">
        <div class="heroes-list col-left">
          <h3>Heroes</h3>

          <div class="heroes-list-inner">
            <ul v-if="loading">
              <li v-for="i in 6" :key="i">
                <HeroPlaceHolder />
              </li>
            </ul>
            <ul v-else>
              <li v-for="hero in heroes" :key="hero.mint">
                <HeroItem :hero="hero" />
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
              <label class="label-x">Cost Per Hero:</label> <del>$1.49</del> <span>$1.39 x 2</span><br />
              <label class="label-x">Hero Discount:</label> $0.10
            </div>
            <div class="sm-row">
              <label class="label-x">Non-NFT Entries:</label> <el-input-number v-model="num" controls-position="right" size="small"></el-input-number>
            </div>
            <div class="sm-row">
              <label class="label-x">Supercharge Entries:</label> <el-checkbox v-model="supercharge_entries"></el-checkbox> -50 Loot
            </div>
            <div class="sm-row last">
              <label class="label-x">Total Entries:</label> 7 <br />
              <label class="label-x">Total Cost:</label> <strong class="money">$10.23</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import HeroPlaceHolder from './HeroPlaceHolder.vue';
import HeroItem from './HeroItem.vue';

export default {
  data:() => ({
    heroesActive: {},
    num: '',
    supercharge_entries: false
  }),

  components: {
    HeroPlaceHolder,
    HeroItem
  },

  computed: {
    ...mapState({
      loading: state => state.nfts_loading,
      nfts: state => state.nfts,
      heroes_data: state => state.users.heroes_data
    }),

    ...mapGetters({
      heroes: 'users/heroes',
      heroCommitedTotal: 'users/heroCommitedTotal',
    }),

    heroTotal(){
      return this.heroes_data.length;
    },

    heroCommitedLabel(){
      return `${this.heroCommitedTotal}/${this.heroTotal}`;
    }
  },

  methods: {
    
  }
}
</script>