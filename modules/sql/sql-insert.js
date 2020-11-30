/**
 * Takes object from witch sql statement is created.
 * Sql statement will inserts data into specified table.
 * All strings are modified by trim() function.
 * Empty values are not inserted into database. Empty values are created by database with NULL value by default.
 * Returns sql statement (string)
 *
 */
export default async function SQLInsert(body,tablename) {
	let columns = ''
	let values = ''
	// Iterating object and using its keys
	for (const val of Object.keys(body)) {
		if (typeof body[val] === 'string') body[val] = body[val].trim() // modify whitespaces
		if (body[val] === '') continue // skip empty values
		if (columns.length === 0) { // first value
			columns += `${val}`
			values += `"${body[val]}"`
		} else {
			columns += `,${val}`
			values += `,"${body[val]}"`
		}
	}
	const sql = `INSERT INTO ${tablename}(${columns}) VALUES (${values})`
	return sql
}

// export default async function SQLInsert(body,tablename,where,like) {
//     let change = ''
// 	// Iterating object and using its keys
// 	for (const val of Object.keys(body)) {
// 		if (typeof body[val] === 'string') body[val] = body[val].trim() // modify whitespaces
// 		if (body[val] === '') continue // skip empty values
// 		if (columns.length === 0) // first value
// 			change += `"${val}" = "${body[val]}"`
// 		else
//             change += `,"${val}" = "${body[val]}"`
// 	}
//     const sql = `UPDATE ${tablename} SET ${change} WHERE ${where} LIKE ${like};`
// 	return sql
// }
