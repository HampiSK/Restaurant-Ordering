// import ctxSession from './modules/ctx/session.js'
// import { stringLenghtChecker, emptyStringChecker, numberChecker } from './modules/scripts/checkers.js'
// import todayDate from './modules/scripts/today-date.js'
// import ingredientTable from './modules/sql/ingredient-table.js'
// import itemTable from './modules/sql/item-table.js'
// import itemMenuTable from './modules/sql/item_menu-table.js'
// import menuTable from './modules/sql/menu-table.js'
// import paymentTable from './modules/sql/payment-table.js'
// import restaurantOrderTable from './modules/sql/restaurant_order-table.js'
// import restaurantTable from './modules/sql/restaurant_table-table.js'
// import { sqlInsert, sqlModify, sqlCreate } from './modules/sql/sql-module.js'
// import userTable from './modules/sql/user-table.js'
// import Accounts from './modules/builders/accounts.js'
import Ingredients from './modules/ingredients.js'
import Foods from './modules/builders/foods.js'
import Contains from './modules/builders/contains.js'
import Menus from './modules/menus.js'
import Orders from './modules/builders/orders.js'
// import Payments from './modules/payments.js'
import Tables from './modules/builders/tables.js'

const DBNAME = "website.db"

const ss = async () => {
//     const potato = {
//         Title: "Potato",
//         Type: "Vegetables",
//         Quantity: 10,
//         Unit: 2000,
//         Price: 1.36,
//         CreatorId: 2,
//         Comment: "Vodka is made from potatoes"
//     }
//     const salt = {
//         Title: "Salmon",
//         Type: "Fish",
//         Quantity: 12,
//         Unit: 1200,
//         Price: 15,
//         CreatorId: 2
//     }
//     const ing = await new Ingredients(DBNAME)
//     await ing.Create(potato) 
//     await ing.Create(salt) 
//     const potato = {
//     Title: "Potatoes",
//     Type: "Side",
//     Price: 2.50,
//     Kitchen: 1,
//     CreatorId: 2
//     }
    
//     const salmon = {
//     Title: "Salmon with potatoes",
//     Type: "Main",
//     Price: 12,
//     Kitchen: 1,
//     CreatorId: 2
//     }
//     const foo = await new Foods(DBNAME)
//     await foo.Create(salmon) 
//     await foo.Create(potato) 

//     const contain1 = {
//     FoodId: 2,
//     IngredientId: 1,
//     Quantity: 5,
//     CreatorId: 2
//     }
//     const contain2 = {
//     FoodId: 2,
//     IngredientId: 2,
//     Quantity: 1,
//     CreatorId: 2
//     }
//     const contain3 = {
//     FoodId: 2,
//     IngredientId: 5,
//     Quantity: 1,
//     CreatorId: 2
//     }    
//     const con = await new Contains(DBNAME)
//     await con.Create(contain1) 
//     await con.Create(contain2) 
//     await con.Create(contain3) 
 
//     const menu = {
//         CreatorId: 2,
//         FoodId: 1
//     }
//     const m = await new Menus(DBNAME)
//     await m.Create(menu)
    
    const body1 = {
        CreatorId: 2,
        TableId: 2,
        FoodId: 1,
        Status: "Placed",
        Comment: 'Comment'
    }
    const body2 = {
        CreatorId: 2,
        TableId: 3,
        FoodId: 1,
        Status: "Prepared",
        Comment: 'Comment'
    }
    const body3 = {
        CreatorId: 2,
        TableId: 4,
        FoodId: 1,
        Status: "Served",
        Comment: 'Comment'
    }
    const body4 = {
        CreatorId: 2,
        TableId: 3,
        FoodId: 1,
        Status: "Failed"

    }
    const body5 = {
        CreatorId: 2,
        TableId: 2,
        FoodId: 1,
        Status: "Paid"

    }
    const order = await new Orders(DBNAME)
// //     let counter = 0
// //     while (counter != 10000)
// //     {
        await order.Create(body1)
        await order.Create(body2)
        await order.Create(body3)
        await order.Create(body4)
        await order.Create(body5)
//         counter++
//     }

//     const test1 = await order.GetOrders()
//     console.log(test1[0],test1[test1.length - 1])
}

