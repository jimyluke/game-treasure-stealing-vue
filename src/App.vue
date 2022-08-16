<template>
  <div id="app">
    <Header />
    <router-view class="router-view" />
    <Footer />
  </div>
</template>

<script>
import Vue from 'vue';
import Header from '@/components/SiteHeader.vue';
import Footer from '@/components/SiteFooter.vue';
import "@/assets/css/_variables.scss";
import "@/assets/css/style.scss";
import { mapState } from 'vuex';

Vue.filter('currency', function (value) {
  if (typeof value !== "number") {
    return value;
  }
  var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
  });

  return formatter.format(value);
});

export default {
  components: {
    Header,
    Footer
  },

  computed: {
    ...mapState({
      socket: state => state.socket
    }),
  },

  mounted(){
    //this.$store.dispatch('get_nfts');
    //console.log(this.socket)
    this.socket.on('gts_connect', function(response) {
      console.log(response)
    });
    
    this.socket.on('game_update', function(response) {
      console.log(response)
    });
  }
}
</script>

<style>

@font-face {
  font-family: "Hand-Scribble";
  src: local("Hand-Scribble"),   url(./fonts/Hand-Scribble-Sketch-Times.otf) format("opentype");}
@font-face {
  font-family: "Ringbearer";
  src: local("Ringbearer"),   url(./fonts/Ringbearer\ Medium.ttf) format("truetype");}
@font-face {
  font-family: "Belmont";
  src: local("Belmont"),   url(./fonts/Belmont\ Regular.otf) format("opentype");}


</style>
