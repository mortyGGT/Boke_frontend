declare global {
  interface PageParams {
    page_no: number
    page_size: number
    authorId?: string
    tagIds?: Array<number>
    year?: string
    month?: string
    orderRole?: string
    keyword?: string
    //该选项是用于筛选文章板块的 可选1是 水文日常 2是 技术文章 3是 个人 笔记 4是 素材或者分享 5是 其他  6是 设计排版 参考 7是 素材资源 文章分享
    pannel?: number
    //pic画廊的筛选项
    tag?: number
    isOrigin?: number
  }
  interface CommentParams {
    article_id: string | number
    toUid?: string
    parent_id?: string | number
    content: string
    user_id: number
    nickname: string
    level?: number
  }
  interface MessageParamsForTask {
    title: string
    contact: string
    content: string
    userId: number | string
    isInvite: boolean
    award: number
    avatar?: string
    maxWorker: number
    deadLine?: string
  }
  interface RegisterParams {
    username: string
    nickname: string
    password: string
    invitation?: string
  }
  interface UpdateUserInfoParams {
    avatar: string
    nickname: string
    introduce: string
    banner: string
    gender: string
    email: string
  }
  interface LikeOrCollectParams {
    articleId: string | number
    flag: boolean
  }
  interface PicParams {
    id?: string
    title: string
    summary: string
    url: string
    isOrigin: number
    tag?: number
  }
}
export {}
