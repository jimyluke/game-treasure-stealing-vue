<template>
  <div class="inventory-layout">
    <div class="container">
      <h1>Inventory</h1>
      <div class="heroes-wrapper mb-30">
        <HeroItem v-for="hero in heroes_data" :hero="hero" :key="hero.mint" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import HeroItem from '@/components/inventory/HeroItem.vue';

export default {
  data(){
    return {

    }
  },

  components: {
    HeroItem
  },

  computed: {
    ...mapState({
      heroes_data: state => state.users.heroes_data
    }),
  }
}
</script>
