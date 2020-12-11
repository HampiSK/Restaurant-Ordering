/** @Module Profile */

/* Modules */
import message from '../../scripts/messages.js'
import orderButton from '../../scripts/order-buttons.js'
import { tablePostInfo } from './table.js'

/**
  * @Function
  * Create order post method
  *
  * @Alert
  * Async function.
  *
  * @param {object} [ctx] - Context.
  * @param {object} [order] - Access the order object.
  * @param {object} [food] - Access the food object.
  * @param {object} [table] - Access the table object.
  *
  */
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

/**
  * @Function
  * Create order-create website
  *
  * @Alert
  * Async function.
  *
  * @param {object} [ctx] - Context.
  * @param {object} [order] - Access the order object.
  * @param {object} [food] - Access the food object.
  *
  * @render [order-create]  - website.
  *
  */
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

/**
  * @Function
  * Post method for specific order data
  *
  * @Alert
  * Async function.
  *
  * @param {object} [ctx] - Context.
  * @param {object} [order] - Access the order object.
  *
  */
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

/**
  * @Function
  * Create order-info website
  *
  * @Alert
  * Async function.
  *
  * @param {object} [ctx] - Context.
  * @param {object} [order] - Access the order object.
  * @param {object} [food] - Access the food object.
  *
  * @render [order-info]  - website.
  *
  */
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

/**
  * @Function
  * Update list of orders
  *
  * @Alert
  * Async function.
  *
  * @param {object} [list] - List of orders to update.
  * @param {object} [order] - Access the order object.
  *
  * @return {list} [order-info]  - website.
  *
  */
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

/**
  * @Function
  * Update all orders
  *
  * @Alert
  * Async function.
  *
  * @param {object} [order] - Access the order object.
  *
  * @return {object}  - Updated orders.
  *
  */
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


/**
  * @Function
  * Create order website
  *
  * @Alert
  * Async function.
  *
  * @param {object} [ctx] - Context.
  * @param {object} [order] - Access the order object.
  *
  * @render [orders]  - website.
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

/** @Export For Order */
export { orderGet, orderGetId, orderPostId, orderCreate, orderCreatePost }
