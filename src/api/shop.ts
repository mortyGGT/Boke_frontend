import request from '@/utils/request'

/**
 * 获取商品列表
 * @returns
 */
export const getShopList = (pageparams: PageParams) => {
  return request({
    method: 'post',
    url: '/api/shop/list',
    data: pageparams
  })
}

export const doOrder = (id: number) => {
  return request({
    method: 'post',
    url: `/api/shop/order/${id}`
  })
}
