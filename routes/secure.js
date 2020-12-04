/** @Module Secure Router Middleware Header */

/* Packages */
import Router from 'koa-router'

/* Modules */
import { registerGet, registerPost } from '../modules/routes/secure/register.js'
import Accounts from '../modules/builders/accounts.js'
import { secureAuth, securePerm } from '../modules/routes/secure/middlewares.js'
import defaultGetSecure from '../modules/routes/secure/default.js'
import { profileGet, profilePost } from '../modules/routes/secure/profile.js'

/* Constants */
const router = new Router({ prefix: '/secure'})
const DBNAME = 'website.db'

/* Middlewares */
const checkLevel0 = async(ctx, next) => await secureAuth(ctx, next)
// const checkLevel1 = async(ctx, next) => await securePerm(['Waiter','Manager','Admin'],ctx,next)
// const checkLevel2 = async(ctx, next) => await securePerm(['Chef','Manager','Admin'],ctx,next)
const checkLevel3 = async(ctx, next) => await securePerm(['Manager','Admin'],ctx,next)
// const checkLevel4 = async(ctx, next) => await securePerm(['Admin'],ctx,next)

router.use(checkLevel0)
router.use( ['/register'], checkLevel3 )

router.get('/', async(ctx) => await defaultGetSecure(ctx))
router.post('/register', async(ctx) => await registerPost(ctx, await new Accounts(DBNAME)))
router.get('/register', async(ctx) => await registerGet(ctx))
router.post('/profile', async(ctx) => await profilePost(ctx, await new Accounts(DBNAME)))
router.get('/profile', async(ctx) => await profileGet(ctx, await new Accounts(DBNAME)))
router.get('/tables', async(ctx) => {
	try {
		ctx.hbs.Tables = [
			{ TableName: 'Table 1', Comment: 'None' },
			{ TableName: 'Table 2', Comment: '' },
			{ TableName: 'Table 3', Comment: 'None' },
			{ TableName: 'Table 4', Comment: 'None' },
			{ TableName: 'Table 5', Comment: '' },
			{ TableName: 'Table 6', Comment: 'None' }
		]
		await ctx.render('tables', ctx.hbs)
	} catch (err) {
		ctx.hbs.error = err.message
		console.log(err.message)
		await ctx.render('error', ctx.hbs)
	}
})

export default router
