import Router from 'koa-router'

const router = new Router()

import Accounts from '../modules/accounts.js'
import { getphoto } from '../modules/scripts/upload-photo.js'
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
router.get('/register', async(ctx) => regweb(ctx, router))

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


router.get('/profile', async(ctx) => {
	const account = await new Accounts(dbName)
	const data = await account.db.get(`SELECT * FROM USER WHERE UserId = '${ctx.hbs.authorised.userid}'`)
	for (const i of ['Admin','Manager','Chef','Waiter']) {
		if (data[i] === 1) data.Position = i
	}
	data.Photo = getphoto(data.UserName)
	const body = {
		Photo: data.Photo, UserId: data.UserId, UserName: data.UserName, FirstName: data.FirstName,
		LastName: data.LastName, Birth: data.Birth, Gender: data.Gender, Position: data.Position,
		Street: data.Street, City: data.City, Zip: data.Zip, Phone: data.Phone, Email: data.Email
	}
	await ctx.render('profile', body)
})

router.post('/profile', async(ctx) => {
	//const body = ctx.request.body
	console.log(ctx.request.body)
//     const account = await new Accounts(dbName)
//     const data = await account.db.get(`SELECT * FROM USER WHERE UserId = '${ctx.hbs.authorised.userid}'`)
//     uploadphoto(data.UserName)
})

router.get('/tables', async(ctx) => {
	try {
		const body = {
			Username: 'ha',
			Table: [ { TableName: 'Table 1', Comment: 'None' },{ TableName: 'Table 2', Comment: '' },
				{ TableName: 'Table 3', Comment: 'None' },{ TableName: 'Table 4', Comment: 'None' },
				{ TableName: 'Table 5', Comment: '' },{ TableName: 'Table 6', Comment: 'None' }]
		}
		await ctx.render('tables', body)
	} catch (err) {
		ctx.hbs.error = err.message
		await ctx.render('error', ctx.hbs)
	}
})

router.post('/login', async(ctx) => {
	const account = await new Accounts(dbName)
	ctx.hbs.body = ctx.request.body
	try {
		const body = ctx.request.body
		await account.Login(body.UserName, body.Password)
		const data = await account.db.get(`SELECT UserId FROM USER WHERE UserName = '${body.UserName}'`)
		ctx.session = await CTXSession(ctx.session, data, true)
		const referrer = body.referrer || '/secure'
		return ctx.redirect(`${referrer}?msg=you are now logged in...`)
	} catch (err) {
		console.log(err)
		ctx.hbs.msg = err.message
		await ctx.render('login', ctx.hbs)
	} finally {
		await account.Close()
	}
})

router.get('/logout', async(ctx) => {
	ctx.session.authorised = null
	ctx.redirect('/?msg=you are now logged out')
})

export default router
