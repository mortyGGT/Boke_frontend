import request from '@/utils/request'

// 添加任务
export const addMessageApi = (messageParams: MessageParamsForTask) => {
  return request({
    method: 'post',
    url: '/api/message/addmsg',
    data: messageParams
  })
}
// 获取所有任务
export const getMessageApi = (pageParams: PageParams) => {
  return request({
    method: 'post',
    url: '/api/message/findmsg',
    data: pageParams
  })
}
//接取任务
export const applyTaskApi = id => {
  return request({
    method: 'post',
    url: `/api/task/apply/${id}`
  })
}
