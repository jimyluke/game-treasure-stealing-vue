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
              <li v-for="hero in heroes" :key="hero.mint" @click="toggleSelectHero(hero)">
                <HeroItem :hero="hero" />
              </li>
            </ul>
          </div>
        </div>

        <div class="entries-section col-right">
          <h3>Entries</h3>
          <div class="entries-section-inner">
            <div class="status-n-action">
              <span>Hero's Commited: 5/5</span>
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
import { mapActions, mapGetters, mapState } from 'vuex';
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
      nfts: state => state.nfts
    }),
    ...mapGetters({
      heroes: 'users/heroes'
    })
  },

  methods: {
    ...mapActions({
      toggleSelectHeroAction: 'users/toggleSelectHero'
    }),
    toggleSelectHero(hero){
      console.log(hero)
      this.toggleSelectHeroAction({hero_mint: hero.mint})
    }
  }
}
</script>