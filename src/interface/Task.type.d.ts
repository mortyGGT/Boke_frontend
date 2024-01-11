declare interface TaskItemInfo {
  content: string
  CreatedAt?: string
  id: string | number
  publisherId: number // 发布人
  workerId: number //接收人
  // 这几个都是为了适配 留言区的评论
  contact?: string
  nickname?: string
  avatar?: string
  level?: number
  award: number
  status: number
  isInvite: boolean
  pannel: number
}
