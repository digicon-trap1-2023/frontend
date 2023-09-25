import { RestHandler, rest } from 'msw'
import type { Request, RequestCreateSeed } from './types'

const requestData: Request = {
  id: '1',
  title: 'example title',
  description: 'example description',
  created_by: 'example user'
}
export const requestHandlers = (apiOrigin: string): RestHandler[] => [
  rest.get(`${apiOrigin}/requests`, (req, res, ctx) =>
    res(ctx.status(200), ctx.json<Request[]>([requestData]))
  ),
  rest.post(`${apiOrigin}/requests`, async (req, res, ctx) => {
    const reqBody: RequestCreateSeed = await req.json()
    return res(
      ctx.status(200),
      ctx.json<Request>({
        ...requestData,
        ...reqBody
      })
    )
  }),
  rest.delete(`${apiOrigin}/requests/:id`, (req, res, ctx) => res(ctx.status(200)))
]
