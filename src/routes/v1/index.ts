import express from 'express'

import formsRoute from '@/routes/v1/forms.route'
import healthRoute from '@/routes/v1/health.route'

export const router = express.Router()

const routes = [
	{
		path: '/',
		route: formsRoute
	},
	{
		path: '/health',
		route: healthRoute
	}
]

routes.forEach( ( { path, route } ) => {
	router.use( path, route )
} )

export default router