await ss()

// let list = ['2020-12-05 16:26:05','2000-12-05 16:26:05','2020-10-05 16:26:05','2020-12-05 16:20:05','2020-12-05 16:27:05']
// let sorted = []
// console.log(list)
// console.log(list.sort())
// console.log(sorted)
// // for (let num in list){
//    for (let i in list){ 
//        sorted.reduce(list[i])
//    }
// } 

// console.log(list)
// console.log(sorted)
// if(list[0] > list[4])
//     console.log(`${list[0]} > ${list[4]}`)

// const body = {
//     CreatorId: 1,
//     Comment: 'Comment'
// }
// const table = await new Tables()

// await table.Create(body)
// await table.Create(body)
// await table.Create(body)
// await table.Create(body)

// const tables = await table.GetTables()
// console.log(tables)

// const deac = tables[0]
// delete deac.TableName
// deac.InUse = 0
// await table.Modify(deac,deac.TableId)

// const deac1 = tables[3]
// delete deac1.TableName
// deac1.InUse = 0
// await table.Modify(deac1,deac1.TableId)

// const tables1 = await table.GetTables()
// console.log(tables1)

// await table.Create(body)

// const tables2 = await table.GetTables()
// console.log(tables2)

// await table.Create(body)
// await table.Create(body)

// const tables3 = await table.GetTables()
// console.log(tables3)

// const tester = await table.GetTables(0)
// console.log(tester)
// await table.Modify(body)
// const data = await table.db.get('SELECT * FROM RESTAURANT_TABLE WHERE ')




// const a = ['a','b']
// console.log(typeof a)
// // let b = ['a','b']
// // console.log(typeof b)

// for (const i in a) console.log(i)
// for (const i of a) console.log(i)
// // const c = {'a','b'}
// // console.log(typeof c)
// // let d = {'a','b'}
// // console.log(typeof d)


// // // // Object.assign(data,ctxSession(data))
// // // const data = ['sa','sa','f']
// // // console.log(typeof data)

// // // // 	const body = {
// // // //         Title: 'Potato',
// // // //         Type: 'Fruit',
// // // // 		CreatorId: 1,
// // // // 		Comment: 'Comment'
// // // // 	}
// // // // 	const ingredient = await new Ingredients()

// // // // 		await ingredient.Create(body)
// // // // 		const data1 = await ingredient.db.get('SELECT * FROM INGREDIENT')
// // // // 		data1.Type = 'Vegetable'
// // // // 		await ingredient.Modify(data1, data1.IngredientId)
// // // // 		const data2 = await ingredient.db.get('SELECT * FROM INGREDIENT')
// // // // 		const time = todayDate()

// // // //         console.log(data2.UpdatedAt,time)

// // // // const body = {
// // // // 		FirstName: 'j   ',
// // // // 		LastName: '  doe  ',
// // // // 		Birth: '1982-11-09',
// // // // 		Password: 'password',
// // // // 		PasswordValidation: 'password',
// // // // 		Gender: 'Male',
// // // // 		Position: 'Manager',
// // // // 		Comment: 'Comment; DROP TABLE USER;',
// // // // 		Street: 'DELETE FROM USER;',
// // // // 		City: 'City; DROP TABLE USER\;',
// // // // 		Zip: ';DROP TABLE USER\;',
// // // // 		Phone: '0949888999',
// // // // 		Email: ''
// // // //             }

// // // // const body1 = {
// // // //   ...body
// // // // };
// // // // const body2 = {
// // // //   ...body
// // // // };
// // // // const account = await new Accounts()
// // // // await account.Register(body1)
// // // // await account.Register(body2)
// // // // var name = "doej"
// // // // const data1 = await account.db.get(`SELECT * FROM USER WHERE UserName = '${name}'`)
// // // // console.log(data1)
// // // // data1['FirstName'] = "Peter"
// // // // const sql = await sqlModify(data1,'USER',"UserName",name)
// // // // await account.db.run(sql)
// // // // const data10 = await account.db.get(`SELECT * FROM USER WHERE UserName = '${name}'`)
// // // // console.log(data10)
// // // // account.Close()

