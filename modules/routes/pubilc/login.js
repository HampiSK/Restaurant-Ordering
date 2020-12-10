/** @Module Login */

/* Modules */
import message from '../../scripts/messages.js'
import ctxSession from '../../ctx/session.js'
import todayDate from '../../scripts/today-date.js'

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
		await message(ctx,'sucessful')
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

const loginFail = async(ctx,err) => {
    try{
        await message(ctx,'failed',err.message)
		ctx.hbs.msg = err.message
		await loginGet(ctx)        
    }catch(err){
        await message(ctx,'failed',err.message)
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
		const DATA = await ACCOUNT.db.get(`SELECT UserId,UserName,
Admin,Chef,Manager,Waiter FROM USER WHERE UserName = '${BODY.UserName}'`)
		DATA.Position = position(DATA)
		ctx.session = ctxSession(DATA)
		const REFERRER = BODY.referrer || '/secure'
		await message(ctx,'sucessful')
		return ctx.redirect(`${REFERRER}?msg=you are now logged in...`)
	}catch(err) {
        await loginFail(ctx,err)
	} finally {
		await ACCOUNT.Close()
	}
}

/** @Export For Login */
export { loginPost, loginGet }
