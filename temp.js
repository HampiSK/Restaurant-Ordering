// // import ctxSession from './modules/ctx/session.js'
// // import { stringLenghtChecker, emptyStringChecker, numberChecker } from './modules/scripts/checkers.js'
// // import todayDate from './modules/scripts/today-date.js'
// // import ingredientTable from './modules/sql/ingredient-table.js'
// // import itemTable from './modules/sql/item-table.js'
// // import itemMenuTable from './modules/sql/item_menu-table.js'
// // import menuTable from './modules/sql/menu-table.js'
// // import paymentTable from './modules/sql/payment-table.js'
// // import restaurantOrderTable from './modules/sql/restaurant_order-table.js'
// // import restaurantTable from './modules/sql/restaurant_table-table.js'
// // import { sqlInsert, sqlModify, sqlCreate } from './modules/sql/sql-module.js'
// // import userTable from './modules/sql/user-table.js'
// // import Accounts from './modules/builders/accounts.js'
// import Ingredients from './modules/ingredients.js'
// import Foods from './modules/builders/foods.js'
// import Contains from './modules/builders/contains.js'
// import Menus from './modules/menus.js'
// import Orders from './modules/builders/orders.js'
// // import Payments from './modules/payments.js'
// import Tables from './modules/builders/tables.js'

// const DBNAME = 'website.db'

// const ss = async() => {
// //     const potato = {
// //         Title: "Potato",
// //         Type: "Vegetables",
// //         Quantity: 10,
// //         Unit: 2000,
// //         Price: 1.36,
// //         CreatorId: 2,
// //         Comment: "Vodka is made from potatoes"
// //     }
// //     const salt = {
// //         Title: "Salmon",
// //         Type: "Fish",
// //         Quantity: 12,
// //         Unit: 1200,
// //         Price: 15,
// //         CreatorId: 2
// //     }
// //     const ing = await new Ingredients(DBNAME)
// //     await ing.Create(potato)
// //     await ing.Create(salt)
// //     const potato = {
// //     Title: "Potatoes",
// //     Type: "Side",
// //     Price: 2.50,
// //     Kitchen: 1,
// //     CreatorId: 2
// //     }

// 	//     const salmon = {
// 	//     Title: "Salmon with potatoes",
// 	//     Type: "Main",
// 	//     Price: 12,
// 	//     Kitchen: 1,
// 	//     CreatorId: 2
// 	//     }
// 	//     const foo = await new Foods(DBNAME)
// 	//     await foo.Create(salmon)
// 	//     await foo.Create(potato)

// 	//     const contain1 = {
// 	//     FoodId: 2,
// 	//     IngredientId: 1,
// 	//     Quantity: 5,
// 	//     CreatorId: 2
// 	//     }
// 	//     const contain2 = {
// 	//     FoodId: 2,
// 	//     IngredientId: 2,
// 	//     Quantity: 1,
// 	//     CreatorId: 2
// 	//     }
// 	//     const contain3 = {
// 	//     FoodId: 2,
// 	//     IngredientId: 5,
// 	//     Quantity: 1,
// 	//     CreatorId: 2
// 	//     }
// 	//     const con = await new Contains(DBNAME)
// 	//     await con.Create(contain1)
// 	//     await con.Create(contain2)
// 	//     await con.Create(contain3)

// 	//     const menu = {
// 	//         CreatorId: 2,
// 	//         FoodId: 1
// 	//     }
// 	//     const m = await new Menus(DBNAME)
// 	//     await m.Create(menu)

// 	const body1 = {
// 		CreatorId: 2,
// 		TableId: 2,
// 		FoodId: 1,
// 		Status: 'Placed',
// 		Comment: 'Comment'
// 	}
// 	const body2 = {
// 		CreatorId: 2,
// 		TableId: 3,
// 		FoodId: 1,
// 		Status: 'Prepared',
// 		Comment: 'Comment'
// 	}
// 	const body3 = {
// 		CreatorId: 2,
// 		TableId: 4,
// 		FoodId: 1,
// 		Status: 'Served',
// 		Comment: 'Comment'
// 	}
// 	const body4 = {
// 		CreatorId: 2,
// 		TableId: 3,
// 		FoodId: 1,
// 		Status: 'Failed'

// 	}
// 	const body5 = {
// 		CreatorId: 2,
// 		TableId: 2,
// 		FoodId: 1,
// 		Status: 'Paid'

// 	}
// 	const order = await new Orders(DBNAME)
// 	// //     let counter = 0
// 	// //     while (counter != 10000)
// 	// //     {
// 	await order.Create(body1)
// 	await order.Create(body2)
// 	await order.Create(body3)
// 	await order.Create(body4)
// 	await order.Create(body5)
// 	//         counter++
// 	//     }

// //     const test1 = await order.GetOrders()
// //     console.log(test1[0],test1[test1.length - 1])
// }

// // await ss()
