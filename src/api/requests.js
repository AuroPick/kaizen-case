import { instance } from './axios'

export const getTags = async () => {
  const { data } = await instance.get('/tags/list')

  return data
}

export const getPromotions = async () => {
  const { data } = await instance.get('/promotions/list', { params: { Channel: 'PWA' } })

  return data
}

export const getPromotion = async ({ id }) => {
  const { data } = await instance.get('/promotions', { params: { Id: id } })

  return data
}
