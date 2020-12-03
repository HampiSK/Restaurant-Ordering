/** @Module Router Register */

/* Modules */
import todayDate from '../../modules/scripts/today-date.js'
import ctxSession from '../../modules/ctx/cookies.js'

/**
  * @Function
  * Render 'register' webiste.
  *
  * @Alert
  * Async function.
  *
  * @param {object} [ctx] - Context.
  *
  */
const regWeb = async(ctx) => {
	try{
		const MINAGE = 15
		const TODAY = await todayDate(MINAGE,'date')
		const DATA = {
			birth: TODAY,
		}
		await ctx.render('register', DATA)
	}catch(err) {
		console.log(`regWeb(): ${err.message}`)
		ctx.hbs.error = `regWeb(): ${err.message}`
		await ctx.render('error', ctx.hbs)
	}
}


/**
  * @Function
  * Register user.
  *
  * @Alert
  * Async function.
  *
  * @param {object} [ctx] - Context.
  * @param {object} [account] - Account to be registered.
  *
  */
const regUser = async(ctx, account) => {
	try {
		await account.Register(ctx.request.body)
		await regWeb(ctx)
	}catch(err) {
		console.log(`regUser(): ${err.message}`)
		ctx.hbs.msg = `regUser(): ${err.message}`
		ctx.hbs.body = ctx.request.body
		await regWeb(ctx)
	} finally {
		await account.Close()
	}
}


/**
  * @Function
  * Login.
  *
  * @Alert
  * Async function.
  *
  * @param {object} [ctx] - Context.
  * @param {object} [Account] - Account to login.
  * @param {string} [dbName] - Name of database to store data.
  *
  */
const login = async(ctx, Accounts, dbName) => {
	const ACCOUNT = await new Accounts(dbName)
	ctx.hbs.body = ctx.request.body
	try {
		const BODY = ctx.request.body
		await ACCOUNT.Login(BODY.UserName, BODY.Password)
		const DATA = await ACCOUNT.db.get(`SELECT UserId,UserName FROM USER WHERE UserName = '${BODY.UserName}'`)
		ctx.session = ctxSession(DATA)
		const REFERRER = BODY.referrer || '/secure'
		return ctx.redirect(`${REFERRER}?msg=you are now logged in...`)
	}catch(err) {
		console.log(`login(): ${err.message}`)
		ctx.hbs.msg = `login(): ${err.message}`
		await ctx.render('login', ctx.hbs)
	} finally {
		await ACCOUNT.Close()
	}
}

/** @Export For Router Register */
export { regUser, regWeb, login }
