import { RestHandler, rest } from 'msw'
import type { Document, DocumentDetail } from './types'

const documentData: Document = {
  id: '1',
  file: 'https://example.com',
  title: 'example document',
  bookmarked: false,
  referenced: false
}

const documentDetailData: DocumentDetail = {
  ...documentData,
  description: 'example description',
  tags: [
    { id: '1', name: 'tag1' },
    { id: '2', name: 'tag2' }
  ]
}

export const documentHandlers = (apiOrigin: string): RestHandler[] => [
  rest.get(`${apiOrigin}/documents`, (req, res, ctx) =>
    res(ctx.status(200), ctx.json<Document[]>([documentData]))
  ),
  rest.get(`${apiOrigin}/documents/:id`, (req, res, ctx) =>
    res(ctx.status(200), ctx.json<DocumentDetail>(documentDetailData))
  ),
  rest.post(`${apiOrigin}/documents`, async (req, res, ctx) => {
    // formDataが取れなさそうなので諦め
    return res(ctx.status(200), ctx.json<DocumentDetail>(documentDetailData))
  }),
  rest.patch(`${apiOrigin}/documents/:id`, async (req, res, ctx) =>
    res(ctx.status(200), ctx.json<DocumentDetail>(documentDetailData))
  ),
  rest.delete(`${apiOrigin}/documents/:id`, (req, res, ctx) => res(ctx.status(200))),
  rest.post(`${apiOrigin}/documents/:id/bookmarks`, (req, res, ctx) => res(ctx.status(200))),
  rest.delete(`${apiOrigin}/documents/:id/bookmarks`, (req, res, ctx) => res(ctx.status(200))),
  rest.post(`${apiOrigin}/documents/:id/referenced`, (req, res, ctx) => res(ctx.status(200))),
  rest.delete(`${apiOrigin}/documents/:id/referenced`, (req, res, ctx) => res(ctx.status(200)))
]
