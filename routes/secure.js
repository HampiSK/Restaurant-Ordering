import Router from 'koa-router'

const router = new Router({ prefix: '/secure'})

async function checkAuth(ctx, next) {
	console.log('secure router middleware')
	console.log(ctx.hbs)
	try{
		if (ctx.hbs.authorised.authorized !== true)
			return ctx.redirect('/login?msg=you need to log in&referrer=/secure')
	} catch(err) {
		return ctx.redirect('/login?msg=you need to log in&referrer=/secure')
	}
	await next()
}

router.use(checkAuth)

router.get('/', async(ctx) => {
	try {
		await ctx.render('secure', ctx.hbs)
	} catch (err) {
		ctx.hbs.error = err.message
		await ctx.render('error', ctx.hbs)
	}

})

// import Accounts from '../modules/accounts.js'

// import { reguser, regweb } from '../routes/public/register.js'

// const dbName = 'website.db'

// /**
//  * Runs script to process new user registrations.
//  *
//  * @name Register Script
//  * @route {POST} /register
//  */
// router.post('/register', async(ctx) => reguser(ctx, await new Accounts(dbName)))

// /**
//  * The user registration page.
//  *
//  * @name Register Page
//  * @route {GET} /register
//  */
// router.get('/register', async(ctx) => {
//     router.use(checkAuth)
//     regweb(ctx)
// })

export default router
