<template>
  <div id="app">
    <van-button type="default">默认按钮</van-button>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>
  <van-radio-group v-model="radio">
    <van-radio name="1" checked-color="green">单选框 1</van-radio>
    <van-radio name="2" checked-color="#07c160">单选框 2</van-radio>
  </van-radio-group>
   <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {}
  },
  components: {}
}
</script>

<style lang="less" scoped>
</style>
