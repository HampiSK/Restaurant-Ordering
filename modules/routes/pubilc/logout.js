/** @Module Logout */

/* Modules */
import message from '../../scripts/messages.js'
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
		ctx.session = ctxSession()
		await message(ctx,'sucessful')
		ctx.redirect('/login?msg=you are now logged out')
	}catch(err) {
		ctx.hbs.error = err.message
		await message(ctx,'failed',err.message)
		await ctx.render('error', ctx.hbs)
	}
}

/** @Export For Login */
export default logoutGet
