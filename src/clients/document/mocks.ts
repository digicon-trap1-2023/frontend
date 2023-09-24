import { RestHandler, rest } from 'msw'
import type { Document, DocumentCreateSeed } from './types'

const documentData: Document = {
  id: '1',
  file: 'https://example.com',
  title: 'example document',
  bookmarked: false,
  referenced: false
}
export const documentHandlers = (apiOrigin: string): RestHandler[] => [
  rest.get(`${apiOrigin}/documents`, (req, res, ctx) =>
    res(ctx.status(200), ctx.json<Document[]>([documentData]))
  ),
  rest.get(`${apiOrigin}/documents/:id`, (req, res, ctx) =>
    res(ctx.status(200), ctx.json<Document>(documentData))
  ),
  rest.post(`${apiOrigin}/documents`, async (req, res, ctx) => {
    const reqBody: DocumentCreateSeed = await req.json()
    return res(
      ctx.status(200),
      ctx.json<Document>({
        ...documentData
      })
    )
  }),
  rest.patch(`${apiOrigin}/documents/:id`, async (req, res, ctx) => {
    const reqBody: DocumentCreateSeed = await req.json()
    return res(
      ctx.status(200),
      ctx.json<Document>({
        ...documentData
      })
    )
  }),
  rest.delete(`${apiOrigin}/documents/:id`, (req, res, ctx) => res(ctx.status(200))),
  rest.post(`${apiOrigin}/documents/:id/bookmarks`, (req, res, ctx) => res(ctx.status(200))),
  rest.delete(`${apiOrigin}/documents/:id/bookmarks`, (req, res, ctx) => res(ctx.status(200))),
  rest.post(`${apiOrigin}/documents/:id/referenced`, (req, res, ctx) => res(ctx.status(200))),
  rest.delete(`${apiOrigin}/documents/:id/referenced`, (req, res, ctx) => res(ctx.status(200)))
]
