/**
 * Action that logs in a user with the given email and password
 * @module actions/loginUser
 */
import React from 'react'
import { Auth } from 'aws-amplify'
import { AuthActions } from '@/actions/actionTypes'
import { LoginParams } from '@/hooks/types'
import { AuthActionParams } from '@/store/auth/types'

type UserData = {
  jwtToken: string
  email: string
  username: string
}

export default async function loginUser(
  dispatch: React.Dispatch<AuthActionParams>,
  payload: LoginParams
): Promise<UserData | undefined> {
  try {
    dispatch({ type: AuthActions.LOGIN_REQUEST })
    const user = await Auth.signIn(payload.email, payload.password)
    const session = await Auth.currentSession()

    if (!session || !session.isValid()) {
      throw new Error('Invalid user session')
    }

    const jwtToken = await session?.getAccessToken()?.getJwtToken()

    // If we don't have a jwtToken, throw an error
    if (!jwtToken) {
      throw new Error('No JWT token')
    }

    if (!user?.getSignInUserSession()) {
      throw new Error('Invalid user')
    }

    const data: UserData = {
      jwtToken,
      email: user.attributes.email,
      username: user.getUsername(),
    }
    dispatch({ type: AuthActions.LOGIN_SUCCESS, payload: data })
    return data
  } catch (error) {
    dispatch({ type: AuthActions.LOGIN_FAILURE, error: error as Error })
    throw error
  }
}
