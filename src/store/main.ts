import { getItem, setItem, removeItem } from '@/utils/storage'
import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
  state: () => {
    return {
      // 这里写变量
      user: {
        token: getItem('token') || '',
        userId: getItem('userId') || '',
        username: getItem('username') || ''
      },
      cancel: {},
      sourcePage: [],
      followBangumiCard: getItem('followBangumiCard') || true
    }
  },
  actions: {
    // 这里写方法action
    setCancel(cancelObj) {
      this.cancel = cancelObj
    },
    setUserToken(token: string) {
      this.user.token = token
      token ? setItem('token', token) : removeItem('token')
    },
    setUserId(id: string) {
      this.user.userId = id
      String(id) ? setItem('userId', id) : removeItem('userId')
    },
    setUsername(name: string) {
      this.user.username = name
      name ? setItem('username', name) : removeItem('username')
    },
    setFollowBangumiCard(val: boolean) {
      this.followBangumiCard = val
      setItem('followBangumiCard', val)
    }
  }
})
