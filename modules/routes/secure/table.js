/** @Module Profile */

/* Modules */
import message from '../../scripts/messages.js'
import tableButton from '../../scripts/table-buttons.js'


// /**
//   * @Function
//   * Render 'profile' webiste.
//   *
//   * @Alert
//   * Async function.
//   *
//   * @param {object} [ctx] - Context.
//   * @param {object} [table] - Table object with data.
//   *
//   * @render [/table]  - Render webiste with tables.
//   * @render [/error]  - When something went wrong error is rendered.
//   *
//   */

const tableOrders = async(order,orderList,Id) => {
    let newOrderList = []
	for (let i in orderList) {
        if(orderList[i].TableId === parseInt(Id)) {
            Object.assign(orderList[i], await order.GetUpdatedData(orderList[i]))
            newOrderList.push(orderList[i])  
        }              
    }
    return newOrderList      
}



const tableUpdateInfo = async(ctx,table,order) => {
    try {
        const BODY = ctx.request.body 
        if(BODY.Comment !== "") {
            await table.Modify({Comment: BODY.Comment},BODY.TableId)
            await message(ctx,'modified',`Comment updated for table with ID: '${BODY.TableId}' by`)      
        }
        else {
            await tableButton(table, BODY.TableId, BODY.Button) 
            await message(ctx,'modified',`${BODY.Button} by`)            
        } 
        await tablePostInfo(ctx,table,order)        
    }catch(err){
		await message(ctx,'failed',err.message)
		ctx.hbs.error = `tableUpdateInfo(): ${err.message}`
		await ctx.render('error', ctx.hbs)        
    }
}

const totalPrice = orders => {
    let total = 0
    for (let i in orders)
        total += orders[i].FoodPrice
    return total
}

const tablePostInfo = async(ctx,table,order) => {
	try{
        const BODY = ctx.request.body
        let orderList = await order.GetOrders(' "Placed", "Prepared", "Served" ')
        ctx.hbs.Orders = await tableOrders(order,orderList,BODY.TableId)
        ctx.hbs.Table = await table.Get({TableId: BODY.TableId})
        ctx.hbs.TotalPrice = totalPrice(ctx.hbs.Orders)
        await message(ctx,'sucessful')
		await ctx.render('table-info', ctx.hbs)
	}catch(err) {
		await message(ctx,'failed',err.message)
		ctx.hbs.error = `tablePostInfo(): ${err.message}`
		await ctx.render('error', ctx.hbs)
	}finally{
        table.Close()
        order.Close()
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
const tableGetId = async(ctx,table) => {
	try{
        
        const TABLES = await table.GetTables()
		if (TABLES !== undefined) ctx.hbs.Tables = TABLES
		await message(ctx,'sucessful')
		ctx.hbs.selected = ctx.hbs.Table
		await tableGet(ctx, table)
	}catch(err) {
		await message(ctx,'failed',err.message)
		ctx.hbs.error = `tableGetId(): ${err.message}`
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
const tableGet = async(ctx,table) => {
	try{
		const TABLES = await table.GetTables()
		if (typeof TABLES !== 'undefined') ctx.hbs.Tables = TABLES
		await message(ctx,'sucessful')
		await ctx.render('tables', ctx.hbs)
	}catch(err) {
		await message(ctx,'failed',err.message)
		ctx.hbs.error = `tableGet(): ${err.message}`
		await ctx.render('error', ctx.hbs)
	}finally{
		await table.Close()
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
const tablePost = async(ctx, table) => {
	try {
        const BODY = ctx.request.body       
            await tableButton(table, ctx.hbs.userid, BODY.Button)    
            Object.assign(ctx.hbs,BODY)
            await message(ctx,'modified',`${BODY.Button} by`)        
            await tableGet(ctx, table)
	}catch(err) {
		await message(ctx,'failed',err.message)
		ctx.hbs.msg = `tablePost(): ${err.message}`
		await tableGet(ctx, table)
	}
// 	} finally {
// 		await table.Close()
// 	}
}

/** @Export For Table */
export { tableGet, tableGetId, tablePostInfo, tableUpdateInfo, tablePost }
