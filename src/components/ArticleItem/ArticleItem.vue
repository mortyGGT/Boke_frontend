<template>
  <router-link class="box" :to="`/article/${articleItem.ID}`">
    <figure class="image">
      <MyElimage :img="articleItem.imageUrl" :zip="2" />
    </figure>
    <article class="content">
      <section class="up">
        <div class="left">
          <title class="title">{{ articleItem.title }}</title>
          <summary class="desc">
            {{ articleItem.desc }}
          </summary>
        </div>
        <time class="right tw-flex-shrink-0">
          <time class="time">{{ time }}</time>
        </time>
      </section>
      <section class="down">
        <div class="leftcontent">
          <div class="tw-flex tw-items-center">
            <div class="tw-w-8 tw-h-8 tw-rounded-full tw-overflow-hidden tw-mr-2">
              <!-- <MyElimage :img="articleItem.authorVo.avatar" :zip="1" /> -->
            </div>
            <!-- <p class="author">{{ articleItem.authorVo.nickname }}</p> -->
          </div>
          <div>
            <TagItem
              v-for="tag in articleItem.tags"
              :key="tag.id"
              :tagId="tag.id"
              :tagName="tag.tagName"
            />
          </div>
        </div>
        <div>
          <div class="icongroup">
            <div>
              <ElTag effect="dark">{{ ArticlePannel[articleItem.pannel] }}</ElTag>
            </div>
            <i class="iconfont icon-yanjing">{{ articleItem.readCount }}</i>
            <i class="iconfont icon-pinglun">{{ articleItem.commentCount }}</i>
            <i class="iconfont icon-good">{{ articleItem.likeCount }}</i>
            <i class="iconfont icon-changyonggongneng">{{ articleItem.collectCount }}</i>
          </div>
        </div>
      </section>
    </article>
  </router-link>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { getRealativeTime } from '@/utils/dayjs'
import { ArticlePannel } from '@/interface/EnumExport'
const props = defineProps({
  articleItem: {
    type: Object as PropType<ArticleItemInfo>,
    default: () => {
      return {}
    }
  }
})

const time = computed(() => {
  return getRealativeTime(props.articleItem.CreatedAt)
})
</script>
<style lang="less" scoped>
@import url('./styles/Index.less');
</style>
