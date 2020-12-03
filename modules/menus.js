/** @Module Menus */

/* Modules */
import { stringLenghtChecker} from './scripts/checkers.js'
import { sqlInsert, sqlModify, sqlCreate } from '../modules/sql/sql-module.js'
import menuTable from '../modules/sql/menu-table.js'
import todayDate from '../modules/scripts/today-date.js'

const LCOMMENT = 1000

/**
 * @Object
 * Object Menus is ES6 module that handles creating and modifying menus.
 *
 */
class Menus {
	/**
     * @Constructor
     * Create an Menu object.
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
		return (async() => sqlCreate(this,dbName,menuTable()) )()
	}


   	/**
	 * @Method
     * Create menu.
     *
     * @Alert
     * Async. Not pure method, using  LCOMMENT
     *
     * @param {object} [body] - Object with new menu data.
     *
     * @return {boolean} - True if menu was created.
     *
     */
	async Create(body) {
		try{
			stringLenghtChecker(body['Comment'],LCOMMENT,'Comment')
			const SQL = await sqlInsert(body,'MENU')
			await this.db.run(SQL)
			return true
		}catch(err) {
			throw new Error(`Menu was not created => ${err.message}`)
		}
	}


   	/**
	 * @Method
     * Modify menu.
     *
     * @Alert
     * Async. Not pure method, using  LCOMMENT
     *
     * @param {object} [body]   - Object with new menu data.
     * @param {string} [MenuId] - Id of menu to change
     *
     * @return {boolean} - True if menu was modified.
     *
     */
	async Modify(body, MenuId) {
		try{
			stringLenghtChecker(body['Comment'],LCOMMENT,'Comment')
			body.UpdatedAt = await todayDate()
			const SQL = await sqlModify(body,'MENU','MenuId',MenuId)
			await this.db.run(SQL)
			return true
		}catch(err) {
			throw new Error(`Menu was not modified => ${err.message}`)
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

/** @Export For Menus */
export default Menus
