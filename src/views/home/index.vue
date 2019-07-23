<template>
  <div class="home">
     <van-nav-bar title="首页-搜索" fixed @click.native="$router.push({ name : 'search'})" />
     <!--
       activeChannelIndex绑定当前激活的标签页，使用索引
      -->
    <van-tabs class="channel-tabs" v-model="activeChannelIndex">
      <div slot="nav-right" class="wap-nav" @click="isChannelShow = true">
        <van-icon name="wap-nav" />
      </div>
        <van-tab
        :title="channelItem.name"
        v-for="channelItem in channels"
        :key="channelItem.id"
        >
          <!-- 下拉刷新
           isLoading 用来控制下拉刷新的loading状态
           下拉刷新的时候他会自动将loading设置为true
           @refresh 下拉刷新时触发
           -->
          <van-pull-refresh
          v-model="channelItem.downPullLoading"
          @refresh="onRefresh"
          :success-text="channelItem.downPullSuccessText"
          :success-duration="1000"
          >
            <!--
            列表组件：主要提供上拉加载更多的功能
            loading 用来控制加载中的loading状态
            finished用来控制是否加载完毕
            @load 加载更多时触发的一个事件
            -->
          <van-list
              v-model="channelItem.upPullLoading"
              :finished="channelItem.upPullFinished"
              finished-text="没有更多了"
              @load="onLoad"
            >
           <van-cell
                v-for="articleItem in channelItem.articles"
                :key="articleItem.art_id.toString()"
                :title="articleItem.title"
                @click="$router.push({ name: 'article', params: { articleId: articleItem.art_id } })"
              >
            <div slot="label">
              <template v-if="articleItem.cover.type">
              <van-grid :border="false" :column-num="3">
                <van-grid-item v-for="(img, index) in articleItem.cover.images" :key="index">
                  <van-image
                  :src="img" lazy-load/>
                </van-grid-item>
              </van-grid>
              </template>
              <p>
                <span>{{ articleItem.aut_name }}</span>
                &nbsp;
                <span>{{ articleItem.comm_count }}评论</span>
                &nbsp;
                <span>{{ articleItem.pubdate | relativeTime }}</span>
                <van-icon name="close" class="close" @click="handleShowMoreAction(articleItem)" />
              </p>
            </div>
           </van-cell>
          </van-list>
          </van-pull-refresh>
        </van-tab>
    </van-tabs>
    <!-- 频道管理组件 -->
      <HomeChannel
      v-model="isChannelShow"
      :user-channels="channels"
      :active-index="activeChannelIndex"
      @update:active-index="activeChannelIndex = $event"
       />
       <!-- /频道管理组件 -->
       <!-- 更多操作 -->
      <more-action
      v-model="isMoreActionShow"
      :current-article="currentArticle"
      @dislike-success="handleDislikeSuccess"
      @add-blacklist-success="handleDislikeSuccess"
      />
       <!-- /更多操作 -->
  </div>
</template>

