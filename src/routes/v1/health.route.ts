import express from 'express'

import { getHealth } from '@/controllers/health.controller'

export const router = express.Router()

router
	.route( '/' )
	.get( getHealth )
	.post( getHealth )
	.put( getHealth )
	.patch( getHealth )
	.delete( getHealth )

export default router
