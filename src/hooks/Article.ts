import { encodeEmoji, decodeEmoji } from './../utils/emoji'
import { getArticleItem } from '@/api/article'
import { addComment, getComments } from '@/api/comment'
import { useUserStore } from '@/store/user'
import { getRealativeTime } from '@/utils/dayjs'
import { ElMessage } from 'element-plus'
import { useRoute } from 'vue-router'
import { userCollect, userLike } from '@/api/user'
import { storeToRefs } from 'pinia'

export const useArticle = () => {
  const route = useRoute()
  const userStore = useUserStore()
  const user = storeToRefs(userStore).userinfo
  const commentParams: CommentParams = reactive({
    article_id: Number(route.params.id),
    user_id: Number(user.value.id),
    nickname: user.value.nickname,
    content: ''
  })
  const article = ref<ArticleItemInfo>()
  const commentList = ref<CommentItemInfo[]>([])
  // loading
  const isLikedLoading = ref(false)
  const isCollectLoading = ref(false)
  // 评论分页参数
  const pageparams: PageParams = reactive({
    page_no: 1,
    page_size: 3
  })
  const totalComment = ref(0)
  // 计算属性 计算相对时间
  const time = computed(() => {
    article.value as ArticleItemInfo
    if (article.value) {
      return getRealativeTime(article.value.CreatedAt)
    }
  })
  // 滚动
  const body = ref<HTMLElement | null>()
  // 方法区-----------------------
  // 发送一级评论
  const publishComment = async () => {
    if (commentParams.content != '') {
      commentParams.content = encodeEmoji(commentParams.content)
      commentParams.article_id = Number(route.params.id)
      const userStore = useUserStore()
      commentParams.user_id = Number(userStore.userinfo.id)
      commentParams.nickname = userStore.userinfo.nickname
      const { data } = await addComment(commentParams)
      if (data.status === 200) {
        ElMessage.success('发布成功')
        commentParams.content = ''
        getAllComment()
      } else {
        ElMessage.error(data.message)
      }
    } else {
      ElMessage.error('内容不能为空')
    }
  }
  // 获取文章
  const getArticle = async (id: any) => {
    const { data } = await getArticleItem(id)
    if (data.status === 200) {
      article.value = data.data
    } else {
      ElMessage.error(data.message)
    }
  }
  // 获取评论
  const getAllComment = async () => {
    const { data } = await getComments(route.params.id as string, pageparams)
    commentList.value = data.data ? data.data.page_list : []
    totalComment.value = data ? data.data.total_count : 0
    if (commentList.value && commentList.value.length > 0) {
      commentList.value.map(item => {
        item.content = decodeEmoji(item.content)
        if (item.childrens) {
          item.childrens.forEach(child => {
            child.content = decodeEmoji(child.content)
          })
        }
        return item
      })
    }

    return commentList
  }
  const goTop = () => {
    console.log(body.value?.scrollTop)
  }
  // 发送二级评论
  const publishSecond = () => {
    ElMessage.success('发送成功')
    getAllComment()
  }
  // 喜欢文章
  const likedArticle = async () => {
    isLikedLoading.value = true
    // 如果是登录状态下
    if (user.value.id) {
      const likedValue = !article.value?.isLiked
      if (article.value) {
        const reqParams: LikeOrCollectParams = {
          articleId: Number(article.value.id),
          flag: likedValue
        }
        await userLike(reqParams)
        article.value.isLiked = likedValue
      }
    } else {
      ElMessage.error('请先登录后点赞')
    }
    isLikedLoading.value = false
  }
  // 收藏文章
  const collectArticle = async () => {
    isCollectLoading.value = true
    if (user.value.id) {
      const collectValue = !article.value?.isCollected
      if (article.value) {
        const reqParams: LikeOrCollectParams = {
          articleId: article.value.id,
          flag: collectValue
        }
        await userCollect(reqParams)
        article.value.isCollected = collectValue
      }
    } else {
      ElMessage.error('请先登录后收藏')
    }
    isCollectLoading.value = false
  }
  // 分页获取评论
  const changePage = () => {
    getAllComment()
  }
  // 函数加载 挂载组件
  onMounted(() => {
    getArticle(route.params.id)
    getAllComment()
  })
  return {
    collectArticle,
    likedArticle,
    isLikedLoading,
    isCollectLoading,
    publishSecond,
    goTop,
    totalComment,
    getAllComment,
    changePage,
    publishComment,
    commentParams,
    time,
    article,
    commentList,
    pageparams,
    user
  }
}
