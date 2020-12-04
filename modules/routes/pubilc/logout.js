/** @Module Logout */

/* Modules */
import todayDate from '../../scripts/today-date.js'
import ctxSession from '../../ctx/session.js'

/**
  * @Function
  * Logout.
  *
  * @Alert
  * Async function.
  *
  * @param {object} [ctx] - Context.
  *
  * @redirect [/secure] - User is redirected when logout.
  * @render [/error]  - When something went wrong error is rendered.
  *
  */
const logoutGet = async(ctx) => {
	try{
		console.log(`${await todayDate()} - PUBLIC GET: Logout successfull for user 
'${ctx.hbs.username}' (ID: ${ctx.hbs.userid}) in path '${ctx.path}'`)
		ctx.session = ctxSession()
		ctx.redirect('/login?msg=you are now logged out')
	}catch(err) {
		console.log(`${await todayDate()} - PUBLIC GET: Logout failed for user '${ctx.hbs.username}' 
(ID: ${ctx.hbs.userid}) in path '${ctx.path}' due to ${err.message}`)
		ctx.hbs.error = err.message
		await ctx.render('error', ctx.hbs)
	}
}

/** @Export For Login */
export default logoutGet
