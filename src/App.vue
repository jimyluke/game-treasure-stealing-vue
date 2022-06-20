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
import { mapState } from 'vuex';
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
    this.$store.dispatch('get_nfts');
    //console.log(this.socket)
    this.socket.on('gts_connect', function(response) {
      console.log(response)
    });
  }
}
</script>

<style>
</style>
