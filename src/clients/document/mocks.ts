import { RestHandler, rest } from 'msw'
import type { Document, DocumentDetail } from './types'

const documentData: Document = {
  id: '1',
  file: 'https://placehold.jp/150x150.png',
  title:
    'example document aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
  bookmarked: false,
  referenced: false,
  user_id: '1',
  user_name: 'digi-con食べ食べ委員会',
  related_request: null,
  file_height: 100,
  file_width: 100
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
    user_id: `${i}`,
    user_name: `digi-con食べ食べ委員会 v${i}`,
    related_request: null,
    file_height: 100,
    file_width: 100
  }))

const documentDetailData: DocumentDetail = {
  ...documentData,
  description: 'example description'.repeat(1000),
  tags: [
    { id: '1', name: 'tag1' },
    { id: '2', name: 'tag2' }
  ]
}

export const documentHandlers = (apiOrigin: string): RestHandler[] => [
  rest.get(`${apiOrigin}/documents`, (req, res, ctx) => {
    const list = req.url.searchParams
      .get('tags')
      ?.split(',')
      .map((v) => v.slice(-1))
    if (list) {
      return res(
        ctx.status(200),
        ctx.json<Document[]>(
          documentsData
            .filter((v) => list.some((w) => w === v.id.slice(-1)))
            .filter((v) => req.url.searchParams.get('type') !== 'bookmark' || v.bookmarked)
        )
      )
    }

    return res(
      ctx.status(200),
      ctx.json<Document[]>(
        documentsData.filter((v) => req.url.searchParams.get('type') !== 'bookmark' || v.bookmarked)
      )
    )
  }),
  rest.get(`${apiOrigin}/reader/documents`, (req, res, ctx) => {
    const list = req.url.searchParams
      .get('tags')
      ?.split(',')
      .map((v) => v.slice(-1))
    if (list) {
      return res(
        ctx.status(200),
        ctx.json<Document[]>(
          documentsData
            .filter((v) => list.some((w) => w === v.id.slice(-1)))
            .map((document, index) => ({
              ...document,
              referenced_users: index % 2 === 0 ? ['user1'] : []
            }))
        )
      )
    }

    return res(
      ctx.status(200),
      ctx.json<Document[]>(
        documentsData.map((document, index) => ({
          ...document,
          referenced_users: index % 2 === 0 ? ['user1'] : []
        }))
      )
    )
  }),
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
  rest.post(`${apiOrigin}/documents/:id/reference`, (req, res, ctx) => res(ctx.status(200))),
  rest.delete(`${apiOrigin}/documents/:id/reference`, (req, res, ctx) => res(ctx.status(200)))
]
