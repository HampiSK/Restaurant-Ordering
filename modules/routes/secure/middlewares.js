/** @Module Secure Middleware  */

/* Modules */
import todayDate from '../../scripts/today-date.js'

/**
 * @Function
 * Secure Middleware for authorisation.
 *
 * @Alert
 * Async function.
 *
 * @param {object} [ctx] - Context.
 * @param [next] - Wait until next middleware ends.
 *
 * @redirect [/login?msg=you need to log in&referrer=/secure] - When user is not authorised is redirected.
 *
 */
const secureAuth = async(ctx, next) => {
	const TIME = await todayDate()
	try{
		if (!ctx.hbs.authorised)
			return ctx.redirect('/login?msg=you need to log in&referrer=/secure')
		console.log(`${TIME} - SECURE AUTH: Authorisation was successfull for user 
'${ctx.hbs.username}' (ID: ${ctx.hbs.userid})`)
	}catch(err) {
		console.log(`${TIME} - SECURE AUTH: Authorisation failed for user 
'${ctx.hbs.username}' (ID: ${ctx.hbs.userid})`)
		return ctx.redirect('/login?msg=you need to log in&referrer=/secure')
	} finally{
		await next()
	}
}


const le1 = (time) => `${time} - SECURE PERM: Access granted for user `
const linterNonsense2 = (time) => `${time} - SECURE PERM: Access deined for user `


/**
 * @Function
 * Secure Middleware for permission.
 *
 * @Alert
 * Async function.
 *
 * @param {array} [pos] - Allowed users.
 * @param {object} [ctx] - Context.
 * @param [next] - Wait until next middleware ends.
 *
 * @redirect [/login?msg=you need to log in&referrer=/secure] - When user is not permited is redirected.
 *
 */
const securePerm = async(pos,ctx,next) => {
	const TIME = await todayDate()
	try{
		for (const POSSITION of pos) {
			if (ctx.hbs.position === POSSITION) {
				console.log(`${le1(TIME)}'${ctx.hbs.username}' (ID: ${ctx.hbs.userid}) to use path: '${ctx.path}'`)
				return
			}
		}
		console.log(`${linterNonsense2(TIME)}'${ctx.hbs.username}' (ID: ${ctx.hbs.userid}) to use path: '${ctx.path}'`)
		ctx.hbs.error = 'Access Deined'
		return ctx.redirect('error', ctx.hbs)
	}catch(err) {
		console.log(`${TIME} - SECURE PERM: Access granted for user '${ctx.hbs.username}' 
(ID: ${ctx.hbs.userid}) to use path: '${ctx.path}'`)
		return ctx.redirect('/login?msg=you need to log in&referrer=/secure')
	} finally{
		await next()
	}
}

/** @Export For Secure Middleware */
export { securePerm, secureAuth }
