/** @Module Profile */

/* Modules */
import todayDate from '../../scripts/today-date.js'
import { getphoto } from '../../scripts/upload-photo.js' //uploadphoto

/**
  * @Function
  * Render 'profile' webiste.
  *
  * @Alert
  * Async function.
  *
  * @param {object} [ctx] - Context.
  * @param {object} [account] - Users object.
  *
  * @render [/profile]  - Render webiste to register new users.
  * @render [/error]  - When something went wrong error is rendered.
  *
  */
const profileGet = async(ctx,account) => {
	try{
		console.log(`${await todayDate()} - SECURE GET: Profile for user '${ctx.hbs.username}' 
(ID: ${ctx.hbs.userid}) in path '${ctx.path}'`)
		const DATA = await account.db.get(`SELECT * FROM USER WHERE UserId = '${ctx.hbs.userid}'`)
		DATA.Photo = getphoto(DATA.UserName)
		Object.assign(ctx.hbs, DATA)
		await ctx.render('profile', ctx.hbs)
	}catch(err) {
		console.log(`${await todayDate()} - SECURE GET: Profile failed for user '${ctx.hbs.username}' 
(ID: ${ctx.hbs.userid}) in path '${ctx.path}' due to ${err.message}`)
		ctx.hbs.error = `profileGet(): ${err.message}`
		await ctx.render('error', ctx.hbs)
	}finally{
		await account.Close()
	}
}


/**
  * @Function UNFINISHED
  * Update profile.
  *
  * @Alert
  * Async function.
  *
  * @param {object} [ctx] - Context.
  * @param {object} [account] - Users object.
  *
  */
const profilePost = async(ctx, account) => {
	try {
		console.log(`${await todayDate()} - SECURE POST: Profile update successful by '${ctx.hbs.username}' 
(ID: ${ctx.hbs.userid}) in path '${ctx.path}'`)
		await profileGet(ctx, account)
	}catch(err) {
		console.log(`${await todayDate()} - SECURE GET: Profile update failed for user '${ctx.hbs.username}' 
(ID: ${ctx.hbs.userid}) in path '${ctx.path}' due to ${err.message}`)
		ctx.hbs.msg = `profilePost(): ${err.message}`
		await profileGet(ctx, account)
	} finally {
		await account.Close()
	}
}

/** @Export For Profile */
export { profileGet, profilePost }
