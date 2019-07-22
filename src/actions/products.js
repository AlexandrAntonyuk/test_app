import { api } from '../config'

export async function getAll(page, perPage, updatedAfter) {
  let res = await api.get(`articles?page=${page}&per-page=${perPage}`)
  if (res.status !== 200) throw new Error(`Can't fetch request`)

  return res
}

export async function getOne(id) {
  let res = await api.get(`articles/${id}`)
  if (res.status !== 200) throw new Error(`Can't fetch request`)

  return res
}

export async function create(data) {
  let res = await api.post('articles', data)
  if (res.status !== 201) throw new Error(`Can't fetch request`)

  return res
}

export async function update(id, data) {
  let res = await api.put(`articles/${id}`, data)
  if (res.status !== 200) throw new Error(`Can't fetch request`)

  return res
}
