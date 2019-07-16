<template>
    <van-popup
    :value="value"
    @input="$emit('input', $event)"
    position="bottom"
    :style="{ height: '95%' }"
    get-container="body"
    :lazy-render="false"
  >
  <!-- 我的频道 -->
  <div class="channel">
    <div class="channel-head">
      <div>
        <span class="title">我的频道</span>
        <span class="desc">点击进入频道</span>
      </div>
      <div>
        <van-button
            type="danger"
            plain
            size="mini"
          >编辑</van-button>
      </div>
    </div>

      <van-grid class="channel-content" :gutter="10" clickable>
        <van-grid-item
          v-for="item in userChannels"
          :key="item.id"
          text="文字"
        >
        <span
        class="text"
        >{{ item.name}}</span>
        <!-- <van-icon class="close-icon" name="close" /> -->
        </van-grid-item>
      </van-grid>
    </div>

  <!-- /我的频道 -->
   <!-- 推荐频道 -->
    <div class="channel">
      <div class="channel-head">
        <div>
          <span class="title">频道推荐</span>
          <span class="desc">点击添加频道</span>
        </div>
      </div>
      <van-grid class="channel-content" :gutter="10" clickable>
        <van-grid-item
          v-for="value in 8"
          :key="value"
          text="文字">
          <div class="info">
            <span class="text">文字</span>
          </div>
        </van-grid-item>
      </van-grid>
    </div>
    <!-- /推荐频道 -->
  </van-popup>
</template>

<script>
import { getAllChannels } from '@/api/channel'
export default {
  name: 'HomeChannel',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    userChannels: {
      type: Array,
      default: () => []
    },
    activeIndex: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      allChannels: [] // 所有频道列表
    }
  },
  created () {
    this.loadAllChannels()
  },
  methods: {
    async loadAllChannels () {
      const data = await getAllChannels()
      this.allChannels = data.channels
    }
  }
}
</script>

<style lang="less" scoped>
.channel {
  .channel-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    .title {
      font-size: 50px;
      margin-right: 5px;
    }
    .desc {
      font-size: 30px;
      color: #ccc
    }
  }
  .channel-content {
    .text {
      font-size: 30px;
    }
    .active {
      color: red;
    }
    .close-icon {
      font-size: 30px;
      position: absolute;
      top: -5px;
      right: -5px;
      z-index: 999;
      background-color: #fff;
    }
    .info {
      display: flex;
      align-items: center;
    }
  }
}
</style>