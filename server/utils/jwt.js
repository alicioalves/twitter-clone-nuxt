import jwt from 'jsonwebtoken'
const config = useRuntimeConfig()

const generateAccessToken = (user) => {
  return jwt.sign(
    {
      userId: user.id
    },
    config.jwtAccessSecret,
    {
      expiresIn: '10m'
    }
  )
}

const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      userId: user.id
    },
    config.jwtRefreshSecret,
    {
      expiresIn: '4h'
    }
  )
}

export const generateTokens = (user) => {
  const accessToken = generateAccessToken(user)
  const refreshToken = generateRefreshToken(user)

  return {
    accessToken: accessToken,
    refreshToken: refreshToken
  }
}

export const sendRefreshToken = (event, token) => {
  setCookie(event, 'refresh_token', token, {
    httpOnly: true,
    sameSite: true
  })
}
