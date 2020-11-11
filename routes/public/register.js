import todaydate from '../../modules/scripts/today-date.js'

async function regweb(ctx) {
	const minage = 15
	const today = todaydate(minage)
	const data = {
		birth: today,
	}
	await ctx.render('register', data)
}

// 			ctx.request.body.FirstName,
// 			ctx.request.body.LastName,
// 			ctx.request.body.Birth,
// 			ctx.request.body.PasswordValidation,
// 			ctx.request.body.Gender,
// 			ctx.request.body.Position,
// 			ctx.request.body.Comment,
// 			ctx.request.body.Address,
// 			ctx.request.body.City,
// 			ctx.request.body.Zip,
// 			ctx.request.body.Phone,
// 			ctx.request.body.Email

async function reguser(ctx, account) {
	try {
		await account.register(ctx.request.body.FirstName,ctx.request.body.LastName,ctx.request.body.Birth,
			ctx.request.body.PasswordValidation,ctx.request.body.Gender,ctx.request.body.Position,
			ctx.request.body.Comment,ctx.request.body.Address,ctx.request.body.City,
			ctx.request.body.Zip,ctx.request.body.Phone,ctx.request.body.Email
		)
		ctx.redirect(
			`/login?msg=new user "${ctx.request.body.user}" added, you need to log in`
		)
	} catch (err) {
		console.log(err)
		ctx.hbs.msg = err.message
		ctx.hbs.body = ctx.request.body
		console.log(ctx.hbs)
		await ctx.render('register', ctx.hbs)
	} finally {
		await account.close()
	}
}

export { reguser, regweb }
