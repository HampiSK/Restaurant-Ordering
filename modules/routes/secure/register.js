/** @Module Register */

/* Modules */
import todayDate from '../../scripts/today-date.js'

/**
  * @Function
  * Render 'register' webiste.
  *
  * @Alert
  * Async function.
  *
  * @param {object} [ctx] - Context.
  *
  * @render [/register]  - Render webiste to register new users.
  * @render [/error]  - When something went wrong error is rendered.
  *
  */
const registerGet = async(ctx) => {
	try{
		console.log(`${await todayDate()} - SECURE GET: Register for user '${ctx.hbs.username}' 
(ID: ${ctx.hbs.userid}) in path '${ctx.path}'`)
		const MINAGE = 15
		const TODAY = await todayDate(MINAGE,'date')
		ctx.hbs.birth = TODAY
		await ctx.render('register', ctx.hbs)
	}catch(err) {
		console.log(`${await todayDate()} - SECURE GET: Register failed for user '${ctx.hbs.username}' 
(ID: ${ctx.hbs.userid}) in path '${ctx.path}' due to ${err.message}`)
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
const registerPost = async(ctx, account) => {
	try {
		await account.Register(ctx.request.body)
		console.log(`${await todayDate()} - SECURE POST: Register user successful by '${ctx.hbs.username}' 
(ID: ${ctx.hbs.userid}) in path '${ctx.path}'`)
		await registerGet(ctx)
	}catch(err) {
		console.log(`${await todayDate()} - SECURE POST: Register user failed by '${ctx.hbs.username}' 
(ID: ${ctx.hbs.userid}) in path '${ctx.path}' due to ${err.message}`)
		ctx.hbs.msg = `regUser(): ${err.message}`
		ctx.hbs.body = ctx.request.body
		await registerGet(ctx)
	} finally {
		await account.Close()
	}
}

/** @Export For Register */
export { registerGet, registerPost}
