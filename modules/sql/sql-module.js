import sqlite from 'sqlite-async'
import { StringChecker } from '../scripts/checkers.js'
/**
 *
 * Param body - Object.
 * Param dbName - Database where data are stored in.
 * Param table - sql statement used to dreate table in database.
 *
 * Open database (when DB is not there will be created) and run sql statement assigned int table param.
 *
 * Returns object
 *
 */
async function SQLCreate(body,dbName,table) {
	body.db = await sqlite.open(dbName)
	await body.db.run(table)
	return body
}

/**
 *
 * Param body - object from which sql statement is created.
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
async function SQLModify(body,tablename,column,value) {
	let change = ''
	// Iterating object and using its keys
	for (const val of Object.keys(body)) {
		if (typeof body[val] === 'string') body[val] = body[val].trim() // modify whitespaces
		if (await StringChecker(body[val])) continue
		if (change.length === 0) // first value
			change += `${val} = "${body[val]}"`
		else
			change += `,${val} = "${body[val]}"`
	}

	const sql = `UPDATE ${tablename} SET ${change} WHERE ${column}='${value}';`
	return sql
}


/**
 *
 * Param body - object from which sql statement is created.
 * Param tablename - table name where data will be inserted.
 * Return - sql statement (string)
 *
 * All strings are modified by trim() function.
 * Empty values are not inserted into database. Empty values are created by database with NULL value by default.
 *
 */
async function SQLInsert(body,tablename) {
	let columns = ''
	let values = ''
	// Iterating object and using its keys
	for (const val of Object.keys(body)) {
		if (typeof body[val] === 'string') body[val] = body[val].trim() // modify whitespaces
		if (await StringChecker(body[val])) continue
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

export { SQLInsert, SQLModify, SQLCreate }
