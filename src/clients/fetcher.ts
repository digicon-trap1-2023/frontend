import ky from 'ky'

export const fetcher = {
  get: <T>(url: string) => ky.get(url).json<T>(),
  getWithQuery: <T>(url: string, query: URLSearchParams) =>
    ky.get(url, { searchParams: query }).json<T>(),
  post: <T>(url: string, data: unknown) => ky.post(url, { json: data }).json<T>(),
  patch: <T>(url: string, data: unknown) => ky.patch(url, { json: data }).json<T>(),
  delete: <T>(url: string) => ky.delete(url).json<T>(),
  postFormData: <T>(url: string, data: FormData) => ky.post(url, { body: data }).json<T>(), // https://github.com/sindresorhus/ky?tab=readme-ov-file#sending-form-data
  postWithoutData: <T>(url: string) => ky.post(url).json<T>()
}
