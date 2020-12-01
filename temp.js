// import Accounts from './modules/accounts.js'

// async function SQLModify(body,tablename,where,like) {
//     let change = ''
// 	// Iterating object and using its keys
// 	for (const val of Object.keys(body)) {
// 		if (typeof body[val] === 'string') body[val] = body[val].trim() // modify whitespaces
// 		if (body[val] === '') continue // skip empty values
// 		if (change.length === 0) // first value
// 			change += `${val} = "${body[val]}"`
// 		else
//             change += `,${val} = "${body[val]}"`
// 	}
//     const sql = `UPDATE ${tablename} SET ${change} WHERE ${where}='${like}';`
// 	return sql
// }

// const body = {
// 		FirstName: 'j   ',
// 		LastName: '  doe  ',
// 		Birth: '1982-11-09',
// 		Password: 'password',
// 		PasswordValidation: 'password',
// 		Gender: 'Male',
// 		Position: 'Manager',
// 		Comment: 'Comment; DROP TABLE USER;',
// 		Street: 'DELETE FROM USER;',
// 		City: 'City; DROP TABLE USER\;',
// 		Zip: ';DROP TABLE USER\;',
// 		Phone: '0949888999',
// 		Email: ''
//             }

// const body1 = {
//   ...body
// };
// const body2 = {
//   ...body
// };
// const account = await new Accounts()
// await account.register(body1)
// await account.register(body2)
// var name = "doej"
// const data1 = await account.db.get(`SELECT * FROM USER WHERE UserName = '${name}'`)

// data1['FirstName'] = "Peter"
// const sql = await SQLModify(data1,'USER',"UserName",name)
// await account.db.run(sql)
// const data10 = await account.db.get(`SELECT * FROM USER WHERE UserName = '${name}'`)

// account.close()

// const fi = {
//     Username: 'ha',
//     Table: [ {
//                'TableName': 'Table 1',
//                Comment: 'None'
//              },
//             {
//                TableName: 'Table 2',
//                Comment: ''
//              },
//             {
//                TableName: 'Table 3',
//                Comment: 'None'
//              },
//             {
//                TableName: 'Table 4',
//                Comment: 'None'
//              },
//             {
//                TableName: 'Table 5',
//                Comment: ''
//              },
//             {
//                TableName: 'Table 6',
//                Comment: 'None'
//              }]
// }


// for (let i of fi.Table) {
//     //console.log(i)
//     var tst = i
//     console.log(tst.TableName)
// }


