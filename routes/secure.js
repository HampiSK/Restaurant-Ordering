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
import { tableGet, tableGetId, tablePostInfo, tableUpdateInfo, tablePost } from '../modules/routes/secure/table.js'
import { orderGet, orderGetId, orderPostId, orderCreate, orderCreatePost } from '../modules/routes/secure/order.js'

/* Constants */
const router = new Router({ prefix: '/secure'})
const DBNAME = 'website.db'

/* Middlewares */
const checkLevel0 = async(ctx, next) => await secureAuth(ctx, next)
const checkLevel1 = async(ctx, next) => await securePerm(['Waiter','Manager','Admin'],ctx,next) 
const checkLevel2 = async(ctx, next) => await securePerm(['Chef','Manager','Admin'],ctx,next)
const checkLevel3 = async(ctx, next) => await securePerm(['Manager','Admin'],ctx,next)
// const checkLevel4 = async(ctx, next) => await securePerm(['Admin'],ctx,next)

const LEVEL1 = ['/tables','/orders','/tables/:id','/orders/:id','/orders','/table/:id','/table/:id/update','/orders','/table/:id/created']
const LEVEL2 = ['/table/:id/create']
const LEVEL3 = ['/register']

router.use(checkLevel0)
router.use( LEVEL1, checkLevel1 )
router.use( LEVEL2, checkLevel2 )
router.use( LEVEL3, checkLevel3 )


router.get('/', async(ctx) => await defaultGetSecure(ctx))
router.get('/register', async(ctx) => await registerGet(ctx))
router.get('/profile', async(ctx) => await profileGet(ctx, await new Accounts(DBNAME)))
router.get('/tables', async(ctx) => await tableGet(ctx, await new Tables(DBNAME)))
router.get('/tables/:id', async(ctx) => await tableGetId(ctx, await new Tables(DBNAME)))
router.get('/orders/:id', async(ctx) => await orderGetId(ctx, await new Orders(DBNAME), await new Foods(DBNAME)))
router.get('/orders', async(ctx) => await orderGet(ctx, await new Orders(DBNAME)))

router.post('/tables', async(ctx) => await tablePost(ctx, await new Tables(DBNAME)))
router.post('/table/:id', async(ctx) => await tablePostInfo(ctx, await new Tables(DBNAME),await new Orders(DBNAME)))
router.post('/table/:id/update', async(ctx) => await tableUpdateInfo(ctx, await new Tables(DBNAME),await new Orders(DBNAME)))
router.post('/register', async(ctx) => await registerPost(ctx, await new Accounts(DBNAME)))
router.post('/profile', async(ctx) => await profilePost(ctx, await new Accounts(DBNAME)))
router.post('/orders', async(ctx) => await orderPostId(ctx, await new Orders(DBNAME)))
router.post('/table/:id/create', async(ctx) => await orderCreate(ctx, await new Orders(DBNAME), await new Foods(DBNAME)))
router.post('/table/:id/created', async(ctx) => await orderCreatePost(ctx, await new Orders(DBNAME), await new Foods(DBNAME), await new Tables(DBNAME) ))

export default router
