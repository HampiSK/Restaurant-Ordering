/** @Module Secure Router Middleware Header */

/* Packages */
import Router from 'koa-router'

/* Modules */
import { registerGet, registerPost } from '../modules/routes/secure/register.js'
import Accounts from '../modules/builders/accounts.js'
import Tables from '../modules/builders/tables.js'
import Foods from '../modules/builders/foods.js'
import Orders from '../modules/builders/orders.js'
import { secureAuth, securePerm } from '../modules/routes/secure/middlewares.js'
import defaultGetSecure from '../modules/routes/secure/default.js'
import { profileGet, profilePost } from '../modules/routes/secure/profile.js'
import { tableGet, tableGetId, tablePost } from '../modules/routes/secure/table.js'
import { orderGet, orderGetId, orderPostId } from '../modules/routes/secure/order.js'

/* Constants */
const router = new Router({ prefix: '/secure'})
const DBNAME = 'website.db'

/* Middlewares */
const checkLevel0 = async(ctx, next) => {
	await secureAuth(ctx, next)
}
const checkLevel1 = async(ctx, next) => { await securePerm(['Waiter','Manager','Admin'],ctx,next) }
// const checkLevel2 = async(ctx, next) => await securePerm(['Chef','Manager','Admin'],ctx,next)
const checkLevel3 = async(ctx, next) => {
	await securePerm(['Manager','Admin'],ctx,next)
}
// const checkLevel4 = async(ctx, next) => await securePerm(['Admin'],ctx,next)

router.use(checkLevel0)
router.use( ['/tables','/orders'], checkLevel1 )
router.use( ['/register'], checkLevel3 )


router.get('/', async(ctx) => await defaultGetSecure(ctx))
router.get('/register', async(ctx) => await registerGet(ctx))
router.get('/profile', async(ctx) => await profileGet(ctx, await new Accounts(DBNAME)))
router.get('/tables', async(ctx) => await tableGet(ctx, await new Tables(DBNAME)))
router.get('/tables/:id', async(ctx) => await tableGetId(ctx, await new Tables(DBNAME)))
router.get('/orders/:id', async(ctx) => await orderGetId(ctx, await new Orders(DBNAME), await new Foods(DBNAME)))
router.get('/orders', async(ctx) => await orderGet(ctx, await new Orders(DBNAME)))

router.post('/register', async(ctx) => await registerPost(ctx, await new Accounts(DBNAME)))
router.post('/profile', async(ctx) => await profilePost(ctx, await new Accounts(DBNAME)))
router.post('/tables', async(ctx) => await tablePost(ctx, await new Tables(DBNAME)))
router.post('/orders', async(ctx) => await orderPostId(ctx, await new Orders(DBNAME)))

export default router
