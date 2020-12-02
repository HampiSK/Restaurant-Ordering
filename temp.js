import ctxSession from './modules/ctx/session.js'
import { stringLenghtChecker, emptyStringChecker, numberChecker } from './modules/scripts/checkers.js'
import todayDate from './modules/scripts/today-date.js'

const data = {
    a: 1,
    b: 2,
    c: 3,
    d: 0,
    f: -1
}


console.log(await todayDate(-2300))


// import Tables from './modules/tables.js'
// import todaydate from './modules/scripts/today-date.js'
// import Ingredients from './modules/ingredients.js'
// //import { SQLInsert, SQLModify, SQLCreate } from './modules/sql/sql-module.js'
// // 'CREATE TABLE IF NOT EXISTS RESTAURANT_TABLE(\
// //                 \'TableId\' INTEGER PRIMARY KEY AUTOINCREMENT,\
// //                 \'InUse\' TINYINT(1) NOT NULL DEFAULT 1,\
// //                 \'CreatorId\' INTEGER NOT NULL,\
// //                 \'CreatedAt\' DATETIME NOT NULL DEFAULT (datetime(\'now\')),\
// //                 \'UpdatedAt\' DATETIME NULL DEFAULT NULL,\
// //                 \'Comment\' TEXT NULL DEFAULT NULL),\
// //                 FOREIGN KEY(CreatorId) REFERENCES USER(UserId));'
// const body = {
// Title: 'Potato',
// Type: 'Fruit',
// CreatorId: 1,
// Comment: 'Comment'
// }
// const ingredient = await new Ingredients()
// await ingredient.Create(body)
// const data1 = await ingredient.db.get('SELECT * FROM INGREDIENT')
// data1.Type = 'Vegetable'
// await ingredient.Modify(data1, data1.IngredientId)
// const data2 = await ingredient.db.get('SELECT * FROM INGREDIENT')
// const time = todaydate()
// console.log(data2.UpdatedAt, time)
// ingredient.Close()
// let s = false
// console.log(typeof s)
// s = true
// console.log(typeof s)
// // import Accounts from './modules/accounts.js'

// // async function SQLModify(body,tablename,where,like) {
// //     let change = ''
// // 	// Iterating object and using its keys
// // 	for (const val of Object.keys(body)) {
// // 		if (typeof body[val] === 'string') body[val] = body[val].trim() // modify whitespaces
// // 		if (body[val] === '') continue // skip empty values
// // 		if (change.length === 0) // first value
// // 			change += `${val} = "${body[val]}"`
// // 		else
// //             change += `,${val} = "${body[val]}"`
// // 	}
// //     const sql = `UPDATE ${tablename} SET ${change} WHERE ${where}='${like}';`
// // 	return sql
// // }

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
// // await account.register(body1)
// // await account.register(body2)
// // var name = "doej"
// // const data1 = await account.db.get(`SELECT * FROM USER WHERE UserName = '${name}'`)

// // data1['FirstName'] = "Peter"
// // const sql = await SQLModify(data1,'USER',"UserName",name)
// // await account.db.run(sql)
// // const data10 = await account.db.get(`SELECT * FROM USER WHERE UserName = '${name}'`)

// // account.close()

// // const fi = {
// //     Username: 'ha',
// //     Table: [ {
// //                'TableName': 'Table 1',
// //                Comment: 'None'
// //              },
// //             {
// //                TableName: 'Table 2',
// //                Comment: ''
// //              },
// //             {
// //                TableName: 'Table 3',
// //                Comment: 'None'
// //              },
// //             {
// //                TableName: 'Table 4',
// //                Comment: 'None'
// //              },
// //             {
// //                TableName: 'Table 5',
// //                Comment: ''
// //              },
// //             {
// //                TableName: 'Table 6',
// //                Comment: 'None'
// //              }]
// // }


// // for (let i of fi.Table) {
// //     //console.log(i)
// //     var tst = i
// //     console.log(tst.TableName)
// // }


