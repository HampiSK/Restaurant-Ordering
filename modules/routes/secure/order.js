/** @Module Profile */

/* Modules */
import message from '../../scripts/messages.js'
import Accounts from '../../builders/accounts.js'
import Tables from '../../builders/tables.js'
import {sqlGet} from '../../sql/sql-module.js'
// import tableButton from '../../scripts/table-buttons.js'


const DBNAME = 'website.db'

const orderPostId = async(ctx) => {
	try{
        console.log(await ctx.request.body)
        console.log(await ctx.hbs)
	}catch(err) {
		await message(ctx,'failed',err.message)
		ctx.hbs.error = `orderGetId(): ${err.message}`
		await ctx.render('error', ctx.hbs)
	}
}

/**
  * @Function
  * Render 'profile' webiste.
  *
  * @Alert
  * Async function.
  *
  * @param {object} [ctx] - Context.
  * @param {object} [table] - Table object with data.
  *
  * @render [/table]  - Render webiste with tables.
  * @render [/error]  - When something went wrong error is rendered.
  *
  */
const orderGetId = async(ctx,order,food) => {
	try{
        const ORDER = await order.Get({OrderId: ctx.hbs.Order})
        Object.assign(ORDER, await order.GetUpdatedData(ORDER))
        if(ORDER.InUse === 0) delete ORDER.InUse
        ORDER.Tabs = await food.Get({})
       
        Object.assign(ctx.hbs, ORDER)
        console.log(ctx.hbs)
        await ctx.render('order-info', ctx.hbs)
	}catch(err) {
		await message(ctx,'failed',err.message)
		ctx.hbs.error = `orderGetId(): ${err.message}`
		await ctx.render('error', ctx.hbs)
	}finally{
        await order.Close()
        await food.Close()
    }
}

// const getData = async(order,list) => {
//     try{
//         const ACCOUNT = new Accounts(DBNAME)
//         const COUNT = await order.Get({OrderId: list.OrderId},'count(OrderId) AS count')        
//         const DATA = {
//             CreatorName: await ACCOUNT.Get({UserId: order.CreatorId},'UserName'),
// //             TableName: await order.sqlGet({TableId: order.TableId},'USER','TableName'),
//             Diners: COUNT.count
//         }
//         return DATA
        
//     }catch(err){
//         throw new Error(`getData(): ${err.message}`)
//     }
// }
//  for (const val of Object.keys(body))
const updateList = async(order,list) => {
    try{
        const newOrder = []
        for (let i in list) {
            Object.assign(list[i], await order.GetUpdatedData(list[i]) )
            if(list[i].InUse === 0) delete list[i].InUse
            newOrder.push(list[i])
        }
        return newOrder        
    }catch(err){
        throw new Error(`updateList(): ${err.message}`)
    }
}

const ordersUpdate = async(order) => {
	try{ 
        const PLACED = await order.GetOrders("'Placed'")
        const PREPARED = await order.GetOrders("'Prepared'")
        const SERVED = await order.GetOrders("'Served'")
        const REST = await order.GetOrders("'Failed','Paid'")
        const BODY =  {
            Placed: await updateList(order,PLACED),
            Prepared: await updateList(order,PREPARED),
            Served: await updateList(order,SERVED),
            Finished: await updateList(order,REST)
        }
        return BODY
    }catch(err){
        throw new Error(`orders.js => ordersUpdate(): ${err.message}`)
    }
}



/**
  * @Function
  * Render 'profile' webiste.
  *
  * @Alert
  * Async function.
  *
  * @param {object} [ctx] - Context.
  * @param {object} [table] - Table object with data.
  *
  * @render [/table]  - Render webiste with tables.
  * @render [/error]  - When something went wrong error is rendered.
  *
  */
const orderGet = async(ctx,order) => {
	try{
        Object.assign(ctx.hbs, await ordersUpdate(order))
		await message(ctx,'sucessful')
		await ctx.render('orders', ctx.hbs)
	}catch(err) {
		await message(ctx,'failed',err.message)
		ctx.hbs.error = `tableGet(): ${err.message}`
		await ctx.render('error', ctx.hbs)
	}finally{
		await order.Close()
	}
}



/**
  * @Function UNFINISHED
  * Update table website with new data.
  *
  * @Alert
  * Async function.
  *
  * @param {object} [ctx] - Context.
  * @param {object} [table] - Table object.
  *
  */
const orderPost = async(ctx, table) => {
	try {
        console.log("Order",ctx.hbs)
		await tableButton(ctx.hbs.userid, ctx.request.body.Button)
		await message(ctx,'modified',`${ctx.request.body.Button} by`)
		await tableGet(ctx, table)
	}catch(err) {
		await message(ctx,'failed',err.message)
		ctx.hbs.msg = `tablePost(): ${err.message}`
		await tableGet(ctx, table)
	} finally {
		await table.Close()
	}
}

/** @Export For Table */
export { orderGet, orderGetId, orderPost, orderPostId }
