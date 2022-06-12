<template>
  <div class="header-section">
    <div class="container">
      <nav class="main-menu left-side">
        <router-link to="/">Home</router-link>
        <router-link to="/inventory">Inventory</router-link>
      </nav>

      <div class="user-coin-info right-side">
        <span>.01 SOL ($5)</span>
        <span>504 thief coin</span>

        <el-popover
          placement="bottom"
          title="My Account"
          width="260"
          trigger="click">
          <div class="p-row">
            <label class="block">Wallet Address: </label>
            <strong>ABC1212122212</strong>
          </div>
          <div class="p-row">
            <label class="block">Balance:</label>
            <strong>0.00000 SOL</strong>
          </div>
          <div class="p-row">
            <el-button>Disconnect</el-button>
          </div>

          <el-button type="text" slot="reference" icon="el-icon-user-solid">My Account</el-button>
        </el-popover>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {

    }
  }
}
</script>