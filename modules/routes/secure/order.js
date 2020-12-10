/** @Module Profile */

/* Modules */
import message from '../../scripts/messages.js'
import orderButton from '../../scripts/order-buttons.js'
import { tablePostInfo } from './table.js'
import tableButton from '../../scripts/table-buttons.js'


const orderCreatePost = async(ctx,order,food,table) => {
	try{
		const BODY = ctx.request.body
		const NEW_ORDER = {
			TableId: BODY.TableId,
			FoodId: BODY.SelectedFood,
			Comment: BODY.Comment,
			CreatorId: ctx.hbs.userid
		}
		await order.Create(NEW_ORDER)
		ctx.hbs.Table = BODY.TableId
		await message(ctx,'modified',`New order created for Table ID: '${BODY.TableId}' by`)
		await tablePostInfo(ctx,table,order)
	}catch(err) {
		await message(ctx,'failed',err.message)
		ctx.hbs.error = `orderCreate(): ${err.message}`
		await ctx.render('error', ctx.hbs)
	}
}

const orderCreate = async(ctx,order,food) => {
	try{
		const BODY = await ctx.request.body
		ctx.hbs.TableId = BODY.TableId
		ctx.hbs.Tabs = await food.Get()
		ctx.hbs.Table = await order.Get({TableId: BODY.TableId},'*','RESTAURANT_TABLE')
		await message(ctx,'sucessful')
		await ctx.render('order-create', ctx.hbs)
	}catch(err) {
		await message(ctx,'failed',err.message)
		ctx.hbs.error = `orderCreate(): ${err.message}`
		await ctx.render('error', ctx.hbs)
	}finally{
		await order.Close()
		await food.Close()
	}
}

const orderPostId = async(ctx,order) => {
	try{
		const BODY = await ctx.request.body
		await order.Modify(BODY, BODY.OrderId)
		await message(ctx,'modified',`Order: ${BODY.OrderId} modified by`)
		await orderGet(ctx,order)
	}catch(err) {
		await message(ctx,'failed',err.message)
		ctx.hbs.error = `orderGetId(): ${err.message}`
		await ctx.render('error', ctx.hbs)
	}
}

const orderGetId = async(ctx,order,food) => {
	try{
		const ORDER = await order.Get({OrderId: ctx.hbs.Order})
		Object.assign(ORDER, await order.GetUpdatedData(ORDER))
		if(ORDER.InUse === 0) delete ORDER.InUse
		ORDER.Tabs = await food.Get({})
		ORDER.Buttons = orderButton(ctx.hbs.position)
		Object.assign(ctx.hbs, ORDER)
		await message(ctx,'sucessful')
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

const updateList = async(order,list) => {
	try{
		const newOrder = []

		for (const i in list) {
			Object.assign(list[i], await order.GetUpdatedData(list[i]))

			if(list[i].InUse === 0) delete list[i].InUse
			newOrder.push(list[i])
		}

		return newOrder
	}catch(err) {
		throw new Error(`updateList(): ${err.message}`)
	}
}

const ordersUpdate = async(order) => {
	try{
		const PLACED = await order.GetOrders('\'Placed\'')
		const PREPARED = await order.GetOrders('\'Prepared\'')
		const SERVED = await order.GetOrders('\'Served\'')
		const REST = await order.GetOrders('\'Failed\',\'Paid\'')
		return {
			Placed: await updateList(order,PLACED),
			Prepared: await updateList(order,PREPARED),
			Served: await updateList(order,SERVED),
			Finished: await updateList(order,REST)
		}
	}catch(err) {
		throw new Error(`orders.js => ordersUpdate(): ${err.message}`)
	}
}

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


// const orderPost = async(ctx, table) => {
// 	try {
// 		await tableButton(ctx.hbs.userid, ctx.request.body.Button)
// 		await message(ctx,'modified',`${ctx.request.body.Button} by`)
// 		await tableGet(ctx, table)
// 	}catch(err) {
// 		await message(ctx,'failed',err.message)
// 		ctx.hbs.msg = `tablePost(): ${err.message}`
// 		await tableGet(ctx, table)
// 	}
// }

/** @Export For Order */
export { orderGet, orderGetId, orderPostId, orderCreate, orderCreatePost }
