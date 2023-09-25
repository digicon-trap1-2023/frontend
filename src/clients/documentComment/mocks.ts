import { RestHandler, rest } from 'msw'
import type { DocumentComment, DocumentCommentCreateSeed } from './types'

const documentCommentData: DocumentComment = {
  id: '1',
  comment: 'example comment',
  created_by: 'example user',
  created_at: '2023-09-01T00:00:00.000Z'
}
export const documentCommentHandlers = (apiOrigin: string): RestHandler[] => [
  rest.get(`${apiOrigin}/documents/:id/comments`, (req, res, ctx) =>
    res(ctx.status(200), ctx.json<DocumentComment[]>([documentCommentData]))
  ),
  rest.post(`${apiOrigin}/documents/:id/comments`, async (req, res, ctx) => {
    const reqBody: DocumentCommentCreateSeed = await req.json()
    return res(
      ctx.status(200),
      ctx.json<DocumentComment>({
        ...documentCommentData,
        ...reqBody
      })
    )
  }),
  rest.delete(`${apiOrigin}/documents/:id/comments/:commentId`, (req, res, ctx) =>
    res(ctx.status(200))
  )
]
