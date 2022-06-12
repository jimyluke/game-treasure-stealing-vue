<template>
  <div class="main-game-heroes-entries">
    <div class="container">
      <div class="section-wrapper">
        <div class="heroes-list col-left">
          <h3>Heroes</h3>
          <div class="heroes-list-inner">
            <ul>
              <li v-for="h in 5" :key="h">
                <label>Hero name</label>
                <div class="hero-img">
                  <el-checkbox v-model="option"></el-checkbox>
                  <img src="https://cryptoquest.mypinata.cloud/ipfs/Qmf3apzvYCaBYgAefKchMdueC8NT42drdfD8HXBbPi2mDR" />
                </div>
                <div class="block">
                  <span>Rarity: <strong> Common</strong></span>
                </div>
                <div class="heoro-item-footer">
                  <span>SP: 122</span>
                  <span>CP: 222</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div class="entries-section col-right">
          <h3>Entries</h3>
          <div class="entries-section-inner">
            <div class="status-n-action">
              <span>Hero's Commited: 5/5</span>
              <el-button type="text">Select All</el-button>
            </div>
            <div class="sm-row">
              <label class="label-x">Cost Per Hero:</label> <span>$1.49</span> <span>$1.39 x 2</span><br />
              <label class="label-x">Heroe Discount:</label> $0.10
            </div>
            <div class="sm-row">
              <label class="label-x">Soldier Entries:</label> <el-input-number v-model="num" controls-position="right" size="small"></el-input-number>
            </div>
            <div class="sm-row">
              <label class="label-x">Supercharge Entries:</label> <el-checkbox v-model="option"></el-checkbox> -50 thief coin
            </div>
            <div class="sm-row last">
              <label class="label-x">Total Team:</label> 7 <br />
              <label class="label-x">Total Cost:</label> <strong class="money">$10.23</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data:() => ({
    option: true,
    num: ''
  })
}
</script>