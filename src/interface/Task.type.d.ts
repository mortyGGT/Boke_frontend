declare interface TaskItemInfo {
  title: string
  content: string
  CreatedAt?: string
  id: string | number
  publisherId: number // 发布人
  workerId: number //接收人
  user: UserEasy
  contact?: string
  nickname?: string
  avatar?: string
  level?: number
  award: number
  status: number
  isInvite: boolean
  pannel: number
  isPublisher: boolean
  alreadyApply: boolean
  maxWorker: number
  workerIds: string
}
