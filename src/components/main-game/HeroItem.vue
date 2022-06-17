<template>
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
        <el-checkbox v-model="heroStatus"></el-checkbox>
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
</template>

<script>
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
    
  },

  methods: {

  }
}
</script>