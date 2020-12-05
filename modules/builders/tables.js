/** module Table */

/* Modules */
import { sqlInsert, sqlModify, sqlCreate } from '../sql/sql-module.js'
import restaraurantTable from '../sql/restaurant_table-table.js'
import todayDate from '../scripts/today-date.js'
import { stringLenghtChecker } from '../scripts/checkers.js'

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
     * @return {array} [TABLES] - Contain table data.
     *
     */
	async GetTables(flag = 1) {
		try{
			if (flag < 0 || flag > 1) throw new Error('Invalid flag for GetTables()')
			const TABLES = []
			await this.db.each(`SELECT * FROM RESTAURANT_TABLE WHERE InUse = "${flag}"`, (err, row) => {
				if (err === 0) throw new Error('Cannot open database')
				TABLES.push({TableName: row.TableName, TableId: row.TableId, Comment: row.Comment})
			})
			return TABLES
		}catch(err) {
			throw new Error(`Could not retrieve tables => ${err.message}`)
		}
	}


	/**
	 * @Method
     * Reuse deacitvated table.
     *
     * @Alert
     * Async.
     *
     * @param {object} [body] - Object with new table data.
     *
     * @return {boolean} - True if table was created.
     *
     */
	async Reuse(body,all) {
		try{
			const TABLES = await this.GetTables(0)
			let num = TABLES.length
			if (num > 0) {
				num = all
				body.InUse = 1
				body.TableId = TABLES[0]['TableId']
				await this.Modify(body, body.TableId)
				return true
			}
		}catch(err) {
			throw new Error(`Reuse(): ${err.message}`)
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
			const ALL = await this.db.get('SELECT count(TableId) AS count FROM RESTAURANT_TABLE WHERE InUse = "1"')
			const num = ALL.count
			if(await this.Reuse(body,num)) return true
			const HIGHEST = await this.db.get('SELECT count(TableId) AS count FROM RESTAURANT_TABLE')
			body.TableId = HIGHEST.count + 1
			body.TableName = `Table ${ HIGHEST.count + 1}`
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
			await this.SortNames()
			return true
		}catch(err) {
			throw new Error(`Table was not modified => ${err.message}`)
		}
	}


	/**
	 * @Method
     * Create unique names for table in use.
     *
     * @Alert
     * Async. Not pure method
     *
     */
	async SortNames() {
		try{
			let counter = 1
			await this.db.each('SELECT * FROM RESTAURANT_TABLE WHERE InUse = 1', (err, row) => {
				if (err === 0) throw new Error('Cannot open database')
				const DBNAME = row.TableName
				let number = DBNAME.substring(6) // 6 is lenght of "Table "
				number = parseInt(number)
				if(number !== counter)
					this.Modify({TableName: `Table ${counter}`}, row.TableId)
				counter++
			})
		}catch(err) {
			throw new Error(`SortNames(): ${err.message}`)
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
