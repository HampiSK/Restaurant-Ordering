/** @Module Default Secure*/

/* Modules */
import todayDate from '../../scripts/today-date.js'

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
		console.log(`${await todayDate()} - SECURE GET: Default for user 
'${ctx.hbs.username}' (ID: ${ctx.hbs.userid}) in path '${ctx.path}'`)
		await ctx.render('secure', ctx.hbs)
	} catch (err) {
		console.log(`${await todayDate()} - PUBLIC GET: Default failed for user 
'${ctx.hbs.username}' (ID: ${ctx.hbs.userid}) in path '${ctx.path}' due to ${err.message}`)
		ctx.hbs.error = err.message
		await ctx.render('error', ctx.hbs)
	}
}

/** @Export For Default Secure*/
export default defaultGetSecure
