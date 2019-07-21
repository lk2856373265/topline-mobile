<template>
  <div>
    <!-- 搜索框 -->
    <form action="/">
    <van-search
    placeholder="请输入搜索关键词"
    v-model="searchText"
    show-action
    @search="handleSearch(searchText)"
    />
    </form>
    <!-- /搜索框 -->

    <!-- 联想建议 -->
    <van-cell-group v-if="Suggestions.length && searchText.length">
      <van-cell
      :title="item"
      icon="search"
      v-for="item in Suggestions"
      :key="item"
      @click="handleSearch(item)"
      >
      <!-- {{}} 不能展示带有html 标签的的字符 -->
      <div slot="title" v-html="highlight(item, searchText)"></div>
      </van-cell>
    </van-cell-group>
    <!-- /联想建议 -->

    <!-- 历史记录 -->
     <van-cell-group v-else>
      <van-cell title="历史记录">
        <van-icon
        v-show="!isDeleteShow"
        slot="right-icon"
        name="delete"
        style="line-height: inherit;"
        @click="isDeleteShow = true"
       />
       <div v-show="isDeleteShow">
         <span style="margin-right: 10px;">全部删除</span>
         <span @click="isDeleteShow = false">完成</span>
       </div>
      </van-cell>
      <van-cell title="hello">
        <van-icon
        v-show="isDeleteShow"
        slot="right-icon"
        name="close"
        style="line-height: inherit;"
       />
      </van-cell>
    </van-cell-group>
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
      Suggestions: [],
      isDeleteShow: false
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
  },
  methods: {
    highlight (text, keyword) {
      return text.toLowerCase().split(keyword)
        .join(`<span style="color: red">${keyword}</span>`)
    },
    handleSearch (queryText) {
      if (!queryText.length) {
        return
      }
      // 跳转到搜索结果页面
      this.$router.push({
        name: 'search-result',
        params: {
          q: queryText
        }
      })
      // 或者
      // this.$router.push('/search-result' + queryText)

      // 或者
      // this.$router.push(`/search-result/${queryText}`)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
