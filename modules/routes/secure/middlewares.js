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
		if (!ctx.hbs.authorised) {
			console.log(`${TIME} - SECURE AUTH: Authorisation deined for user: `+
                        `'${ctx.hbs.username}' id: '${ctx.hbs.userid}'` )
			return ctx.redirect('/login?msg=you need to log in&referrer=/secure')
		}
		console.log(`${TIME} - SECURE AUTH: Authorisation successfull for user: `+
                        `'${ctx.hbs.username}' id: '${ctx.hbs.userid}'` )
	}catch(err) {
		console.log(`${TIME} - SECURE AUTH: Authorisation failed for user: `+
                    `'${ctx.hbs.username}' id: '${ctx.hbs.userid}'` )
		return ctx.redirect('/login?msg=you need to log in&referrer=/secure')
	} finally{
		await next()
	}
}

/**
 * @Function
 * Print message based on flag.
 *
 * @Alert
 * Async function.
 *
 * @param {boolian} [flag] - Acceess granted, access deined.
 * @param {object}  [ctx]  - Context.
 *
 * @redirect [/login?msg=you need to log in&referrer=/secure] - When user is not authorised is redirected.
 *
 */
const securePermMsg = async(flag,ctx) => {
	try{
		if(flag) {
			console.log(`${await todayDate()} - SECURE PERM: Access granted for user: `+
                        `${ctx.hbs.username}' id: ${ctx.hbs.userid} in path: '${ctx.path}'` )
		} else {
			console.log(`${await todayDate()} - SECURE PERM: Access deined for user: `+
                        `'${ctx.hbs.username}' id: ${ctx.hbs.userid} in path: '${ctx.path}'` )
		}
	}catch(err) {
		throw new Error(`securePerm(): ${err.message}`)
	}
}

/**
 * @Function
 * Secure Middleware for permissions.
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
	try{
		for (const POSSITION of pos) {
			if (ctx.hbs.position === POSSITION) {
				await securePermMsg(true,ctx)
				return
			}
		}
		await securePermMsg(false,ctx)
		ctx.hbs.error = 'Access Deined'
		return ctx.redirect('/secure/tables')
	}catch(err) {
		console.log(`${await todayDate()} - SECURE PERM: Failed for user: '${ctx.hbs.username}'`+
                    ` id: ${ctx.hbs.userid}) in path: '${ctx.path}' due to ${err.message}`)
		return ctx.redirect('/login?msg=you need to log in&referrer=/secure')
	} finally{
		await next()
	}
}

/** @Export For Secure Middleware */
export { securePerm, secureAuth }
