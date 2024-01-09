<template>
  <div class="container">
    <div class="out" id="out">
      <div class="avatar" id="avatar">
        <MyElimage :img="Touxiang" />
      </div>
      <h1 class="welcome" id="welcome">你好 旅行者</h1>
      <h2 class="dida" id="dida">这里是嘀嗒博客站</h2>
      <div class="profile" id="profile">
        <p class="label-1" :data-index="0">注册后可以进行发布文章，插图等操作。</p>
        <p class="label-1" :data-index="1">
          后期可以去委托栏查看其他用户发布的任务，完成委托后成果物会发送给对方进行审核，核算后账户会发送对应的特许卷奖励
        </p>
        <p class="label-1" :data-index="2">
          同样，自己有委托需求的话，不管是写文，设计方案，还是各种各样的想法要求，都可以在委托栏上进行发布，并根据自己账号持有的特许卷发布悬赏
        </p>
        <p class="label-1" :data-index="3">
          当别人接下委托完成并提交后，自己账号会收到成果物来审核，审核通过后特许卷会进行扣除并奖励给接收方
        </p>
        <p class="label-1" :data-index="4">
          每月月底会进行资金池结算，群商城也会同步上架当期奖励物品，每样商品所需的特许卷不一样，用户可以根据自己手上的特许卷进行兑换
        </p>
        <p class="label-1" :data-index="5">
          目前还有很多待开发的东西如任务委托板块，天书板块，定时任务板块、AI板块、虚拟直播、量化盘、群AI同步等等
        </p>
        <p class="label-1" :data-index="7">
          有想法建议的可以去<RouterLink to="/messageboard">留言板</RouterLink>给我留言
        </p>
        <p class="label-1" :data-index="9">写于2024.1.6 in 往生堂</p>
      </div>
      <div class="logo">
        <div class="logo-img">
          <MyElimage :img="Logo" />
        </div>
        <p class="logo2" :data-index="1">DIDA-blog 嘀嗒博客站</p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Logo from '@/assets/img/new-logo.png'
import Touxiang from './img/touxiang.png'
import Wechat from './img/wechat.png'
import Zhifubao from './img/zhifubao.jpg'
import gsap from 'gsap'
import { onMounted } from 'vue'

onMounted(() => {
  let timeline = gsap.timeline({ defaults: { duration: 1 } })
  gsap.set('#avatar', { y: '50%', scale: 0 })
  gsap.set('.logo-img', { scale: 0 })
  gsap.set('#welcome', { y: '50%' })
  gsap.set('#dida', { y: '50%' })
  gsap.set('.label-1', { y: 10, opacity: 0 })
  gsap.set('.sns-label', { scale: 0, rotateZ: -90 })
  timeline
    .to('#avatar', {
      opacity: 1,
      scale: 1,
      ease: 'elastic.out(1, 0.4)',
      duration: 1.5
    })
    .to('#avatar', { y: 0, ease: 'power4.out', opacity: 1 })
    .to('#welcome', { y: 0, ease: 'power4.out', opacity: 1 }, '-=0.4')
    .to('#dida', { y: 0, ease: 'power4.out', opacity: 1 }, '-=0.6')
    .to(
      '.label-1',
      {
        y: 0,
        ease: 'power1.out',
        opacity: 1,
        duration: 1,
        delay: index => 0.2 * index
      },
      '-=0.0'
    )
    .to('.logo-img', {
      opacity: 1,
      ease: 'elastic.out(1, 0.4)',
      scale: 1,
      y: 0
    })
    .to('.logo2', {
      y: 0,
      ease: 'power1.out',
      opacity: 1,
      duration: 1,
      delay: index => 0.2 * index
    })
    .to('.sns-tip', { y: 0, ease: 'power1.out', opacity: 1, duration: 1 })
    .to('.sns-label', {
      y: 0,
      ease: 'elastic.out(1, 0.4)',
      opacity: 1,
      duration: 1,
      rotateZ: 0,
      scale: 1,
      delay: index => 0.2 * index
    })
    .to('.money-tip', { y: 0, ease: 'power1.out', opacity: 1, duration: 1 })
    .to('.zhifubao', { y: 0, ease: 'power1.out', opacity: 1, duration: 1 })
    .to('.weixin', { y: 0, ease: 'power1.out', opacity: 1, duration: 1 })
})
</script>

<style lang="less" scoped>
@import url(./styles/AboutMe.less);
</style>
