import { RestHandler, rest } from 'msw'
import type { Tag, TagCreateSeed } from './types'

const tagData: Tag = {
  id: '1',
  name: 'example tag'
}

const initials = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']

export const tagHandlers = (apiOrigin: string): RestHandler[] => [
  rest.get(`${apiOrigin}/tags`, (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json<Tag[]>(
        Array.from({ length: 1000 }).map((_, idx) => ({
          id: `Option${idx + 1}`,
          name: `${initials[idx % 10]}${idx}`
        }))
      )
    )
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
