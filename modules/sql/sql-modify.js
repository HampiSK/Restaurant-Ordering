/**
 *
 * Param object - object from witch sql statement is created.
 * Param tablename - table name where data will be inserted.
 * Param column - name of column
 * Param value - specify value
 *
 * Takes object from witch sql statement is created.
 * Sql statement will modify data of specified table.
 * All strings are modified by trim() function.
 * Empty values are not modified.
 *
 * Returns sql statement (string)
 *
 */
export default async function SQLModify(body,tablename,column,value) {
	let change = ''
	// Iterating object and using its keys
	for (const val of Object.keys(body)) {
		if (typeof body[val] === 'string') body[val] = body[val].trim() // modify whitespaces
		if (body[val] === '') continue // skip empty values
		if (change.length === 0) // first value
			change += `${val} = "${body[val]}"`
		else
			change += `,${val} = "${body[val]}"`
	}
	const sql = `UPDATE ${tablename} SET ${change} WHERE ${column}='${value}';`
	return sql
}
