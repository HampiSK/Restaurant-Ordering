/** @Module Public Router Middleware Header */

/* Packages */
import Router from 'koa-router'

/* Modules */
import Accounts from '../modules/builders/accounts.js'
import { loginGet, loginPost } from '../modules/routes/pubilc/login.js'
import logoutGet from '../modules/routes/pubilc/logout.js'
import defaultGetPublic from '../modules/routes/pubilc/default.js'

/* Constants */
const router = new Router()
const DBNAME = 'website.db'

/* Methods */
router.get('/', async(ctx) => await defaultGetPublic(ctx))
router.get('/login', async(ctx) => await loginGet(ctx))
router.get('/logout', async(ctx) => await logoutGet(ctx))
router.post('/login', async(ctx) => await loginPost(ctx, Accounts, DBNAME))

/** @Export For Public Router Middleware */
export default router
