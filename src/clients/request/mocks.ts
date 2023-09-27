import { RestHandler, rest } from 'msw'
import type { Request, RequestCreateSeed, RequestWithDocuments } from './types'

const requestData: Request = {
  id: '1',
  title: 'example title',
  description: 'example description',
  created_by: 'example user'
}

const requestWithDocumentsData: RequestWithDocuments = {
  id: '1',
  title: 'example request title',
  documents: [
    {
      id: '1',
      title: 'example document title'
    }
  ]
}

export const requestHandlers = (apiOrigin: string): RestHandler[] => [
  rest.get(`${apiOrigin}/requests`, (req, res, ctx) =>
    res(ctx.status(200), ctx.json<Request[]>([requestData]))
  ),
  rest.get(`${apiOrigin}/requests/withDocuments`, (req, res, ctx) =>
    res(ctx.status(200), ctx.json<RequestWithDocuments[]>([requestWithDocumentsData]))
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
