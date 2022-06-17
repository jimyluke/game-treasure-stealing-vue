<template>
  <div class="main-game-section">
    <div class="container">
      <el-row class="game-top-section mb-30">
        <el-col :span="8">
          <span class="sh1">SOL <span class="money">$500</span></span>
        </el-col>
        <el-col :span="8" class="align-center">
          <span class="sh1">Daily bonus <span class="money">$3</span></span>
        </el-col>
        <el-col class="align-right" :span="8">
          <span class="block">Thieving Skill: 100</span>
          <span class="block">Your Total Loot: 504</span>
          <span class="block">Your Commited Loot: 20</span>
        </el-col>
      </el-row>

      <div class="monster-section">
        <el-row class="monster-section-info">
          <el-col :span="8">
            <span class="block sh2">Steal Store</span>
            <span class="block sh3">Master of Mun</span>
          </el-col>
          <el-col :span="8" class="align-center">
            <span class="block sh2">Bonenosher's Bounty</span>
            <span class="block sh2 money">+$3,746</span>
          </el-col>
          <el-col class="align-right" :span="8">
            <span class="block">Loot: <span class="money">+207</span> <span class="loot-loose">(+/- 20)</span></span>
            <span class="block">Thieves Guide: Rank 11</span>
          </el-col>
        </el-row>

        <div class="align-center">
          <img src="@/assets/images/monster.png" />
        </div>
        <div class="enter-action"><a class="enter-button" href="javascript:void(0)">Enter</a></div>
      </div>
    </div>
  </div>
</template>