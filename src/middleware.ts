/* middleware.js */

export const localsMiddleware = (req: any, res: any, next: any) => {
  res.locals.siteName = 'JackInfoApp'
  next()
}
