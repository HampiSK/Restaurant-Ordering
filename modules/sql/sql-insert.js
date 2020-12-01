/**
 * Param object - object from witch sql statement is created.
 * Param tablename - table name where data will be inserted.
 * Return - sql statement (string)
 *
 * All strings are modified by trim() function.
 * Empty values are not inserted into database. Empty values are created by database with NULL value by default.
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
