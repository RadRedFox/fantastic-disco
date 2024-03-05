import queryStringBuilder from '@/utils/queryStringBuilder'
import type {
	FilloutFilterClauseType,
	FilloutResponse
} from './types'

type RequestFormResponsesOptions = {
	limit: string | number
	afterDate?: string
	beforeDate?: string
	offset?: string | number
	status?: string
	includeEditLink?: string | boolean
	sort?: string
}

//* Send request to FillOut API
export const requestFormResponses = async ( formId: string, {
	limit,
	afterDate,
	beforeDate,
	offset,
	status,
	includeEditLink,
	sort
}: RequestFormResponsesOptions ) => {
	const queryString = queryStringBuilder( {
		limit: limit ? String( limit ) : String( 150 ),
		afterDate: afterDate ? afterDate : '',
		beforeDate: beforeDate ? beforeDate : '',
		offset: offset ? String( offset ) : String( 0 ),
		status: status ? status : 'finished',
		includeEditLink: includeEditLink ? String( includeEditLink ) : String( false ),
		sort: sort ? sort : 'asc'
	} )
	const result = await fetch( `https://api.fillout.com/v1/api/forms/${ formId }/submissions${ queryString }`, {
		method: 'GET',
		headers: {
			'Authorization': `Bearer ${ process.env.FILLOUT_APIKEY }`
		}
	} )

	return await result.json()
}

//* Run filter on individual responses based on filer provided to factory
const filterResponse = ( {
	id,
	condition,
	value
}: FilloutFilterClauseType ) => ( response: FilloutResponse ) => {
	const question = response.questions.find( ( q ) => q.id === id )

	if ( !question ) return false

	switch ( condition ) {
		case 'equals':
			return question.value === value
		case 'does_not_equal':
			return question.value !== value
		case 'greater_then':
			return question.value > value
		case 'less_than':
			return question.value < value
		default:
			return false
	}
}

//* Fitler response array based on the provided filter object, returning the resulting array
export const filterResponses = (
	filter: FilloutFilterClauseType,
	responses: FilloutResponse[]
) => {
	let updatedResponses = responses.filter( filterResponse( filter ) )

	return responses.filter( filterResponse( filter ) )
}
