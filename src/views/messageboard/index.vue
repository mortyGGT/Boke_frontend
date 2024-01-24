<template>
  <div class="message" ref="body">
    <div class="up-info">
      <div class="logo">
        <div style="width: 60px">
          <MyElimage :img="MessageLogo" />
        </div>
        <p class="title">委托栏</p>
      </div>
      <p class="desc">输入你的昵称 联系方式 作为委托发起人~</p>
    </div>
    <div class="edit-part">
      <div class="liuyan-info">
        <div class="name">
          <span>任务简称：</span>
          <ElInput size="large" v-model="messageParams.title" show-word-limit maxlength="20">
          </ElInput>
        </div>
        <div class="name">
          <span>您的联系方式：</span>
          <ElInput
            class="contact"
            size="large"
            v-model="messageParams.contact"
            show-word-limit
            maxlength="64"
            placeholder="example@xxx.com"
          >
          </ElInput>
        </div>
      </div>
      <ElDivider />
      <div class="main-content">
        <div class="msg-avatar"></div>
        <div class="edit-area">
          <V3Emoji
            :textArea="true"
            :customSize="customSize"
            :recent="true"
            :keep="true"
            :optionsName="optionsName"
            :disableGroup="disableGroup"
            v-model="messageParams.content"
            :customTheme="customTheme"
          />
        </div>
      </div>
      <div class="button name">
        <span>奖励特许卷：</span>
        <ElInput class="award-input" size="default" v-model="messageParams.award" maxlength="3">
        </ElInput>
        <ElButton @click="publishMessage" class="buttonself" type="success">发布留言</ElButton>
      </div>
    </div>

    <!-- 任务列表 -->
    <div class="paixu">
      <h2>任务列表</h2>
      <!-- <p :class="{ active: orderRole === 2 }" @click="order(2)">默认</p> -->
      <!-- <p :class="{ active: orderRole === 1 }" @click="order(1)">倒序</p> -->
    </div>

    <div class="message-part" v-if="messageList">
      <Task
        v-for="(item, index) in toCommentItem"
        :commentInfo="item"
        :floor="index + 1"
        :key="item.id"
        :reply="true"
        :level="false"
      />
    </div>
    <AdkEmpty v-else desc="暂时没有任务哦~"></AdkEmpty>

    <MyPagination
      :pageParams="pageparams"
      @changePage="changePage"
      :total="total"
      class="pagination"
    />
  </div>
</template>

<script lang="ts">
export default {
  name: 'MessageBoard'
}
</script>

<script lang="ts" setup>
import V3Emoji from 'vue3-emoji'
import 'vue3-emoji/dist/style.css'
import MessageLogo from '@/assets/img/liuyan-logo.png'
import { useChangeParams, useMessageApi, useMessageBoardParams } from '@/hooks/useMessageboard'
import { useEmoji } from '@/hooks/useEmoji'
import Task from './components/Task.vue'

const { messageParams, pageparams, messageList, total } = useMessageBoardParams()

const { orderRole, publishMessage, order, changePage, body } = useMessageApi(
  messageParams,
  pageparams,
  messageList,
  total
)
const { changeAvatarParams, toCommentItem } = useChangeParams(messageParams, messageList)
const { optionsName, disableGroup, customSize, customTheme } = useEmoji()
</script>

<style lang="less" scoped>
@import url(./styles/MessageBoard.less);
@import url(@/assets/styles/MyAnimate.less);
</style>
