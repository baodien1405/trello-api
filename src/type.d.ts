declare namespace Express {
  interface Request {
    user?: AuthPayload
    objKey?: ApiKey
    keyStore?: KeyToken
    refreshToken?: string
  }
}
