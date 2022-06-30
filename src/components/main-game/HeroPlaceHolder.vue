<template>
  <el-skeleton style="width: 100%" animated v-loading="isLoading">
    <template slot="template">
      <el-skeleton-item variant="image" style="width: 100%; height: 180px;"></el-skeleton-item>
      <div style="padding: 14px;">
        <el-skeleton-item variant="p" style="width: 50%"></el-skeleton-item>
        <div style="display: flex; align-items: center; justify-items: space-between;">
          <el-skeleton-item variant="text" style="margin-right: 16px;" ></el-skeleton-item>
          <el-skeleton-item variant="text" style="width: 30%;" ></el-skeleton-item>
        </div>
      </div>
    </template>
  </el-skeleton>
</template>

<script>
export default {
  props: {
    isLoading: {
      type: Boolean,
      default: false
    }
  }
}
</script>