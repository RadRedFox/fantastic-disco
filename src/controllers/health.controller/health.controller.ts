import {
	Request,
	Response
} from 'express'

export const getHealth = ( request: Request, response: Response ) => {
	response.json( { healthy: true } )
}
