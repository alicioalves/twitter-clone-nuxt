import { sendError, parseCookies } from 'h3'
import { getRefreshTokenByToken } from '../../db/refreshTokens'
import { getUserById } from '../../db/users'
import { decodeRefreshToken, generateTokens } from '../../utils/jwt'

export default defineEventHandler(async (event) => {
  const cookies = parseCookies(event)

  const refreshToken = cookies?.refresh_token

  if (!refreshToken) {
    return sendError(
      event,
      createError({
        statusCode: 401,
        statusPage: 'Refresh token is invalid'
      })
    )
  }

  const rToken = await getRefreshTokenByToken(refreshToken)

  if (!rToken) {
    return sendError(
      event,
      createError({
        statusCode: 401,
        statusPage: 'Refresh token is invalid'
      })
    )
  }

  const token = decodeRefreshToken(refreshToken)

  try {
    const user = await getUserById(token.userId)

    const { accessToken } = generateTokens(user)

    return {
      access_token: accessToken
    }
  } catch (error) {
    return sendError(
      event,
      createError({
        statusCode: 500,
        statusPage: 'Something went wrong'
      })
    )
  }
})
