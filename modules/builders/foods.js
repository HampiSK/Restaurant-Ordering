/** @Module Items */

/* Modules */
import { sqlInsert, sqlModify, sqlCreate, sqlGet } from '../sql/sql-module.js'
import foodTable from '../sql/food-table.js'
import todayDate from '../scripts/today-date.js'
import { stringLenghtChecker } from '../scripts/checkers.js'

const LTITLE = 75
const LCOMMENT = 1000

/**
 * @Object
 * Object Items is ES6 module that handles creating and modifying items.
 *
 */
class Foods {
	/**
     * @Constructor
     * Create an Item object.
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
		return (async() => await sqlCreate(this,dbName,foodTable()) )()
	}


  	/**
	 * @Method
     * Check if string value is not too long.
     *
     * @Alert
     * Async. Not pure method, using LTITLE LCOMMENT
     *
     * @param {object} [body] - Object with new item data
     *
     */
	async CheckLenght(body) {
		try{
			stringLenghtChecker(body['Title'],LTITLE,'Title')
			stringLenghtChecker(body['Comment'],LCOMMENT,'Comment')
		}catch(err) {
			throw new Error(`CheckLenght(): ${err.message}`)
		}
	}


   	/**
	 * @Method
     * Create item.
     *
     * @Alert
     * Async.
     *
     * @param {object} [body] - Object with new item data.
     *
     * @return {boolean} - True if item was created.
     *
     */
	async Create(body) {
		try{
			await this.CheckLenght(body)
			const SQL = await sqlInsert(body,'FOOD')
			await this.db.run(SQL)
			return true
		}catch(err) {
			throw new Error(`Item was not created => ${err.message}`)
		}
	}


   	/**
	 * @Method
     * Modify item.
     *
     * @Alert
     * Async.
     *
     * @param {object} [body]   - Object with new item data.
     * @param {string} [ItemId] - Id of item to change
     *
     * @return {boolean} - True if ingredient was modified.
     *
     */
	async Modify(body, FoodId) {
		try{
			await this.CheckLenght(body)
			body.UpdatedAt = await todayDate()
			const sql = await sqlModify(body,'FOOD','FoodId',FoodId)
			await this.db.run(sql)
			return true
		}catch(err) {
			throw new Error(`Item was not created => ${err.message}`)
		}

	}


	async Get(body = {},select = '*',dbname = 'FOOD') {
		try{
			const SQL = await sqlGet(body,dbname,select)
			const BODY = []
			await this.db.each(SQL, (err, row) => {
				if (err === 0) throw new Error('Cannot open database')
				BODY.push(row)
			})
			return BODY
		}catch(err) {
			throw new Error(`Orders => Get(): ${err.message}`)
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

/** @Export For Items */
export default Foods
