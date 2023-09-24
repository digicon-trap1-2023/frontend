import { setupWorker } from 'msw'

import { getApiOrigin } from './env'
import { documentHandlers } from '@/clients/document/mocks'

const handlers = (apiOrigin: string) => [documentHandlers(apiOrigin)].flat()

export const initMock = () => {
  if (import.meta.env.MODE === 'development') {
    const worker = setupWorker(...handlers(getApiOrigin()))
    worker.start()
  }
}
