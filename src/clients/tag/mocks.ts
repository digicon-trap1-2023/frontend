import { RestHandler, rest } from 'msw'
import type { Tag, TagCreateSeed } from './types'

const tagData: Tag = {
  id: '1',
  name: 'example tag'
}
export const tagHandlers = (apiOrigin: string): RestHandler[] => [
  rest.get(`${apiOrigin}/tags`, (req, res, ctx) =>
    res(ctx.status(200), ctx.json<Tag[]>([tagData]))
  ),
  rest.post(`${apiOrigin}/tags`, async (req, res, ctx) => {
    const reqBody: TagCreateSeed = await req.json()
    return res(
      ctx.status(200),
      ctx.json<Tag>({
        ...tagData,
        ...reqBody
      })
    )
  })
]
