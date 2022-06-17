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
                <el-popover
                  placement="right"
                  :title="hero.data.name"
                  width="260"
                  trigger="hover"
                  :open-delay="500">
                  <div class="hero-expanded-stats">
                    <el-row v-for="(val, key) in hero.data.customMetaData.attributes" :key="key">
                      <label class="hero-attribute">{{key}}</label><span>{{val}}</span>
                    </el-row>
                    <!-- {{hero.data.customMetaData}} -->
                  </div>
                  <div slot="reference">
                    <label>{{ hero.data.name }}</label>
                    <div class="hero-img">
                      <el-checkbox v-model="option"></el-checkbox>
                      <img :src="hero.data.customMetaData.image" />
                    </div>
                    <div class="block">
                      <span>Hero Tier: <strong> 
                        <span v-if="hero.data && hero.data.customMetaData.attributes">{{ hero.data.customMetaData.attributes.heroTier }}</span>
                        <span v-else>None</span></strong>
                      </span>
                    </div>
                    <div class="block">
                      <span>Thieving Skill:</span> <span class="good">Good</span>
                    </div>
                  </div>
                </el-popover>
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
              <label class="label-x">Supercharge Entries:</label> <el-checkbox v-model="option"></el-checkbox> -50 Loot
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

export default {
  data:() => ({
    option: true,
    num: ''
  }),

  components: {
    HeroPlaceHolder
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
    toggleSelectHero(hero){
      console.log(hero)
    }
  }
}
</script>