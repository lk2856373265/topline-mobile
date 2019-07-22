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
      <h2 class="article-title">hello world</h2>
      <!-- /文章标题 -->

      <!-- 作者信息 -->
      <AuthInfo/>
      <!-- /作者信息 -->

      <!-- 文章内容 -->
      <div class="article-content">
        <p>hello world</p>
        <p>hello world</p>
        <p>hello world</p>
        <p>hello world</p>
        <p>hello world</p>
        <p>hello world</p>
      </div>
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
export default {
  name: 'ArticleIndex',
  data () {
    return {}
  },
  components: {
    AuthInfo,
    MoreAction
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
