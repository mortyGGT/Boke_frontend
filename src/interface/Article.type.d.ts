declare global {
  interface ArticleBody {
    contentHtml?: string | void
    html?: string
    content: string | void
  }
  interface ArticleReqParams {
    id?: string
    body: ArticleBody
    summary: string
    articleName: string
    tags: Array<Tag>
    banner: string
    pannel: number
  }
  interface Content {
    html: string | undefined
    text: string | undefined
  }
  interface ArticleItemInfo {
    title: string
    author?: string
    imageUrl: string
    authorVo?: UserEasy
    content: string
    body?: ArtiStringDecoder
    CreatedAt: string
    ID: number
    desc: string
    tags?: Array<Tag>
    isLiked?: boolean
    isCollected?: boolean
    collectCount?: number
    likeCount: number
    readCount: number
    commentCount: number
    pannel?: number
  }

  interface Banner {
    banner: string
    id: string
    articleName: string
  }
  interface ArticleTime {
    date: string
    num: number
  }
  interface Tag {
    id: number
    name: string
  }
  interface PicVo {
    title: string
    summary: string
    url: string
    author: UserEasy
    createTime: stirng
    id: string
    origin: number
    likes: number
    tag: number
  }
}

export {}
