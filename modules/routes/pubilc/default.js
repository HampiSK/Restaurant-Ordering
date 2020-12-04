/** @Module Default Public*/

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
 * @render [/index] - Home page.
 * @render [/error]  - When something went wrong error is rendered.
 *
 */
const defaultGetPublic = async(ctx) => {
	try {
		console.log(`${await todayDate()} - PUBLIC GET: Default for user '${ctx.hbs.username}' 
(ID: ${ctx.hbs.userid}) in path '${ctx.path}'`)
		await ctx.render('index', ctx.hbs)
	} catch (err) {
		console.log(`${await todayDate()} - PUBLIC GET: Default failed for user '${ctx.hbs.username}' 
(ID: ${ctx.hbs.userid}) in path '${ctx.path}' due to ${err.message}`)
		ctx.hbs.error = err.message
		await ctx.render('error', ctx.hbs)
	}
}

/** @Export For Default Pubilc*/
export default defaultGetPublic
