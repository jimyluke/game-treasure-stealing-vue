<template>
  <div class="main-game-section">
    <div class="container">
      <div class="monster-section">
        <el-row class="monster-section-info">
          <el-col :span="8">
            <span class="block sh2"></span>
          </el-col>
          <el-col :span="8" class="align-center">
            <span class="block sh2">Bonenosher's Bounty</span>
            <span class="block sh2 money">{{ bonenosherBountyTotal | currency }} <i class="el-icon-info"></i></span>
            <span class="block sh3 money w-plus">{{ bonenosherBountyLoose | currency }} <i class="el-icon-info"></i></span>
          </el-col>
          <el-col class="align-right thieves-guide" :span="8">
            <span class="block">Thieves Guide Standing</span>
            <span class="block thieves-guide-standing"><span>{{ thievesGuideStandingActive }}</span>/{{ thievesGuideStandingTotal }}</span>
          </el-col>
        </el-row>

        <div class="align-center">
          <img src="@/assets/images/monster.png" />
        </div>

        <div class="enter-action">
          <div class="info-boxed">
            <el-row class="IB-x834" :gutter="20">
              <el-col :span="8">
                <span class="sp-timer">{{countDown}}</span>
                <span class="spb-03">QUEUE</span>
                <span>Queued Thieves: {{ queuedThieves }}</span>
              </el-col>
              <el-col :span="8">
                <a href="javascript:void(0)" @click="openChest">
                  <span class="chest-icon closed-status"></span>
                  <span>Reveal Rewards</span>
                </a>
              </el-col>
              <el-col :span="8">
                <span class="sp-live">LIVE</span>
                <span class="spb-03">WATCH</span>
                <span>Active Thieves: {{ activeThieves }}</span>
              </el-col>
            </el-row>
          </div>
        </div>

        <!-- <div class="enter-action"><a class="enter-button" href="javascript:void(0)" @click="enterGameToday">
          <i class="el-icon-loading" v-if="loading" style="margin-right: 5px;"></i>Enter</a>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
var moment = require('moment');
import { mapActions, mapState } from 'vuex';

export default {
  data(){
    return {
      loading: false,
      time_in_seconds: 0
    }
  },

  computed: {
    ...mapState({
      game_info: state => state.game_info
    }),

    bonenosherBountyTotal(){
      return this.game_info.bonenosher_bounty.total;
    },

    bonenosherBountyLoose(){
      return this.game_info.bonenosher_bounty.loose;
    },
    
    thievesGuideStandingActive(){
      return this.game_info.thieves_guide_standing.active;
    },

    thievesGuideStandingTotal(){
      return this.game_info.thieves_guide_standing.total;
    },

    queuedThieves(){
      return this.game_info.queued_thieves;
    },

    activeThieves(){
      return this.game_info.active_thieves;
    },

    countDown(){
      var sec_num = parseInt(this.time_in_seconds, 10)
      var hours   = Math.floor(sec_num / 3600)
      var minutes = Math.floor(sec_num / 60) % 60
      var seconds = sec_num % 60

      return [hours,minutes,seconds]
          .map(v => v < 10 ? "0" + v : v)
          .filter((v,i) => v !== "00" || i > 0)
          .join(":")
    }
  },

  mounted() {
    let _this = this;
    setInterval(function(){
      var now = moment(new Date().toLocaleString("en-US", {timeZone: "UTC"})); //todays date
      var end = moment(new Date(_this.game_info.wake_time)); // another date
      var duration = moment.duration(end.diff(now));
      _this.time_in_seconds = duration.asSeconds();
    }, 1000);
  },

  methods: {
    ...mapActions({
      enterGame: 'users/enterGame'
    }),

    enterGameToday(){
      if(this.loading)
        return false;

      this.loading = true;
      this.enterGame().then( () => {
        this.loading = false;
      });
    },

    openChest(){
      console.log('Open Chest')
    }
  }
}
</script>