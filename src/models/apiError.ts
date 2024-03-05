export class ApiError extends Error {
	public statusCode: number
	public stackTrace?: string

	constructor( statusCode: number, message: string, stack = '' ) {
		super( message )

		this.statusCode = statusCode

		if ( stack ) this.stackTrace = stack
		else Error.captureStackTrace( this, this.constructor )
	}
}

export default ApiError
