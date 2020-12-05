/** @Module Profile */

/* Modules */
import message from '../../scripts/messages.js'
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
		const DATA = await account.db.get(`SELECT * FROM USER WHERE UserId = '${ctx.hbs.userid}'`)
		DATA.Photo = getphoto(DATA.UserName)
		Object.assign(ctx.hbs, DATA)
		await message(ctx,'sucessful')
		await ctx.render('profile', ctx.hbs)
	}catch(err) {
		await message(ctx,'failed',err.message)
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
		await message(ctx,'modified','Profile updated by')
		await profileGet(ctx, account)
	}catch(err) {
		await message(ctx,'failed',err.message)
		ctx.hbs.msg = `profilePost(): ${err.message}`
		await profileGet(ctx, account)
	} finally {
		await account.Close()
	}
}

/** @Export For Profile */
export { profileGet, profilePost }
