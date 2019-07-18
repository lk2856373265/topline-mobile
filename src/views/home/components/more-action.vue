<template>
  <van-dialog
  :value="value"
  @input="$emit('input', $event)"
  closeOnClickOverlay
  :showConfirmButton="false"
>
  <van-cell-group v-if="!isReportShow">
  <van-cell icon="warn-o" title="不感兴趣" />
  <van-cell is-link icon="records" title="反馈垃圾内容" @click="isReportShow = true" />
  <van-cell icon="warning-o" title="拉黑作者" />
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
export default {
  name: 'MoreAction',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isReportShow: false
    }
  }
}
</script>

<style>
</style>
