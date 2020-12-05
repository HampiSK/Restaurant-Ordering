/** @Module Items */

/* Modules */
import { sqlInsert, sqlModify, sqlCreate } from '../modules/sql/sql-module.js'
import itemTable from '../modules/sql/item-table.js'
import todayDate from './scripts/today-date.js'
import { stringLenghtChecker } from './scripts/checkers.js'

const LTITLE = 75
const LCOMMENT = 1000

/**
 * @Object
 * Object Items is ES6 module that handles creating and modifying items.
 *
 */
class Items {
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
		return (async() => await sqlCreate(this,dbName,itemTable()) )()
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
			const SQL = await sqlInsert(body,'ITEM')
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
	async Modify(body, ItemId) {
		try{
			await this.CheckLenght(body)
			body.UpdatedAt = await todayDate()
			const sql = await sqlModify(body,'ITEM_MENU','ItemId',ItemId)
			await this.db.run(sql)
			return true
		}catch(err) {
			throw new Error(`Item was not created => ${err.message}`)
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
export default Items
