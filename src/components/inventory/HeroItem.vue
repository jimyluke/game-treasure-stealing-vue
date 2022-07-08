<template>
  <div class="inventory-hero-item">
    <h3 class="hero-name">{{ hero_name }}</h3>
    <div class="hero-img">
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
</template>

<script>
import {mapState} from 'vuex';

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
    }
  },

  methods: {
    
  },
}
</script>