<template>
  <div>
    <MyTab :articles="likedArticles" :fn="deleteCollectFn" @changeTab="getMyLiked()">
      <template #title> 我的任务 </template>
      <template #total> 共{{ total }}条 </template>
    </MyTab>
  </div>
</template>
<script setup lang="ts">
import { getMessageApi, deleteTaskApi } from '@/api/message'
import MyTab from './MyTab.vue'
import { ElMessage } from 'element-plus'
let pageParams = reactive<PageParams>({
  page_no: 1,
  page_size: 5
})
let likedArticles = ref<ArticleItemInfo[]>()
let total = ref(0)
const getMyLiked = async () => {
  const { data } = await getMessageApi(pageParams)
  likedArticles.value = data.data.results
  total.value = data.data.length
}
const deleteCollectFn = async (id: number) => {
  const { data } = await deleteTaskApi(id)
  ElMessage.success('取消任务成功')
}
onMounted(() => {
  // getMyLiked()
})
</script>
