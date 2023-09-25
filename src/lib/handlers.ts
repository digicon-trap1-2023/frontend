import { documentHandlers } from '@/clients/document/mocks'
import { tagHandlers } from '@/clients/tag/mocks'

export const handlers = (apiOrigin: string) =>
  [documentHandlers(apiOrigin), tagHandlers(apiOrigin), requestHandler(apiOrigin)].flat()
