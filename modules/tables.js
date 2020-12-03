/** module Table */

/* Modules */
import { sqlInsert, sqlModify, sqlCreate } from '../modules/sql/sql-module.js'
import restaraurantTable from '../modules/sql/restaurant_table-table.js'
import todayDate from './scripts/today-date.js'
import { stringLenghtChecker } from './scripts/checkers.js'

const LCOMMENT = 1000

/**
 * @Object
 * Object Table is ES6 module that handles creating and modifying table.
 *
 */
class Tables {
	/**
     * @Constructor
     * Create an Tables object.
     *
     * @Alert
     * Async.
     *
     * Optional:
     * @param {String} [dbName=":memory:"] - The name of the database file to use.
     *                                       On default runs in main memory.
     * @return {object} - Itself.
     *
     */
	constructor(dbName = ':memory:') {
		return (async() => sqlCreate(this,dbName,restaraurantTable()) )()
	}


   	/**
	 * @Method
     * Get Tables.
     *
     * @Alert
     * Async.
     *
     * Optional:
     * @param {number} [flag] - Boolian flag for sql table to show if table is in use. On default table is in use.
     *
     * @return {array} [TABLES] - Contain table IDs in use.
     *
     */
	async GetTables(flag = 1) {
		try{
			if (flag < 0 || flag > 1) throw new Error('Invalid flag for GetTables()')
			const TABLES = []
			await this.db.each(`SELECT TableId FROM RESTAURANT_TABLE WHERE InUse = "${flag}%"`, (err, row) => {
				if (err === 0) throw new Error('Cannot open database')
				TABLES.push(row.TableId)
			})
			return TABLES
		}catch(err) {
			throw new Error(`Could not retrieve tables => ${err.message}`)
		}
	}


   	/**
	 * @Method
     * Create table.
     *
     * @Alert
     * Async. Not pure method, using  LCOMMENT
     *
     * @param {object} [body] - Object with new table data.
     *
     * @return {boolean} - True if table was created.
     *
     */
	async Create(body) {
		try{
			stringLenghtChecker(body.Comment,LCOMMENT,'Comment')
			const SQL = await sqlInsert(body,'RESTAURANT_TABLE')
			await this.db.run(SQL)
			return true
		}catch(err) {
			throw new Error(`Table was not created => ${err.message}`)
		}
	}


	/**
	 * @Method
     * Modify table.
     *
     * @Alert
     * Async. Not pure method, using  LCOMMENT
     *
     * @param {object} [body]   - Object with new table data.
     * @param {string} [TableId] - Id of table to change
     *
     * @return {boolean} - True if table was modified.
     *
     */
	async Modify(body, TableId) {
		try{
			stringLenghtChecker(body['Comment'],LCOMMENT)
			body.UpdatedAt = await todayDate()
			const SQL = await sqlModify(body,'RESTAURANT_TABLE','TableId',TableId)
			await this.db.run(SQL)
			return true
		}catch(err) {
			throw new Error(`Table was not modified => ${err.message}`)
		}
	}


	/**
	 * @Method
     * Close.
     *
     * @Alert
     * Async.
     *
     */
	async Close() {
		await this.db.close()
	}
}

/** @Export For Tables */
export default Tables
