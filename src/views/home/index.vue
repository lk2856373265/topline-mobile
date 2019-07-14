<template>
  <div class="home">
     <van-nav-bar title="首页" fixed />
     <!--
       activeChannelIndex绑定当前激活的标签页，使用索引
      -->
    <van-tabs class="channel-tabs" v-model="activeChannelIndex">
        <van-tab title="标签 1">
          <!-- 下拉刷新
           isLoading 用来控制下拉刷新的loading状态
           下拉刷新的时候他会自动将loading设置为true
           @refresh 下拉刷新时触发
           -->
          <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <!--
            列表组件：主要提供上拉加载更多的功能
            loading 用来控制加载中的loading状态
            finished用来控制是否加载完毕
            @load 加载更多时触发的一个事件
            -->
          <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
            >
              <van-cell
                v-for="item in list"
                :key="item"
                :title="item"
              />
          </van-list>
          </van-pull-refresh>
        </van-tab>
        <van-tab title="标签 2">内容 2</van-tab>
        <van-tab title="标签 3">内容 3</van-tab>
        <van-tab title="标签 4">内容 4</van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: 'HomeIdex',
  data () {
    return {
      activeChannelIndex: 0,
      list: [],
      loading: false,
      finished: false,
      isLoading: false
    }
  },
  methods: {
    onLoad () {
      console.log('onLoad')
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }
        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 1000)
    },
    onRefresh () {
      console.log('onRefresh')
      setTimeout(() => {
        this.isLoading = false
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
.channel-tabs {
  margin-bottom: 100px;
}
.channel-tabs /deep/ .van-tabs__wrap {
  position: fixed;
  top: 92px;
}
.channel-tabs /deep/ .van-tabs__content {
  margin-top: 100px
}
</style>
