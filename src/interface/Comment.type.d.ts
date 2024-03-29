declare interface CommentItemInfo {
  childrens?: Array<CommentItemInfo>
  content: string
  CreatedAt?: string
  id: string | number
  toUser?: UserEasy
  user?: UserEasy
  toUid?: number
  // 这几个都是为了适配 留言区的评论
  contact?: string
  nickname?: string
  avatar?: string
  level?: number
}
