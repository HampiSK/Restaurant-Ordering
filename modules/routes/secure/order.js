/** @Module Profile */

/* Modules */
import message from '../../scripts/messages.js'
// import tableButton from '../../scripts/table-buttons.js'

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
const orderGetId = async(ctx,table) => {
	try{
		ctx.hbs.selected = ctx.hbs.Table
		await tableGet(ctx, table)
	}catch(err) {
		await message(ctx,'failed',err.message)
		ctx.hbs.error = `tableGet(): ${err.message}`
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
const orderGet = async(ctx,order) => {
	try{
		const TABLES = await table.GetTables()
		if (TABLES !== undefined) ctx.hbs.Tables = TABLES
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
const orderPost = async(ctx, table) => {
	try {
		await tableButton(ctx.hbs.userid, ctx.request.body.Button)
		await message(ctx,'modified',`${ctx.request.body.Button} by`)
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
export { orderGet, orderGetId, orderPost }
