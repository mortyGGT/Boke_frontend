<template>
  <div class="article-item">
    <div class="list-box" v-for="item in myArticleList" :key="item.id">
      <ArticleItem :articleItem="item" />
      <div class="button-group">
        <ul class="pannel">
          <li @click="$router.push(`/index/updatearticle/${item.id}`)">编辑</li>
          <!-- <li>管理评论</li> -->
          <li class="danger" @click="deleteArticle(item.id)">删除</li>
          <span v-if="Number(userinfo.role) >= 3">是否为往生堂限定&nbsp;</span>
          <el-switch
            v-if="Number(userinfo.role) >= 3"
            v-model="item.isInvite"
            :active-value="true"
            :inactive-value="false"
            @change="switchPrivate(item.id)"
          />
        </ul>
      </div>
    </div>
    <MyPagination :pageParams="pageParams" :total="articleTotal" />
  </div>
</template>
<script setup lang="ts">
import { deleteMyArticle, getMyArticles, switchMyArticle } from '@/api/article'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useUserStore } from '@/store/user'

const { userinfo } = useUserStore()
const props = defineProps<{
  userId: string
}>()
const pageParams = reactive<PageParams>({
  page_no: 1,
  page_size: 5
})
const myArticleList = ref<ArticleItemInfo[]>()
const articleTotal = ref(0)
const getMyarticleFn = async () => {
  if (!props.userId) {
    ElMessage.error('请登录后重试')
  }
  const { data } = await getMyArticles(pageParams)
  myArticleList.value = data.data.page_list
  articleTotal.value = data.data.total_count
}
const switchPrivate = async (id: number) => {
  try {
    await switchMyArticle(id)
    ElMessage.success('修改成功')
    await getMyarticleFn()
  } catch (error) {
    ElMessage.error('出现错误')
  }
}
const deleteArticle = async (id: number) => {
  ElMessageBox.confirm(
    '删除文章后，数据库中将永远失去该文章的所有数据，也无法再次查看！',
    '删除文章',
    {
      confirmButtonText: '我要删除',
      cancelButtonText: '取消',
      type: 'error'
    }
  ).then(async () => {
    await deleteMyArticle(id)
    ElMessage.success('删除成功')
    getMyarticleFn()
  })
}
watchEffect(() => {
  getMyarticleFn()
})
</script>

<style lang="less" scoped>
.list-box {
  padding: 5px;
  .button-group {
    .pannel {
      display: flex;
      align-items: center;
      li {
        padding: 0 @padding-general;
        background-color: @bgColor;
        border-radius: @border-radius;
        margin: 0 @margin-general;
        transition: all ease 0.4s;
        .border-normal();
        .flexbox();
        .cusor-pointer();
        &:hover {
          transform: translateY(-3px);
        }
      }
      .danger {
        background-color: rgb(248, 34, 19);
        color: #fff;
      }
    }
  }
}
</style>
