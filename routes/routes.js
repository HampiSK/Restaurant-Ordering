import Router from 'koa-router'
import bodyParser from 'koa-body'

import publicRouter from './public.js'
import secureRouter from './secure.js'

const mainRouter = new Router()
mainRouter.use(bodyParser({ multipart: true }))

const nestedRoutes = [publicRouter, secureRouter]
for (const router of nestedRoutes) {
	mainRouter
		.use(router.routes())
		.use(router.allowedMethods())
}


/** @Export For Main Router Middleware */
export default mainRouter
