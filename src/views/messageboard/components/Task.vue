<template>
  <div class="comment-item">
    <div class="content">
      <div class="username">
        <div class="tw-flex">
          <!-- 头像 -->
          <div class="user-avatar">
            <MyElimage
              :img="commentInfo.user ? commentInfo.user.avatar : commentInfo.avatar"
              :zip="2"
            />
          </div>
          <!-- 名字以及等级和简介等 -->
          <div class="username-time">
            <h3>
              {{ commentInfo.user?.nickname || commentInfo.nickname }}
              <div
                class="tag"
                v-if="commentInfo.publisherId && commentInfo.publisherId === authorId"
              >
                发布人
              </div>
              <!-- 占位 以后接入等级系统可用 -->
              <div class="tag tag2" v-if="level">Lv1</div>
            </h3>
            <p v-if="commentInfo.user">{{ commentInfo.user.introduce }}</p>
            <p v-if="commentInfo.contact">联系方式:{{ commentInfo.contact }}</p>
          </div>
        </div>
        <!-- 右边的消息栏 -->
        <div class="tw-flex tw-flex-col tw-items-end tw-justify-between" style="height: 60px">
          <div class="floor tw-flex-1">{{ floor }}楼</div>

          <span>{{ commentInfo.CreatedAt }}</span>
        </div>
      </div>
      <ElDivider />
      <div class="comment-content">
        <p>{{ commentInfo.content }}</p>
      </div>
      <div class="secondcomment">
        <!-- 回复区 -->
        <Reply
          :commentInfo="commentInfo"
          :articleId="articleId"
          @published="published"
          v-if="reply"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { useUserStore } from '@/store/user'
defineProps({
  commentInfo: {
    type: Object as PropType<TaskItemInfo>,
    default: () => {
      return {}
    }
  },
  floor: {
    type: Number,
    default: 1
  },
  articleId: {
    type: [String, Number],
    default: 1
  },
  reply: {
    type: Boolean,
    default: true
  },
  level: {
    type: Boolean,
    default: true
  }
})
const authorId = useUserStore().userinfo.id
const emit = defineEmits(['published'])
const published = () => {
  emit('published')
}
</script>

<style lang="less" scoped>
@import url(../styles/Task.less);
</style>
