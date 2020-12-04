// router.get('/tables', async(ctx) => {
// 	try {
// 		const body = {
// 			Username: 'ha',
// 			Table: [ { TableName: 'Table 1', Comment: 'None' },{ TableName: 'Table 2', Comment: '' },
// 				{ TableName: 'Table 3', Comment: 'None' },{ TableName: 'Table 4', Comment: 'None' },
// 				{ TableName: 'Table 5', Comment: '' },{ TableName: 'Table 6', Comment: 'None' }]
// 		}
// 		await ctx.render('tables', body)
// 	} catch (err) {
// 		ctx.hbs.error = err.message
// 		await ctx.render('error', ctx.hbs)
// 	}
// })
