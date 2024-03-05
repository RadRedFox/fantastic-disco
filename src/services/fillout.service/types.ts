export type FilloutFilterClauseType = {
	id: string
	condition: 'equals' | 'does_not_equal' | 'greater_then' | 'less_than'
	value: number | string
}

export type FilloutSort = 'asc' | 'desc'

export type FilloutStatus = 'in_progress' | 'finished'

export type FilloutResponse = {
	submissionId: string
	submissionTime: string
	lastUpdatedAt: string
	questions: {
		id: string
		name: string
		type: string
		value: string | number
	}[]
	calculations: any[]
	urlParameters: any[]
	quiz: any[]
	documents: any[]
	editLink: string
}

export type FilloutAPIResponse = {
	responses: FilloutResponse[]
	totalResponses: number
	pageCount: number
}
