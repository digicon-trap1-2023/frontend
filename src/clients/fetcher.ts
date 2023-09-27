import type { Role } from '@/clients/user/types'
import { ElNotification } from 'element-plus'
import ky from 'ky'

export const fetcher = {
  get: <T>(url: string, role?: Role) =>
    ky
      .get(url, {
        headers: {
          'X-Role': role
        }
      })
      .json<T>()
      .catch<T>((e) => {
        console.log(e)
        ElNotification({
          message: e.message,
          type: 'error',
          position: 'bottom-left',
          duration: 5000
        })
        throw e
      }),
  getWithQuery: <T>(url: string, query: URLSearchParams, role?: Role) =>
    ky
      .get(url, {
        searchParams: query,
        headers: {
          'X-Role': role
        }
      })
      .json<T>()
      .catch<T>((e) => {
        console.log(e)
        ElNotification({
          message: e.message,
          type: 'error',
          position: 'bottom-left'
        })
        throw e
      }),
  post: <T>(url: string, data: unknown) =>
    ky
      .post(url, { json: data })
      .json<T>()
      .catch<T>((e) => {
        console.log(e)
        ElNotification({
          message: e.message,
          type: 'error',
          position: 'bottom-left',
          duration: 5000
        })
        throw e
      }),
  patch: <T>(url: string, data: unknown) =>
    ky
      .patch(url, { json: data })
      .json<T>()
      .catch<T>((e) => {
        console.log(e)
        ElNotification({
          message: e.message,
          type: 'error',
          position: 'bottom-left',
          duration: 5000
        })
        throw e
      }),
  delete: <T>(url: string) =>
    ky
      .delete(url)
      .json<T>()
      .catch<T>((e) => {
        console.log(e)
        ElNotification({
          message: e.message,
          type: 'error',
          position: 'bottom-left',
          duration: 5000
        })
        throw e
      }),
  postFormData: <T>(url: string, data: FormData) =>
    ky
      .post(url, { body: data })
      .json<T>()
      .catch<T>((e) => {
        console.log(e)
        ElNotification({
          message: e.message,
          type: 'error',
          position: 'bottom-left',
          duration: 5000
        })
        throw e
      }), // https://github.com/sindresorhus/ky?tab=readme-ov-file#sending-form-data
  postWithoutData: <T>(url: string) =>
    ky
      .post(url)
      .json<T>()
      .catch<T>((e) => {
        console.log(e)
        ElNotification({
          message: e.message,
          type: 'error',
          position: 'bottom-left',
          duration: 5000
        })
        throw e
      }),
  patchFormData: <T>(url: string, data: FormData) =>
    ky
      .patch(url, { body: data })
      .json<T>()
      .catch<T>((e) => {
        console.log(e)
        ElNotification({
          message: e.message,
          type: 'error',
          position: 'bottom-left',
          duration: 5000
        })
        throw e
      })
}
