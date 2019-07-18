<template>
  <van-dialog
  :value="value"
  @input="$emit('input', $event)"
  closeOnClickOverlay
  :showConfirmButton="false"
>
  <van-cell-group v-if="!isReportShow">
  <van-cell icon="warn-o" title="不感兴趣" @click="handleDislike"/>
  <van-cell is-link icon="records" title="反馈垃圾内容" @click="isReportShow = true" />
  <van-cell icon="warning-o" title="拉黑作者" @click="handleAddblackList" />
</van-cell-group>
 <van-cell-group v-else>
  <van-cell icon="arrow-left" @click="isReportShow = false" />
  <van-cell  title="标题夸张"  />
  <van-cell  title="低俗色情" />
  <van-cell  title="错别字多" />
  <van-cell  title="旧闻重复" />
  <van-cell  title="广告软文" />
  <van-cell  title="内容不实" />
  <van-cell  title="涉嫌违法" />
  <van-cell  title="侵权" />
  <van-cell  title="其它问题" />
</van-cell-group>
</van-dialog>
</template>

<script>
import { dislikeArticle } from '@/api/article'
import { addBlackList } from '@/api/user'
export default {
  name: 'MoreAction',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    currentArticle: {
      type: Object
    }
  },
  data () {
    return {
      isReportShow: false
    }
  },
  methods: {
    async  handleDislike () {
      try {
        await dislikeArticle(this.currentArticle.art_id)
        // 移除客户端的那个文章
        this.$emit('dislike-success')
        // 关闭对话框
        // this.$emit('input', false)
        // 提示操作成功
        // this.$toast('操作成功')
      } catch (err) {
        this.$toast('操作失败')
      }
    },
    async handleAddblackList () {
      try {
        await addBlackList(this.currentArticle.aut_id)
        this.$emit('add-blacklist-success')
      } catch (err) {
        this.$toast('操作失败')
      }
    }
  }
}
</script>

<style>
</style>
