<template>
  <div>
    <!-- 导航头部 -->
    <van-nav-bar
      title="搜索结果"
      left-text="返回"
      fixed
      left-arrow
      @click-left="$router.back()"
    />
     <!-- /导航头部 -->
     <!-- 文章列表 -->
     <van-list
        class="article-list"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell
          v-for="item in articles"
          :key="item.art_id.toString()"
          :title="item.title"
        />
      </van-list>
     <!-- /文章列表 -->
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search'
// import { constants } from 'crypto';
export default {
  name: 'SearchResult',
  data () {
    return {
      articles: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 20
    }
  },
  computed: {
    q () {
      return this.$route.params.q
    }
  },
  activated () {
    console.log('activated')
  },
  deactivated () {
    // console.log('deacyivated')
    // 手动销毁当前实例，禁用缓存
    this.$destroy()
  },
  methods: {
    async onLoad () {
      await this.$sleep(1000)
      const data = await getSearchResult({
        page: this.page,
        perPage: this.perPage,
        q: this.q
      })
      // 如果没有数据
      if (!data.results.length) {
        // 取消loading
        this.loading = false
        // 设置数据加载完毕
        this.finished = true

        return
      }
      // 如果有数据，将数据push到数组中加载更多
      this.articles.push(...data.results)
      // 更新下一次加载更多的页码
      this.page += 1
      // 本次数据加载完毕，关闭loading（它每次onload的时候会自动将loadi设置为true）
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>
.article-list {
  margin-top: 92px
}
</style>
