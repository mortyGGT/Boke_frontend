<template>
  <div class="article-author-info">
    <!-- 文章标题 -->
    <div class="article-title">
      <h2>{{ article.title }}</h2>
      <time><i class="iconfont icon-riqi"></i>发布于{{ article.CreatedAt }}</time>
    </div>
    <!-- DIDA-BLOG -->
    <div class="author">
      <div class="img">
        <MyElimage :img="article.authorVo?.avatar" :zip="2" />
      </div>
      <div class="author-info">
        <p class="author-name">{{ article?.authorVo?.nickname }}</p>
        <p class="introduce">{{ article?.authorVo?.introduce }}</p>
      </div>
    </div>
    <!-- icon group 文章点赞等信息 -->
    <ul class="icongroup">
      <li><i class="iconfont icon-yanjing"></i>{{ article.readCount }}</li>
      <li><i class="iconfont icon-good"></i>{{ article.likeCount }}</li>
      <li><i class="iconfont icon-changyonggongneng"></i>{{ article.collectCount }}</li>
      <li><i class="iconfont icon-pinglun"></i>{{ article.commentCount }}</li>
    </ul>
    <summary class="summary">
      <i class="summary-yinhao">“</i>
      <p class="summary-content">引言:{{ article.desc }}</p>
    </summary>
    <div class="tip">
      <p>本文大概字数为：{{ word }}字， 看完大概需要{{ needMin }}分钟</p>
    </div>
  </div>
</template>
<script setup lang="ts">
import { PropType } from 'vue'

const props = defineProps({
  article: {
    type: Object as PropType<ArticleItemInfo>,
    default: () => {
      return {}
    }
  }
})
const word = computed(() => {
  if (props.article.content && props.article.content.length != 0) {
    return props.article.content.length
  }
})
const needMin = computed(() => {
  if (props.article.content && props.article.content.length != 0) {
    return Math.round(props.article.content.length / 360)
  }
})
</script>

<style lang="less" scoped>
@import url(../styles/ArticleSummary.less);
</style>