<script>
import { getUserChannels } from '@/api/channel'
import { getArticles } from '@/api/article'
import HomeChannel from './components/channel'
import MoreAction from './components/more-action'
export default {
  name: 'HomeIdex',
  components: {
    HomeChannel,
    MoreAction
  },
  data () {
    return {
      activeChannelIndex: 0,
      channels: [], // 存储频道列表
      isChannelShow: false,
      isMoreActionShow: false,
      currentArticle: null
    }
  },
  computed: {
    /**
     * 当前激活的频道
     */
    activeChannel () {
      return this.channels[this.activeChannelIndex]
    }
  },
  watch: {
    // 监视容器中的user用户
    async '$store.state.user' () {
      // 重新加载用户频道列表
      this.loadChannels()
      // 频道数据改变，重新加载当前激活频道的数据
      await this.onLoad()
      this.activeChannel.upPullLoading = true
      // this.activeChannel.upPullLoading = true
      await this.onLoad()
    },
    isChannelShow () {
      if (!this.isChannelShow && !this.activeChannel.articles.length) {
        console.log('onLoad')
        this.onLoad()
      }
    }
  },
  created () {
    this.loadChannels()
  },
  methods: {
    async loadChannels () {
      const { user } = this.$store.state
      let channels = []
      // 已登录
      if (user) {
        const data = await getUserChannels()
        channels = data.channels
      } else {
      // 未登录
      // 如果有本地存储，则使用本地存储中的频道列表
        const localChannels = JSON.parse(window.localStorage.getItem('channels'))
        if (localChannels) {
          channels = localChannels
        } else {
          // 如果没有，则请求获取默认推荐频道列表
          const data = await getUserChannels()
          channels = data.channels
        }
      }
      // 修改频道数据，使结构满足满足我们的需求
      channels.forEach(item => {
        item.articles = [] // 用来存储当前文章的列表
        item.timestamp = Date.now() // 存储下一页数据的
        item.downPullLoading = false // 控制当前频道下拉刷新的loading状态
        item.upPullLoading = false // 控制当前频道上拉加载更多的loadin状态
        item.upPullFinished = false // 控制当前频道数据是否加载完毕
      })
      this.channels = channels
    },
    // 上拉加载更多，push数据
    async onLoad () {
      await this.$sleep(800)
      let data = []
      data = await this.loadArticles()
      // 如果没有data.pre_timestamp并且数组是空的，意味着没有数据了
      if (!data.pre_timestamp && !data.results.length) {
        // 设置该频道的数据已加载完毕，组件会给出提示并且不再onLoad
        this.activeChannel.upPullFinished = true
        // 取消loading
        this.activeChannel.upPullLoading = false
        // 代码停止执行
        return
      }
      // pre_timestamp下一页的页码（上次时间点推荐的数据）
      // results 文章列表
      // console.log(data)
      // 解决初始化的时候没有最新推荐数据的问题（没有最新数据，就加载上一次推荐数据）
      if (data.pre_timestamp && !data.results.length) {
        this.activeChannel.timestamp = data.pre_timestamp
        // 加载下一页数据
        data = await this.loadArticles()
      }
      // 数据加载好以后，将 pre_timestamp 更新到当前频道的中用于加载下下页数据
      this.activeChannel.timestamp = data.pre_timestamp
      // 将文章数据更新到频道中（注意：是 push 追加，不是覆盖）
      this.activeChannel.articles.push(...data.results)
      // 数据加载完毕，取消上拉 loading
      this.activeChannel.upPullLoading = false
      // // 异步更新数据
      // setTimeout(() => {
      //   for (let i = 0; i < 10; i++) {
      //     this.list.push(this.list.length + 1)
      //   }
      //   // 加载状态结束
      //   this.loading = false

      //   // 数据全部加载完成
      //   if (this.list.length >= 40) {
      //     this.finished = true
      //   }
      // }, 1000)
    },
    // 下拉刷新，如果有新数据，则重置列表数据
    async onRefresh () {
      const { activeChannel } = this
      // 备份加载下一页数据的时间戳
      const timestamp = activeChannel.timestamp
      activeChannel.timestamp = Date.now()
      const data = await this.loadArticles()
      // 如果有最新数据，将数据更新到文章的频道列表中
      if (data.results.length) {
        // 将当前最新推荐重置到频道列表中
        activeChannel.articles = data.results
        // 加载上拉加载更多数据的时间戳
        activeChannel.timestamp = data.pre_timestamp
        activeChannel.downPullSuccessText = '更新完成'
        // 重置后满足一屏显示
        this.onLoad()
      } else {
        // 如果没有最新数据，则提示已是最新数据
        activeChannel.downPullSuccessText = '已是最新数据'
      }
      // 下拉刷新结束，取消loading状态
      activeChannel.downPullLoading = false
      // 没有最新数据，将原来的用于请求下一页的时间戳恢复过来
      activeChannel.timestamp = timestamp
    },
    async loadArticles () {
      const { id: channelId, timestamp } = this.activeChannel
      const data = await getArticles({
        channelId, // 当前激活的频道id
        timestamp, // 用于请求分页数据的时间戳
        withTop: 1 // 是否包含置顶数据
      })
      return data
    },
    handleShowMoreAction (article) {
      // 将执行更多操作的文章记录起来，通过组件传值传给MoreAction组件
      this.currentArticle = article
      // 显示更多操作弹框
      this.isMoreActionShow = true
    },
    handleDislikeSuccess () {
      const articles = this.activeChannel.articles
      const delIndex = articles.findIndex(item => item === this.currentArticle)
      articles.splice(delIndex, 1)
      this.isMoreActionShow = false
      this.$toast('操作成功')
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
.channel-tabs /deep/ .wap-nav {
  position: fixed;
  right: 0;
}
.channel-tabs .close {
  float: right;
  font-size: 30px
}
</style>
