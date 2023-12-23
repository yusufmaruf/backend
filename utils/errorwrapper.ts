/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { ValidationError, NotFoundError } from 'objection'

/**
 * @param { Promise } promise
 * @param { Object= } errorExt - Additional Information you can pass to the err object
 * @return { Promise }
 */
export async function to<T, U = Error> (
  promise: Promise<T>,
  errorExt?: object
): Promise<[U, undefined] | [null, T]> {
  return await promise
    .then<[null, T]>((data: T) => [null, data])
    .catch<[U, undefined]>((err: U) => {
    if (errorExt) {
      const parsedError = Object.assign({}, err, errorExt)
      return [parsedError, undefined]
    }

    return [err, undefined]
  })
}

function errorCatcher (error: unknown) {
  if (error instanceof ValidationError) {
    return {
      status: 400,
      data: error.message
    }
  }

  if (error instanceof NotFoundError) {
    return {
      status: 404,
      data: error.message
    }
  }

  return {
    status: 500,
    data: (error as Error).message
  }
}

export async function errorWrapper<T> (fn: Promise<T>) {
  const [error, data] = await to(fn)
  if (error) return errorCatcher(error)
  return {
    status: 200,
    data
  }
}
