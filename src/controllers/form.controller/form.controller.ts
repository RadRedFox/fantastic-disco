import {
	Request,
	Response
} from 'express'
import httpStatus from 'http-status'

import {
	filterResponses,
	requestFormResponses,
	type FilloutFilterClauseType,
	type FilloutStatus,
	type FilloutSort
} from '@/services/fillout.service'

export const getFilteredResponses = async ( request: Request, response: Response ) => {
	try {
		//* URL params
		const formId = request.params.formId

		//* Query params
		const filters: FilloutFilterClauseType[] = request.query.filters
			? JSON.parse( request.query.filters as string ) || []
			: []

		//* Request FillOut API for submissions
		const {
			totalResponses,
			pageCount,
			responses
		} = await requestFormResponses(
			formId,
			{
				limit: request.query.limit as string,
				afterDate: request.query.afterDate as string,
				beforeDate: request.query.beforeDate as string,
				offset: request.query.offset as string,
				status: request.query.status as FilloutStatus,
				includeEditLink: request.query.includeEditLink as string,
				sort:  request.query.sort as FilloutSort
			}
		)

		//* Filter responses
		try {
			let updatedResponses = responses
			let updatedPageCount = pageCount
			let updatedTotal = totalResponses

			filters.forEach( ( filter ) => {
				updatedResponses = filterResponses( filter, updatedResponses )
			} )

			response.json( {
				totalResponses: updatedTotal,
				pageCount: updatedPageCount,
				responses: updatedResponses
			} )
		} catch ( error ) {
			console.log( 'Problem filtering results, sending back originals' )
			console.error( error )
			response.json( {
				totalResponses,
				pageCount,
				responses
			} )
		}
	} catch ( error ) {
		console.error( error )
		response.status( httpStatus.INTERNAL_SERVER_ERROR ).send( 'Server error, please try again' )
	}
}