// // // // 	async Jobs(body) {
// // // //         try{
// // // //             switch(body.Position) {
// // // //                 case 'Admin':
// // // //                     body.Admin = 1, body.Manager = 0, body.Waiter = 0, body.Chef = 0
// // // //                     break
// // // //                 case 'Manager':
// // // //                     body.Admin = 0, body.Manager = 1, body.Waiter = 0, body.Chef = 0
// // // //                     break
// // // //                 case 'Waiter':
// // // //                     body.Admin = 0, body.Manager = 0, body.Waiter = 1, body.Chef = 0
// // // //                     break
// // // //                 case 'Chef':
// // // //                     body.Admin = 0, body.Manager = 0, body.Waiter = 0, body.Chef = 1
// // // //                     break
// // // //                 default:
// // // //                     throw new Error('Job flag list was not created')
// // // //            }
// // // //            delete body.Position
// // // // 		}catch(err){ throw new Error(`Jobs: ${err.message}` ) }
// // // // 	}

// // // // 	async CreateUsername(firstName, lastName) {
// // // // 		let highest = 0 // Will be used as highest number of already existing users
// // // // 		const newUsername = LastName.toLowerCase() + FirstName.toLowerCase()[0]
// // // // 		let username = newUsername
// // // // 		// until new username returned
// // // // 		while (true) {
// // // // 			const sql = `SELECT COUNT(UserId) as records FROM USER WHERE UserName="${username}";`
// 			const data = await this.db.get(sql) // getting data from database
// 			if (data.records !== 0) // when name already exists
// 			// looping each username
// 				await this.db.each(`SELECT UserName FROM USER WHERE UserName LIKE "${username}%"`, (err, row) => {
// 					if (err === 0) throw new Error('Cannot open database')
// 					const dbName = row.UserName
//  					let number = dbName.substring(username.length - 1) // exracting only numbers from username
// // // // 					number = parseInt(number)
// // // // 					if (highest < number) highest = number // Storing highest number
// // // // 					username = newUsername+(highest++).toString() // creating new username
// // // // 				})
// // // // 			else
// // // // 				return username // Only gets here when username is unique
// // // // 		}
// // // // 	}

// // // // import Tables from './modules/tables.js'
// // // // import todaydate from './modules/scripts/today-date.js'
// // // // import Ingredients from './modules/ingredients.js'
// // // // //import { SQLInsert, SQLModify, SQLCreate } from './modules/sql/sql-module.js'
// // // // // 'CREATE TABLE IF NOT EXISTS RESTAURANT_TABLE(\
// // // // //                 \'TableId\' INTEGER PRIMARY KEY AUTOINCREMENT,\
// // // // //                 \'InUse\' TINYINT(1) NOT NULL DEFAULT 1,\
// // // // //                 \'CreatorId\' INTEGER NOT NULL,\
// // // // //                 \'CreatedAt\' DATETIME NOT NULL DEFAULT (datetime(\'now\')),\
// // // // //                 \'UpdatedAt\' DATETIME NULL DEFAULT NULL,\
// // // // //                 \'Comment\' TEXT NULL DEFAULT NULL),\
// // // // //                 FOREIGN KEY(CreatorId) REFERENCES USER(UserId));'
// // // // const body = {
// // // // Title: 'Potato',
// // // // Type: 'Fruit',
// // // // CreatorId: 1,
// // // // Comment: 'Comment'
// // // // }
// // // // const ingredient = await new Ingredients()
// // // // await ingredient.Create(body)
// // // // const data1 = await ingredient.db.get('SELECT * FROM INGREDIENT')
// // // // data1.Type = 'Vegetable'
// // // // await ingredient.Modify(data1, data1.IngredientId)
// // // // const data2 = await ingredient.db.get('SELECT * FROM INGREDIENT')
// // // // const time = todaydate()
// // // // console.log(data2.UpdatedAt, time)
// // // // ingredient.Close()
// // // // let s = false
// // // // console.log(typeof s)
// // // // s = true
// // // // console.log(typeof s)
// // // // // import Accounts from './modules/accounts.js'

