import compression from 'compression'
import cors from 'cors'
import dotenv from 'dotenv'
import express, {
	Express,
	Request,
	Response
} from 'express'
import helmet from 'helmet'
import httpStatus from 'http-status'
import xssClean from 'xss-clean'

import { errorConverter, errorHandler } from '@/middleware/error'
import ApiError from '@/models/apiError'
import v1 from '@/routes/v1'

//* Load values from .env file
dotenv.config()

//* Create server object & grab config values
const app: Express = express()
const PORT = process.env.PORT || 80

//* HTTP Security headers
app.use( helmet() )

//* Parser for JSON requests
app.use( express.json() )

//* Sanitize requests
app.use( xssClean() )

//* GZip compression
app.use( compression() )

//* CORS
app.use( cors() )
app.options( '*', cors() )

//* API Routes
app.get( '/', ( request: Request, response: Response ) => {
	response.send( 'Fillout Server' )
} )

app.use( '/', v1 )

//* Catch any unknown routes and return a 404
app.use( ( request, response, next ) => {
	next( new ApiError( httpStatus.NOT_FOUND, `404 Route not found` ) )
} )

//* Convert generic errors into ApiError objects
app.use( errorConverter )

//* Handle errors
app.use( errorHandler )

//* Start server on specified port
app.listen( PORT, () => {
	console.log( `[server] Server listening at http://localhost:${ PORT }` )
} )
