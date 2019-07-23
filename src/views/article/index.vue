<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar
      title="黑马头条"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- /头部导航 -->

    <div class="article">
      <!-- 文章标题 -->
      <h2 class="article-title">{{ article.title }}</h2>
      <!-- /文章标题 -->

      <!-- 作者信息 -->
      <AuthInfo/>
      <!-- /作者信息 -->

      <!-- 文章内容 -->
      <div class="article-content" v-html="article.content"></div>
      <!-- /文章内容 -->

      <!-- 更多操作 -->
      <more-action/>
      <!-- /更多操作 -->
    </div>
  </div>
</template>

<script>
import AuthInfo from './components/auth-info'
import MoreAction from './components/more-action'
import { getArticleDetail } from '@/api/article'
export default {
  name: 'ArticleIndex',
  data () {
    return {
      article: {
        art_id: 12345,
        attitude: 0,
        aut_id: 1,
        aut_name: '森龙',
        aut_photo: 'http://toutiao.meiduo.site/Fn6-mrb5zLTZIRG3yH3jG8HrURdU',
        ch_id: 6,
        content: '<p>xxxxxxxxxxxxxxxxxxxxxx</p>',
        is_collected: false,
        is_followed: false,
        pubdate: '2019-07-16T18:16:38',
        recomments: [],
        title: '11111111xxxxxxxxxxx'
      }
    }
  },
  components: {
    AuthInfo,
    MoreAction
  },
  created () {
    this.loadArticle()
  },
  methods: {
    async loadArticle () {
      try {
        const data = await getArticleDetail(this.$router.params.articleId)
        this.article = data
      } catch (err) {
        this.$toast.fail('加载失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.article {
  padding: 20px;
  .article-title {
    font-size: 40px;
    font-weight: 400;
  }
  .article-content {
    font-size: 26px;
  }
}
</style>
