import { createRefreshToken } from '../../db/refreshTokens'
import { getUserByUsername } from '../../db/users'
import { userTransformer } from '../../transformers/user'
import { generateTokens, sendRefreshToken } from '../../utils/jwt'

import { sendError } from 'h3'
import bcrypt from 'bcrypt'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  console.log(body)
  const { username, password } = body

  // console.log('username: ', username.username)

  if (!username || !password) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: 'Invalid Params'
      })
    )
  }

  // Check if the user is registered
  const user = await getUserByUsername(username)

  if (!user) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: 'Username or password is invalid'
      })
    )
  }

  // Compare password
  const doesPasswordMatch = await bcrypt.compare(password, user.password)

  if (!doesPasswordMatch) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: 'Username or password is invalid'
      })
    )
  }

  // Generate tokens
  const { accessToken, refreshToken } = generateTokens(user)

  // Save Refresh Token inside the DB
  await createRefreshToken({
    token: refreshToken,
    userId: user.id
  })

  // Add HTTP only cookie
  sendRefreshToken(event, refreshToken)

  return {
    access_token: accessToken,
    user: userTransformer(user)
  }
})
