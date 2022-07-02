<template>
  <el-popover
    placement="bottom"
    :title="hero.data.name"
    width="260"
    trigger="hover"
    :open-delay="300">
    <div class="hero-expanded-stats">
      <!-- <el-row v-for="(val, key) in hero.data.customMetaData.attributes" :key="key">
        <label class="hero-attribute">{{key}}</label><span>{{val}}</span>
      </el-row> -->
      <!-- {{hero.data.customMetaData}} -->
      Hero Infomation
    </div>
    <div slot="reference">
      <label class="hero-name">{{ hero.data.name }}</label>
      <div class="hero-img">
        <el-checkbox v-model="heroStatus" :checked="isChecked" @change="toggleSelectHero"></el-checkbox>
        <img v-lazy="hero.data.customMetaData.image" />
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
</template>

<script>
import { mapState, mapActions } from 'vuex';
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
      this.toggleSelectHeroAction({hero_mint: hero.mint})
    }
  }
}
</script>