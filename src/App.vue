<template>
  <div id="app">
    <div class="box"></div>
   <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
    }
  },
  components: {}
}
</script>

<style lang="less" scoped>
.box {
  width: 375px;
  height: 100px;
  background-color: red;
}
</style>
