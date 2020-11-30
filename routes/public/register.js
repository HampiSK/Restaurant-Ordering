import todaydate from '../../modules/scripts/today-date.js'

async function regweb(ctx) {
// 	if (ctx.hbs.authorised.authorized !== true)
// 		return ctx.redirect('/login?msg=you need to log in&referrer=/secure')
	const minage = 15
	const today = todaydate(minage)
	const data = {
		birth: today,
	}
	await ctx.render('register', data)
}

async function reguser(ctx, account) {
// 	if (ctx.hbs.authorised.authorized !== true)
// 		return ctx.redirect('/login?msg=you need to log in&referrer=/secure')
	try {
		await account.register(ctx.request.body)
		ctx.redirect(
			`/login?msg=new user "${ctx.request.body.user}" added, you need to log in`
		)
	} catch (err) {
		console.log(err)
		ctx.hbs.msg = err.message
		ctx.hbs.body = ctx.request.body
		console.log(ctx.hbs)
		await ctx.render('register', ctx.hbs)
	} finally {
		await account.close()
	}
}

async function login(ctx, Accounts, dbName) {
	const account = await new Accounts(dbName)
	ctx.hbs.body = ctx.request.body
	try {
		const body = ctx.request.body
		await account.login(body.UserName, body.Password)
		const data = await account.db.get(`SELECT UserId FROM USER WHERE UserName = '${body.UserName}'`)
		ctx.session.authorised = { userid: data.UserId, username: data.UserName, authorized: true }
		const referrer = body.referrer || '/secure'
		return ctx.redirect(`${referrer}?msg=you are now logged in...`)
	} catch (err) {
		console.log(err)
		ctx.hbs.msg = err.message
		await ctx.render('login', ctx.hbs)
	} finally {
		await account.close()
	}
}


export { reguser, regweb, login }
