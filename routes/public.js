import Router from 'koa-router'

const router = new Router()

import Accounts from '../modules/accounts.js'

import { reguser, regweb } from '../routes/public/register.js'

const dbName = 'website.db'

/**
 * The secure home page.
 *
 * @name Home Page
 * @route {GET} /
 */
router.get('/', async(ctx) => {
	try {
		await ctx.render('index', ctx.hbs)
	} catch (err) {
		await ctx.render('error', ctx.hbs)
	}
})

/**
 * The user registration page.
 *
 * @name Register Page
 * @route {GET} /register
 */
router.get('/register', async(ctx) => regweb(ctx))

/**
 * Runs script to process new user registrations.
 *
 * @name Register Script
 * @route {POST} /register
 */
router.post('/register', async(ctx) => reguser(ctx, await new Accounts(dbName)))

router.get('/login', async(ctx) => {
	console.log(ctx.hbs)
	await ctx.render('login', ctx.hbs)
})

router.post('/login', async(ctx) => {
	const account = await new Accounts(dbName)
	ctx.hbs.body = ctx.request.body
	try {
		const body = ctx.request.body
		await account.login(body.user, body.pass)
		ctx.session.authorised = true
		const referrer = body.referrer || '/secure'
		return ctx.redirect(`${referrer}?msg=you are now logged in...`)
	} catch (err) {
		console.log(err)
		ctx.hbs.msg = err.message
		await ctx.render('login', ctx.hbs)
	} finally {
		await account.close()
	}
})

router.get('/logout', async(ctx) => {
	ctx.session.authorised = null
	ctx.redirect('/?msg=you are now logged out')
})

export default router
