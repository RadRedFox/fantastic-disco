import express from 'express'

import { getFilteredResponses } from '@/controllers/form.controller'

export const router = express.Router()

router
	.route( '/:formId/filteredResponses' )
	.get( getFilteredResponses )

export default router
