/** @SQL Modules */

/* Packages */
import sqlite from 'sqlite-async'

/* Modules */
import { emptyStringChecker } from '../scripts/checkers.js'


/**
 * @Function
 * Open database (when DB is not there will be created) and run sql statement assigned int table param.
 *
 * @Alert
 * Async function.
 *
 * @param {object} [body]   - Object to open database with.
 * @param {string} [dbName] - Name of database where data are stored in.
 * @param {string} [table]  - Sql statement used to dreate table in database.
 *
 * @return {object} [body]
 *
 */
const sqlCreate = async(body,dbName,table) => {
	try{
		body.db = await sqlite.open(dbName)
		await body.db.run(table)
		return body
	}catch(err) {
		throw new Error(`Something in sqlCreate went wrong => ${err.message}`)
	}
}


/**
 * @Function
 * Takes object from witch sql statement is created.
 * All strings are modified by trim() function.
 * Empty values are not modified.
 *
 * @param {object} [body]      - Object from which sql statement is created.
 *
 * @return {string} [change] - Returns sql statement
 *
 */
const modifyStatement = (body) => {
	let change = ''
	// Iterating object and using its keys
	for (const val of Object.keys(body)) {
		if (typeof body[val] === 'string') body[val] = body[val].trim() // modify whitespaces
		if (emptyStringChecker(body[val])) continue
		// first value
		if (change.length === 0) change += `${val} = "${body[val]}"`
		else change += `,${val} = "${body[val]}"`
	}
	return change
}


/**
 * @Function
 * Takes object from witch sql statement is created.
 * Sql statement will modify data of specified table.
 *
 * @Alert
 * Async function.
 *
 * @param {object} [body]      - Object from which sql statement is created.
 * @param {string} [tablename] - Table name where data will be inserted.
 * @param {string} [column]    - Name of column.
 * @param {string} [value]     - Specify value.
 *
 * @return {string} [SQL] - Returns sql statement
 *
 */
const sqlModify = async(body,tablename,column,value) => {
	try{
		const CHANGE = modifyStatement(body)
		const SQL = `UPDATE ${tablename} SET ${CHANGE} WHERE ${column}='${value}';`
		return SQL
	}catch(err) {
		throw new Error(`Something went wrong in sqlModify => ${err.message}`)
	}
}


/**
 * @Function
 * All strings are modified by trim() function.
 * Empty values are not inserted into database. Empty values are created by database with NULL value by default.
 *
 * @param {object} [body] - object from which sql statement is created.
 *
 * @return {array} - Values for statement
 *
 */
const insertStatement = (body) => {
	let columns = ''
	let values = ''
	// Iterating object and using its keys
	for (const val of Object.keys(body)) {
		if (typeof body[val] === 'string') body[val] = body[val].trim() // modify whitespaces
		if (emptyStringChecker(body[val])) continue
		if (columns.length === 0) { // first value
			columns += `${val}`
			values += `"${body[val]}"`
		} else {
			columns += `,${val}`
			values += `,"${body[val]}"`
		}
	}
	return [columns, values]
}


/**
 * @Function
 * All strings are modified by trim() function.
 * Empty values are not inserted into database. Empty values are created by database with NULL value by default.
 *
 * @Alert
 * Async function.
 *
 * @param {object} [body] - object from which sql statement is created.
 * @param {string} [tablename] - table name where data will be inserted.
 *
 * @return {string} [SQL] - Returns sql statement
 *
 */
const sqlInsert = async(body,tablename) => {
	try {
		const STATEMENT = insertStatement(body)
		const SQL = `INSERT INTO ${tablename}(${STATEMENT[0]}) VALUES (${STATEMENT[1]})`
		return SQL
	}catch(err) {
		throw new Error(`Something went wrong in sqlInsert => ${err.message}`)
	}
}

/**
 * @Function
 * All strings are modified by trim() function.
 * Empty values are not inserted into database. Empty values are created by database with NULL value by default.
 *
 * @param {object} [body] - object from which sql statement is created.
 *
 * @return {string} [where] - Sql statement.
 *
 */
const loopStatement = body => {
	let where = ''
	for (const val of Object.keys(body)) {
		if (typeof body[val] === 'string') body[val] = body[val].trim() // modify whitespaces
		if (emptyStringChecker(body[val])) continue
		if (where.length === 0) where += ` WHERE ${val} = "${body[val]}"`
		else where += `AND ${val} = "${body[val]}" `
	}
	return where
}

/**
 * @Function
 * Return sql statement
 *
 * @param {object} [body] - object from which sql statement is created.
 *
 * @return {string} - Sql statement or empty string.
 *
 */
const getStatement = body => {
	if (Object.keys(body).length > 0)
		return loopStatement(body)
	return ' '
}

/**
 * @Function
 * Return sql statement to get data.
 *
 * @Alert
 * Async function.
 *
 * @param {object} [body]      - Object from which sql statement is created.
 * @param {string} [tablename] - Table name where data will be inserted.
 *
 * Optional:
 * @param {string} [select]    - Name of column to select.
 *                             - On default select all.
 *
 * @return {string} [SQL] - Returns sql statement.
 *
 */
const sqlGet = async(body,tablename,select = '*') => {
	try {
		const WHERE = getStatement(body)
		const SQL = `SELECT ${select} FROM ${tablename} ${WHERE};`
		return SQL
	}catch(err) {
		throw new Error(`Something went wrong in sqlGet => ${err.message}`)
	}
}

/** @Export For SQL Modules */
export { sqlInsert, sqlModify, sqlCreate, sqlGet}
