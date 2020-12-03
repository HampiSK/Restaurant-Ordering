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
// import Accounts from './modules/accounts.js'
// import Ingredients from './modules/ingredients.js'
// import Items from './modules/items.js'
// import Menus from './modules/menus.js'
// import Orders from './modules/orders.js'
// import Payments from './modules/payments.js'
// import Tables from './modules/tables.js'

// // Object.assign(data,ctxSession(data))
// const data = ['sa','sa','f']
// console.log(typeof data)

// // 	const body = {
// //         Title: 'Potato',
// //         Type: 'Fruit',
// // 		CreatorId: 1,
// // 		Comment: 'Comment'
// // 	}
// // 	const ingredient = await new Ingredients()

// // 		await ingredient.Create(body)
// // 		const data1 = await ingredient.db.get('SELECT * FROM INGREDIENT')
// // 		data1.Type = 'Vegetable'
// // 		await ingredient.Modify(data1, data1.IngredientId)
// // 		const data2 = await ingredient.db.get('SELECT * FROM INGREDIENT')
// // 		const time = todayDate()

// //         console.log(data2.UpdatedAt,time)

// // const body = {
// // 		FirstName: 'j   ',
// // 		LastName: '  doe  ',
// // 		Birth: '1982-11-09',
// // 		Password: 'password',
// // 		PasswordValidation: 'password',
// // 		Gender: 'Male',
// // 		Position: 'Manager',
// // 		Comment: 'Comment; DROP TABLE USER;',
// // 		Street: 'DELETE FROM USER;',
// // 		City: 'City; DROP TABLE USER\;',
// // 		Zip: ';DROP TABLE USER\;',
// // 		Phone: '0949888999',
// // 		Email: ''
// //             }

// // const body1 = {
// //   ...body
// // };
// // const body2 = {
// //   ...body
// // };
// // const account = await new Accounts()
// // await account.Register(body1)
// // await account.Register(body2)
// // var name = "doej"
// // const data1 = await account.db.get(`SELECT * FROM USER WHERE UserName = '${name}'`)
// // console.log(data1)
// // data1['FirstName'] = "Peter"
// // const sql = await sqlModify(data1,'USER',"UserName",name)
// // await account.db.run(sql)
// // const data10 = await account.db.get(`SELECT * FROM USER WHERE UserName = '${name}'`)
// // console.log(data10)
// // account.Close()

// // 	async Jobs(body) {
// //         try{
// //             switch(body.Position) {
// //                 case 'Admin':
// //                     body.Admin = 1, body.Manager = 0, body.Waiter = 0, body.Chef = 0
// //                     break
// //                 case 'Manager':
// //                     body.Admin = 0, body.Manager = 1, body.Waiter = 0, body.Chef = 0
// //                     break
// //                 case 'Waiter':
// //                     body.Admin = 0, body.Manager = 0, body.Waiter = 1, body.Chef = 0
// //                     break
// //                 case 'Chef':
// //                     body.Admin = 0, body.Manager = 0, body.Waiter = 0, body.Chef = 1
// //                     break
// //                 default:
// //                     throw new Error('Job flag list was not created')
// //            }
// //            delete body.Position
// // 		}catch(err){ throw new Error(`Jobs: ${err.message}` ) }
// // 	}

// // 	async CreateUsername(firstName, lastName) {
// // 		let highest = 0 // Will be used as highest number of already existing users
// // 		const newUsername = LastName.toLowerCase() + FirstName.toLowerCase()[0]
// // 		let username = newUsername
// // 		// until new username returned
// // 		while (true) {
// // 			const sql = `SELECT COUNT(UserId) as records FROM USER WHERE UserName="${username}";`
// // 			const data = await this.db.get(sql) // getting data from database
// // 			if (data.records !== 0) // when name already exists
// // 			// looping each username
// // 				await this.db.each(`SELECT UserName FROM USER WHERE UserName LIKE "${username}%"`, (err, row) => {
// // 					if (err === 0) throw new Error('Cannot open database')
// // 					const dbName = row.UserName
// // 					let number = dbName.substring(username.length - 1) // exracting only numbers from username
// // 					number = parseInt(number)
// // 					if (highest < number) highest = number // Storing highest number
// // 					username = newUsername+(highest++).toString() // creating new username
// // 				})
// // 			else
// // 				return username // Only gets here when username is unique
// // 		}
// // 	}

// // import Tables from './modules/tables.js'
// // import todaydate from './modules/scripts/today-date.js'
// // import Ingredients from './modules/ingredients.js'
// // //import { SQLInsert, SQLModify, SQLCreate } from './modules/sql/sql-module.js'
// // // 'CREATE TABLE IF NOT EXISTS RESTAURANT_TABLE(\
// // //                 \'TableId\' INTEGER PRIMARY KEY AUTOINCREMENT,\
// // //                 \'InUse\' TINYINT(1) NOT NULL DEFAULT 1,\
// // //                 \'CreatorId\' INTEGER NOT NULL,\
// // //                 \'CreatedAt\' DATETIME NOT NULL DEFAULT (datetime(\'now\')),\
// // //                 \'UpdatedAt\' DATETIME NULL DEFAULT NULL,\
// // //                 \'Comment\' TEXT NULL DEFAULT NULL),\
// // //                 FOREIGN KEY(CreatorId) REFERENCES USER(UserId));'
// // const body = {
// // Title: 'Potato',
// // Type: 'Fruit',
// // CreatorId: 1,
// // Comment: 'Comment'
// // }
// // const ingredient = await new Ingredients()
// // await ingredient.Create(body)
// // const data1 = await ingredient.db.get('SELECT * FROM INGREDIENT')
// // data1.Type = 'Vegetable'
// // await ingredient.Modify(data1, data1.IngredientId)
// // const data2 = await ingredient.db.get('SELECT * FROM INGREDIENT')
// // const time = todaydate()
// // console.log(data2.UpdatedAt, time)
// // ingredient.Close()
// // let s = false
// // console.log(typeof s)
// // s = true
// // console.log(typeof s)
// // // import Accounts from './modules/accounts.js'

// // // async function SQLModify(body,tablename,where,like) {
// // //     let change = ''
// // // 	// Iterating object and using its keys
// // // 	for (const val of Object.keys(body)) {
// // // 		if (typeof body[val] === 'string') body[val] = body[val].trim() // modify whitespaces
// // // 		if (body[val] === '') continue // skip empty values
// // // 		if (change.length === 0) // first value
// // // 			change += `${val} = "${body[val]}"`
// // // 		else
// // //             change += `,${val} = "${body[val]}"`
// // // 	}
// // //     const sql = `UPDATE ${tablename} SET ${change} WHERE ${where}='${like}';`
// // // 	return sql
// // // }


// // // const fi = {
// // //     Username: 'ha',
// // //     Table: [ {
// // //                'TableName': 'Table 1',
// // //                Comment: 'None'
// // //              },
// // //             {
// // //                TableName: 'Table 2',
// // //                Comment: ''
// // //              },
// // //             {
// // //                TableName: 'Table 3',
// // //                Comment: 'None'
// // //              },
// // //             {
// // //                TableName: 'Table 4',
// // //                Comment: 'None'
// // //              },
// // //             {
// // //                TableName: 'Table 5',
// // //                Comment: ''
// // //              },
// // //             {
// // //                TableName: 'Table 6',
// // //                Comment: 'None'
// // //              }]
// // // }


// // // for (let i of fi.Table) {
// // //     //console.log(i)
// // //     var tst = i
// // //     console.log(tst.TableName)
// // // }


