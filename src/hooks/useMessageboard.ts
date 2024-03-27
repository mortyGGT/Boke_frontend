import { addMessageApi, getMessageApi } from '@/api/message'
import { useUserStore } from '@/store/user'
import { ElMessage, ElScrollbar } from 'element-plus'
import { Ref } from 'vue'
import Logo from '@/assets/img/logo.png'
import { decodeEmoji, encodeEmoji } from '@/utils/emoji'
const userinfo = useUserStore()
export const useMessageBoardParams = () => {
  const messageParams: MessageParamsForTask = reactive({
    title: '',
    content: '',
    contact: '',
    userId: '',
    award: 0,
    maxWorker: 0,
    deadLine: '',
    isInvite: false
  })
  const pageparams = reactive<PageParams>({ page_no: 1, page_size: 5 })
  const messageList = ref<TaskItemInfo[]>()
  const total = ref(0)

  return { messageParams, pageparams, messageList, total }
}

export const useMessageApi = (
  messageParams: MessageParamsForTask,
  pageparams: PageParams,
  messageList: Ref<TaskItemInfo[]>,
  total: Ref<number>
) => {
  // 方法和逻辑区
  const orderRole = ref(0)
  const body = ref<InstanceType<typeof ElScrollbar>>()
  const getMessage = async (pageparams: PageParams) => {
    const { data } = await getMessageApi(pageparams)
    total.value = data.data.total_count
    messageList.value = data.data.page_list
  }
  // 留言的逻辑
  const publishMessage = async () => {
    if (!messageParams.content) {
      ElMessage.error('内容不能为空')
      return false
    } else if (!messageParams.title) {
      ElMessage.error('请输入标题')
      return false
    }
    messageParams.content = encodeEmoji(messageParams.content)
    messageParams.userId = userinfo.userinfo.id
    messageParams.award = Number(messageParams.award)
    const { data } = await addMessageApi(messageParams)
    if (data.status == 200) {
      ElMessage.success('发表成功')
    } else {
      ElMessage.error(data.message)
    }
    // 清空留言框
    messageParams.content = ''
    messageParams.title = ''
    messageParams.contact = ''
    messageParams.award = 0
    pageparams.page_no = 1
    getMessage(pageparams)
  }
  // 排序方法
  const order = (val: number) => {
    if (orderRole.value === val) {
      return
    } else if (val === 1) {
      pageparams.orderRole = 'a'
      orderRole.value = 1
    } else if (val === 2) {
      pageparams.orderRole = undefined
      orderRole.value = 2
    }
    getMessage(pageparams)
  }
  // 控制滚动条
  const changePage = () => {
    getMessage(pageparams)
    body.value?.setScrollTop(0)
  }
  onMounted(() => {
    getMessage(pageparams)
  })
  return {
    getMessage,
    publishMessage,
    order,
    changePage,
    body,
    orderRole
  }
}

export const useChangeParams = (
  messageParams: MessageParamsForTask,
  messageList: Ref<TaskItemInfo[]>
) => {
  // 排序规则
  const changeAvatarParams = (val: string) => {
    messageParams.avatar = val
  }
  const changeMsg = (val: string) => {
    messageParams.content = val
  }
  const toCommentItem = computed(() => {
    const newCommentList = ref<TaskItemInfo[]>()
    newCommentList.value = messageList.value.map(item => {
      const obj = {
        content: decodeEmoji(item.content),
        contact: item.contact,
        nickname: item.nickname,
        CreatedAt: item.CreatedAt,
        id: item.id,
        avatar: item.avatar,
        publisherId: item.publisherId,
        workerId: item.workerId,
        award: item.award,
        status: item.status,
        isInvite: item.isInvite,
        pannel: item.pannel,
        user: item.user,
        isPublisher: item.isPublisher,
        alreadyApply: item.alreadyApply
      }
      return obj
    })
    return newCommentList.value
  })
  return { changeAvatarParams, changeMsg, toCommentItem }
}
