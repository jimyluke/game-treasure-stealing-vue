<template>
  <div class="home">
    <MainSection />
    <HeroesEntriesSection />
  </div>
</template>

<script>
import MainSection from '@/components/main-game/MainSection.vue';
import HeroesEntriesSection from '@/components/main-game/HeroesEntriesSection.vue';
export default {
  name: 'HomeView',
  components: {
    MainSection,
    HeroesEntriesSection
  }
}
</script>
