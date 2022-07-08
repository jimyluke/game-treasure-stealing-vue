<template>
  <el-popover
    placement="bottom"
    :title="hero_name"
    width="260"
    trigger="hover"
    :open-delay="300">
    <div class="hero-expanded-stats">
      Hero Infomation
    </div>
    <div slot="reference">
      <label class="hero-name">{{ hero_name }}</label>
      <div class="hero-img">
        <el-checkbox v-model="heroStatus" :checked="isChecked" @change="toggleSelectHero"></el-checkbox>
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
      heroes_data: state => state.users.heroes_data
    }),

    meta(){
      return _.last(this.hero.info.meta);
    },

    token_adress(){
      return this.hero.mint;
    },

    hero_name(){
      return this.hero.info.TokenName.token_name;
    },

    hero_img(){
      return this.meta.image_url;
    },

    hero_tier(){
      return this.hero.info.hero_tier;
    },

    isChecked(){
      let self = this;
      const find = _.filter(this.heroes_data, h => {
        return h.mint === self.hero.mint && h.active === 1;
      })
      return find.length > 0? true: false;
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