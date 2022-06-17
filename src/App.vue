<template>
  <div id="app">
    <Header />
    <router-view class="router-view" />
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/SiteHeader.vue';
import Footer from '@/components/SiteFooter.vue';
import "@/assets/css/_variables.scss";
import "@/assets/css/style.scss";
export default {
  components: {
    Header,
    Footer
  },

  mounted(){
    this.$store.dispatch('get_nfts');
  }
}
</script>

<style>
</style>
