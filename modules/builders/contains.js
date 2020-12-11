/** @Module Contains */

/* Modules */
import { sqlInsert, sqlCreate } from '../sql/sql-module.js'
import containTable from '../sql/contain-table.js'
import { stringLenghtChecker } from '../scripts/checkers.js'

const LTITLE = 75
const LCOMMENT = 1000

/**
 * @Object
 * Object Contains is ES6 module that handles creating and modifying contains.
 *
 */
class Contains {
	/**
     * @Constructor
     * Create an Contains object.
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
		return (async() => await sqlCreate(this,dbName,containTable()) )()
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
			stringLenghtChecker(body['Comment'],LCOMMENT,'Comment')
			stringLenghtChecker(body['Title'],LTITLE,'Comment')
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
			const SQL = await sqlInsert(body,'CONTAIN')
			await this.db.run(SQL)
			return true
		}catch(err) {
			throw new Error(`Contain was not created => ${err.message}`)
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

/** @Export For Contains */
export default Contains
