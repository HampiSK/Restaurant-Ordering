/** module Payment */

/* Modules */
import { sqlInsert, sqlModify, sqlCreate } from '../modules/sql/sql-module.js'
import paymentTable from '../modules/sql/payment-table.js'
import todayDate from './scripts/today-date.js'
import { stringLenghtChecker, numberChecker } from './scripts/checkers.js'

const LCOMMENT = 1000

/**
 * @Object
 * Object Payment is ES6 module that handles creating and modifying payment.
 *
 */
class Payments {
	/**
     * @Constructor
     * Create an Payments object.
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
		return (async() => sqlCreate(this,dbName,paymentTable()) )()
	}


   	/**
	 * @Method
     * Create item.
     *
     * @Alert
     * Async. Not pure method, using  LCOMMENT
     *
     * @param {object} [body] - Object with new payment data.
     *
     * @return {boolean} - True if item was created.
     *
     */
	async Create(body) {
		try{
			stringLenghtChecker(body['Comment'],LCOMMENT,'Comment')
			numberChecker(body)
			const SQL = await sqlInsert(body,'PAYMMENT')
			await this.db.run(SQL)
			return true
		}catch(err) {
			throw new Error(`Payment was not created => ${err.message}`)
		}
	}


	/**
	 * @Method
     * Modify payment.
     *
     * @Alert
     * Async. Not pure method, using  LCOMMENT
     *
     * @param {object} [body]   - Object with new payment data.
     * @param {string} [PaymentId] - Id of payment to change
     *
     * @return {boolean} - True if payment was modified.
     *
     */
	async Modify(body, PaymentId) {
		try{
			stringLenghtChecker(body['Comment'],LCOMMENT,'Comment')
			numberChecker(body)
			body.UpdatedAt = await todayDate()
			const SQL = await sqlModify(body,'PAYMMENT','PaymentId',PaymentId)
			await this.db.run(SQL)
			return true
		}catch(err) {
			throw new Error(`Payment was not modified => ${err.message}`)
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

/** @Export For Payment */
export default Payments
