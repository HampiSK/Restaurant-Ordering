/** @Module Login */

/* Modules */
import todayDate from '../../scripts/today-date.js'
import ctxSession from '../../ctx/session.js'


/**
  * @Function
  * Login.
  *
  * @Alert
  * Async function.
  *
  * @param {object} [ctx] - Context.
  *
  * @render [/login]  - Rende Login.
  * @render [/error]  - When something went wrong error is rendered.
  *
  */
const loginGet = async(ctx) => {
	try {
		console.log(`${await todayDate()} - PUBLIC GET: Login for '${ctx.hbs.username}' in path '${ctx.path}`)
		await ctx.render('login', ctx.hbs)
	}catch(err) {
		ctx.hbs.error = err.message
		console.log(`${await todayDate()} - PUBLIC GET: Login failed in path '${ctx.path} due to ${err.message}`)
		await ctx.render('error', ctx.hbs)
	}
}


/**
 * @Method
 * Create position name from flags
 *
 * @param {object} [body]   - Object with positions flags.
 *
 * @return {string} [VAL] - name of position
 *
 */
const position = body => {
	try{
		const FLAGS = { Admin: body.Admin, Chef: body.Chef, Manager: body.Manager, Waiter: body.Waiter }
		delete body.Admin
		delete body.Chef
		delete body.Manager
		delete body.Waiter
		for (const VAL of Object.keys(FLAGS)) {
			if(FLAGS[VAL] === 1)
				return VAL
		}
		throw new Error('Not valid possition flag')

	}catch(err) {
		throw new Error(`Position(): ${err.message}`)
	}
}


const linterNonsense1 = () => 'SELECT UserId,UserName,Admin,Chef,Manager,Waiter FROM USER WHERE UserName = '
const le2 = (time) => `${time} - PUBLIC POST: Login to account user `


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
  * @redirect [/secure] - When user is authorised is redirected to secure.
  * @render [/login]  - When something went wrong error is rendered.
  *
  */
const loginPost = async(ctx, Accounts, dbName) => {
	const ACCOUNT = await new Accounts(dbName)
	ctx.hbs.body = ctx.request.body
	try {
		const BODY = ctx.request.body
		await ACCOUNT.Login(BODY.UserName, BODY.Password)
		const DATA = await ACCOUNT.db.get(`${linterNonsense1()} '${BODY.UserName}'`)
		DATA.Position = position(DATA)
		ctx.session = ctxSession(DATA)
		const REFERRER = BODY.referrer || '/secure'
		console.log(`${le2(await todayDate())} '${ctx.hbs.username}' (ID: ${ctx.hbs.userid}) in path '${ctx.path}'`)
		return ctx.redirect(`${REFERRER}?msg=you are now logged in...`)
	}catch(err) {
		console.log(`${await todayDate()} - PUBLIC POST: Login failed due to ${err.message}`)
		ctx.hbs.msg = err.message
		await loginGet(ctx)
	} finally {
		await ACCOUNT.Close()
	}
}

/** @Export For Login */
export { loginPost, loginGet }
