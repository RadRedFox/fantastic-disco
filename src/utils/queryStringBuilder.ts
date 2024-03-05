/**
 ** queryStringBuilder
 ** Accepts an object of strings & converts it into a URL valid query string
 * @param keyValuePairs { [ key: string ]: string }
 * @returns string
 */
export const queryStringBuilder = ( keyValuePairs: { [ key: string ]: string } ): string => {
	const parts = Object.entries( keyValuePairs )

	if ( Object.entries( parts ).length === 0 ) return ''

	let queryString = '?'

	parts.forEach( ( [ key, value ] ) => {
		if ( !key || !value ) return

		if ( queryString.length > 1 ) queryString += '&'

		queryString += `${ key }=${ value }`
	} )

	return queryString
}

export default queryStringBuilder
