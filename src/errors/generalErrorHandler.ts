import { ErrorRequestHandler, Request, Response, NextFunction } from 'express'
import { ErrorWithStatusCode } from './errorGenerator'

const generalErrorHandler: ErrorRequestHandler = (
  err: ErrorWithStatusCode,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { message: msg, statusCode } = err
  //console.error(err);
  res.status(statusCode || 500).json({ message: msg })
}

export default generalErrorHandler
