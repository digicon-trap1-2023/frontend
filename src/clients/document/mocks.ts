import { RestHandler, rest } from 'msw'
import type { Document } from './types'

const documentData: Document = {
  id: '1',
  file: 'https://placehold.jp/150x150.png',
  title: 'example document',
  bookmarked: false,
  referenced: false,
  userId: '1',
  userName: 'digi-con食べ食べ委員会'
}
const table1 = [100, 600, 350, 200, 800, 450, 1050, 400]
const table2 = [400, 300, 150, 850, 500]
const documentsData: Document[] = Array(40)
  .fill(0)
  .map((_, i) => ({
    id: `${i}`,
    file: `https://placehold.jp/${table1[i % 8]}x${table2[i % 5]}.png`,
    title: `${table1[i % 8]}x${table2[i % 5]}`,
    bookmarked: i % 7 === 0,
    referenced: 1 % 5 === 0,
    userId: `${i}`,
    userName: `digi-con食べ食べ委員会 v${i}`
  }))
export const documentHandlers = (apiOrigin: string): RestHandler[] => [
  rest.get(`${apiOrigin}/documents`, (req, res, ctx) => {
    const list = req.url.searchParams
      .get('tags')
      ?.split(',')
      .map((v) => v.slice(-1))
    if (list) {
      return res(
        ctx.status(200),
        ctx.json<Document[]>(documentsData.filter((v) => list.some((w) => w === v.id.slice(-1))))
      )
    }

    return res(ctx.status(200), ctx.json<Document[]>(documentsData))
  }),
  rest.get(`${apiOrigin}/documents/:id`, (req, res, ctx) =>
    res(ctx.status(200), ctx.json<Document>(documentData))
  ),
  rest.post(`${apiOrigin}/documents`, async (req, res, ctx) => {
    // formDataが取れなさそうなので諦め
    return res(ctx.status(200), ctx.json<Document>(documentData))
  }),
  rest.patch(`${apiOrigin}/documents/:id`, async (req, res, ctx) =>
    res(ctx.status(200), ctx.json<Document>(documentData))
  ),
  rest.delete(`${apiOrigin}/documents/:id`, (req, res, ctx) => res(ctx.status(200))),
  rest.post(`${apiOrigin}/documents/:id/bookmarks`, (req, res, ctx) => res(ctx.status(200))),
  rest.delete(`${apiOrigin}/documents/:id/bookmarks`, (req, res, ctx) => res(ctx.status(200))),
  rest.post(`${apiOrigin}/documents/:id/referenced`, (req, res, ctx) => res(ctx.status(200))),
  rest.delete(`${apiOrigin}/documents/:id/referenced`, (req, res, ctx) => res(ctx.status(200)))
]