// // // // // async function SQLModify(body,tablename,where,like) {
// // // // //     let change = ''
// // // // // 	// Iterating object and using its keys
// // // // // 	for (const val of Object.keys(body)) {
// // // // // 		if (typeof body[val] === 'string') body[val] = body[val].trim() // modify whitespaces
// // // // // 		if (body[val] === '') continue // skip empty values
// // // // // 		if (change.length === 0) // first value
// // // // // 			change += `${val} = "${body[val]}"`
// // // // // 		else
// // // // //             change += `,${val} = "${body[val]}"`
// // // // // 	}
// // // // //     const sql = `UPDATE ${tablename} SET ${change} WHERE ${where}='${like}';`
// // // // // 	return sql
// // // // // }


// // // // // const fi = {
// // // // //     Username: 'ha',
// // // // //     Table: [ {
// // // // //                'TableName': 'Table 1',
// // // // //                Comment: 'None'
// // // // //              },
// // // // //             {
// // // // //                TableName: 'Table 2',
// // // // //                Comment: ''
// // // // //              },
// // // // //             {
// // // // //                TableName: 'Table 3',
// // // // //                Comment: 'None'
// // // // //              },
// // // // //             {
// // // // //                TableName: 'Table 4',
// // // // //                Comment: 'None'
// // // // //              },
// // // // //             {
// // // // //                TableName: 'Table 5',
// // // // //                Comment: ''
// // // // //              },
// // // // //             {
// // // // //                TableName: 'Table 6',
// // // // //                Comment: 'None'
// // // // //              }]
// // // // // }


// // // // // for (let i of fi.Table) {
// // // // //     //console.log(i)
// // // // //     var tst = i
// // // // //     console.log(tst.TableName)
// // // // // }


// // router.get('/profile', async(ctx) => {
// // 	const account = await new Accounts(dbName)
// // 	const data = await account.db.get(`SELECT * FROM USER WHERE UserId = '${ctx.hbs.authorised.userid}'`)
// // 	for (const i of ['Admin','Manager','Chef','Waiter']) {
// // 		if (data[i] === 1) data.Position = i
// // 	}
// // 	data.Photo = getphoto(data.UserName)
// // 	const body = {
// // 		Photo: data.Photo, UserId: data.UserId, UserName: data.UserName, FirstName: data.FirstName,
// // 		LastName: data.LastName, Birth: data.Birth, Gender: data.Gender, Position: data.Position,
// // 		Street: data.Street, City: data.City, Zip: data.Zip, Phone: data.Phone, Email: data.Email
// // 	}
// // 	await ctx.render('profile', body)
// // })

// // router.post('/profile', async(ctx) => {
// // 	//const body = ctx.request.body
// // 	console.log(ctx.request.body)
// // //     const account = await new Accounts(dbName)
// // //     const data = await account.db.get(`SELECT * FROM USER WHERE UserId = '${ctx.hbs.authorised.userid}'`)
// // //     uploadphoto(data.UserName)
// // })

// // router.get('/tables', async(ctx) => {
// // 	try {
// // 		const body = {
// // 			Username: 'ha',
// // 			Table: [ { TableName: 'Table 1', Comment: 'None' },{ TableName: 'Table 2', Comment: '' },
// // 				{ TableName: 'Table 3', Comment: 'None' },{ TableName: 'Table 4', Comment: 'None' },
// // 				{ TableName: 'Table 5', Comment: '' },{ TableName: 'Table 6', Comment: 'None' }]
// // 		}
// // 		await ctx.render('tables', body)
// // 	} catch (err) {
// // 		ctx.hbs.error = err.message
// // 		await ctx.render('error', ctx.hbs)
// // 	}
// // })

// // // /**
// // //  * The user registration page.
// // //  *
// // //  * @name Register Page
// // //  * @route {GET} /register
// // //  */
// // // router.get('/register', async(ctx) => regweb(ctx, router))

// // // /**
// // //  * Runs script to process new user registrations.
// // //  *
// // //  * @name Register Script
// // //  * @route {POST} /register
// // //  */
// // // router.post('/register', async(ctx) => reguser(ctx, await new Accounts(dbName)))
