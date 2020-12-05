/** @Module Default Secure*/

/* Modules */
import message from '../../scripts/messages.js'

/**
 * @Function get
 * The secure home page.
 *
 * @Alert
 * Async function.
 *
 * @param {object} [ctx] - Context.
 *
 * @render [/index]  - Secure page.
 * @render [/error]  - When something went wrong error is rendered.
 *
 */
const defaultGetSecure = async(ctx) => {
	try {
		await message(ctx,'sucessful')
		await ctx.render('secure', ctx.hbs)
	} catch (err) {
		await message(ctx,'failed',err.message)
		ctx.hbs.error = err.message
		await ctx.render('error', ctx.hbs)
	}
}

/** @Export For Default Secure*/
export default defaultGetSecure
