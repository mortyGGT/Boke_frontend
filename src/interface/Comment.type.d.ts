declare interface CommentItemInfo {
  childrens?: Array<CommentItemInfo>
  content: string
  CreatedAt?: string
  ID: string | number
  toUser?: UserEasy
  user?: UserEasy
  // 这几个都是为了适配 留言区的评论
  contact?: string
  nickname?: string
  avatar?: string
  level?: number
}
