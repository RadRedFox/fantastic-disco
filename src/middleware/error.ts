import {
	NextFunction,
	Request,
	Response
} from 'express'
import httpStatus from 'http-status'

import ApiError from '@/models/apiError'

export const errorConverter = ( error: any, request: Request, response: Response, next: NextFunction ) => {
	let err = error

	if ( !( error instanceof ApiError ) ) {
		const statusCode = error.statusCode
			? httpStatus.BAD_REQUEST
			: httpStatus.INTERNAL_SERVER_ERROR
		const message = error?.message || httpStatus[ statusCode ]

		err = new ApiError( statusCode, message, error?.stack || '' )
	}

	next( err )
}

export const errorHandler = ( error: ApiError, request: Request, response: Response, next: NextFunction ) => {
	let {
		statusCode,
		message,
		stackTrace
	} = error

	response.locals.errorMessage = message

	const responseObject = {
		code: statusCode,
		message,
		stackTrace
	}

	response.status( statusCode ).send( responseObject )
}
