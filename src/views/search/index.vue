<template>
  <div>
    <!-- 搜索框 -->
    <van-search
    placeholder="请输入搜索关键词"
    v-model="searchText"
    show-action
    />
    <!-- /搜索框 -->

    <!-- 联想建议 -->
    <van-cell-group>
      <van-cell
      :title="item"
      icon="search"
      v-for="item in Suggestions"
      :key="item"
      />
    </van-cell-group>
    <!-- /联想建议 -->

    <!-- 历史记录 -->
    <!-- /历史记录 -->
  </div>
</template>

<script>
import { getSuggestion } from '@/api/search'
import { debounce } from 'lodash'
// import { constants } from 'crypto';
export default {
  name: 'SearchIndex',
  data () {
    return {
      searchText: '',
      Suggestions: []
    }
  },
  watch: {
    /**
     * 监视输入数据的变化，当数据发生变化，发请求获取搜索建议，展示到列表中
     */
    searchText: debounce(async function (text) {
      // 取出首尾空格
      text = text.trim()
      // 非空判断
      if (!text.length) {
        return
      }
      // 请求获取搜索建议
      try {
        const data = await getSuggestion(text)
        this.Suggestions = data.options
      } catch (err) {
        console.log(err)
      }
    }, 1000)
  }
}
</script>

<style lang="less" scoped>
</style>
