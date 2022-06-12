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
  }
}
</script>

<style>
</style>
