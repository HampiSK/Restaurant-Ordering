import Koa from 'koa'
import serve from 'koa-static'
import views from 'koa-views'
import session from 'koa-session'

import router from './routes/routes.js'
import message from './modules/scripts/messages.js'

const app = new Koa()
app.keys = ['darkSecret']

const defaultPort = 8080
const port = process.env.PORT || defaultPort

async function getHandlebarData(ctx, next) {
	ctx.hbs = {
		position: ctx.session.position,
		username: ctx.session.username,
		userid: ctx.session.userid,
		authorised: ctx.session.authorised,
		host: `https://${ctx.host}`
	}
	await message(ctx,'request')
	for (const key in ctx.query) ctx.hbs[key] = ctx.query[key]
	await next()
}


app.use(serve('public'))
app.use(session(app))
app.use(
	views(
		'views',
		{ extension: 'handlebars' },
		{ map: { handlebars: 'handlebars' },
			options: {
				partials: {
					subTitle: './pos' // requires ./my-partial.hbs
				}
			}
		}
	)
)

app.use(getHandlebarData)


app.use(router.routes())
app.use(router.allowedMethods())

app.listen(port, async() => console.log(`listening on port ${port}`))
