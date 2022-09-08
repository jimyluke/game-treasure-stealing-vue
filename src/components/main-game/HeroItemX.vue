<template>
  <el-popover
    placement="bottom"
    :title="hero_name"
    width="260"
    trigger="hover"
    :open-delay="300">
    <div class="hero-expanded-stats">
      <div>
        <label>Times Queued</label>: <span>{{ times_queued }}</span>
      </div>
      <div>
        <label>Times Won</label>: <span>{{ times_won }}</span>
      </div>
      <div>
        <label>SOL Earned</label>: <span>{{ SOL_Earned }}</span>
      </div>
    </div>
    <div slot="reference">
      <label class="hero-name">{{ hero_name }}</label>
      <div class="hero-img">
        <el-checkbox v-model="heroStatus" :checked="isChecked" @change="toggleSelectHero" :disabled="isDisabled"></el-checkbox>
        <img v-lazy="hero_img" />
      </div>
      <div class="block">
        <span>Hero Tier: <strong> 
          <span v-if="hero_tier">{{ hero_tier }}</span>
          <span v-else>None</span></strong>
        </span>
      </div>
      <div class="block">
        <span>Thieving Skill:</span> <span class="good">Good</span>
      </div>
    </div>
  </el-popover>
</template>

<script>
import { indexOf } from 'lodash';
import {mapState, mapActions} from 'vuex';

export default {
  data(){
    return {
      heroStatus: false
    }
  },

  props: {
    hero: {
      default: () => {},
      type: Object
    }
  },

  computed: {
    ...mapState({
      heroes_data: state => state.users.heroes_data,
      submitted: state => state.users.submitted,
    }),

    meta(){
      if(this.hero.info === undefined)
        return {};
      return _.last(this.hero.info.meta);
    },

    token_adress(){
      return this.hero.mint;
    },

    hero_name(){
      if(this.hero.info === undefined){
        return 'Unknown';
      }
      return this.hero.info.TokenName.token_name;
    },

    hero_img(){
      return this.meta.image_url;
    },

    hero_tier(){
      if(this.hero.info === undefined)
        return '';
      return this.hero.info.hero_tier;
    },

    isChecked(){
      let self = this;
      const find = _.filter(this.heroes_data, h => {
        return h.mint === self.hero.mint && h.active === 1;
      })
      return find.length > 0? true: false;
    },

    lastSubmitted(){
      return _.last(this.submitted);
    },

    submitted_tokens(){
      if(this.lastSubmitted){
        return this.lastSubmitted.tokens;
      }
      return [];
    },

    isDisabled(){
      return this.submitted_tokens.indexOf(this.hero.mint) > -1? true: false;
    },

    extra_info(){
      return this.hero.extra_data || { times_queued: 0, times_won: 0, sol_earned: 0 };
    },

    times_queued(){
      return this.extra_info.times_queued;
    },

    times_won(){
      return this.extra_info.times_won;
    },

    SOL_Earned(){
      return this.extra_info.sol_earned;
    }
  },

  methods: {
    ...mapActions({
      toggleSelectHeroAction: 'users/toggleSelectHero'
    }),

    toggleSelectHero(){
      const hero = this.hero;
      this.toggleSelectHeroAction({hero_mint: hero.mint}).then( () => {
        this.$store.dispatch('get_game_info');
      })
    }
  },
}
</script>