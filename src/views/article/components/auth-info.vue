<template>
  <div class="auth-info">
    <div class="base-info">
      <img class="avatar" :src="article.aut_photo" alt="">
      <div>
        <p>{{ article.aut_name }}</p>
        <p>{{ article.pubdate | relativeTime}}</p>
      </div>
    </div>
    <div>
      <van-button
        :type="article.is_followed ? 'default' : 'danger'"
        :loading="isFollowLoading"
        @click="handleFollow"
      >{{ article.is_followed ? '已关注' : '关注' }}</van-button>
    </div>
  </div>
</template>

<script>
import { followUser, unFollowUser } from '@/api/user'
// import { constants } from 'crypto';
export default {
  name: 'AuthInfo',
  props: {
    article: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      isFollowLoading: false
    }
  },
  methods: {
    async handleFollow () {
      try {
        this.isFollowLoading = true
        // 是否已登录？
        // 如果未登录， 提示 "该操作需要登录，确认登录吗"

        // 如果已登录，则执行
        // 如果已关注，则取消关注
        // 如果未关注，则关注
        if (this.article.is_followed) {
          // 取消关注
          await unFollowUser(this.article.aut_id)
          this.article.is_followed = false
        } else {
          // 关注
          await followUser(this.article.aut_id)
          this.article.is_followed = true
        }
      } catch (err) {
        console.log(err)
      }
      this.isFollowLoading = false
    }
  },
  components: {}
}
</script>

<style lang="less" scoped>
.auth-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 26px;
  .base-info {
    display: flex;
    align-items: center;
  }
  .avatar {
    margin-right: 10px;
    width: 100px;
    height: 100px;
    border-radius: 100%;
  }
}
</style>
