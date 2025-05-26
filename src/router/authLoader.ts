/**
 * Auth state loader for react-router data routes.
 * @module router/authLoader
 * @see {@link dashboard/Routes}
 */
import { redirect } from 'react-router-dom'
import getJWT from '@/utils/getJWT'
import { Routes } from '@/router/constants'

const authLoader = async (): Promise<unknown> => {
  const jwtPromise = getJWT()
  try {
    await jwtPromise
  } catch {
    throw redirect(Routes.AUTH_LOGIN)
  }

  return {
    jwtToken: jwtPromise,
  }
}

export default authLoader
