/** @Module Orders */

/* Modules */
import { sqlInsert, sqlModify, sqlCreate } from '../modules/sql/sql-module.js'
import restaurantOrderTable from '../modules/sql/restaurant_order-table.js'
import todayDate from './scripts/today-date.js'
import { stringLenghtChecker } from './scripts/checkers.js'

const LCOMMENT = 1000

/**
 * @Object
 * Object Orders is ES6 module that handles creating and modifying orders.
 *
 */
class Orders {
	/**
     * @Constructor
     * Create an Order object.
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
		return (async() => sqlCreate(this,dbName,restaurantOrderTable()) )()
	}


   	/**
	 * @Method
     * Create item.
     *
     * @Alert
     * Async. Not pure method, using  LCOMMENT
     *
     * @param {object} [body] - Object with new order data.
     *
     * @return {boolean} - True if order was created.
     *
     */
	async Create(body) {
		try{
			stringLenghtChecker(body['Comment'],LCOMMENT)
			const SQL = await sqlInsert(body,'RESTAURANT_ORDER')
			await this.db.run(SQL)
			return true
		}catch(err) {
			throw new Error(`Order was not created => ${err.message}`)
		}
	}


 	/**
	 * @Method
     * Modify order.
     *
     * @Alert
     * Async. Not pure method, using  LCOMMENT
     *
     * @param {object} [body]   - Object with new order data.
     * @param {string} [OrderId] - Id of order to change
     *
     * @return {boolean} - True if order was modified.
     *
     */
	async Modify(body, OrderId) {
		try{
			stringLenghtChecker(body['Comment'],LCOMMENT)
			body.UpdatedAt = await todayDate()
			const SQL = await sqlModify(body,'RESTAURANT_ORDER','OrderId',OrderId)
			await this.db.run(SQL)
			return true
		}catch(err) {
			throw new Error(`Order was not modified => ${err.message}`)
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

/** @Export For Orders */
export default Orders
