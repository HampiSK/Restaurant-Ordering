/** @Module Ingredients */

/* Modules */
import { stringLenghtChecker} from './scripts/checkers.js'
import { sqlInsert, sqlModify, sqlCreate } from '../modules/sql/sql-module.js'
import ingredientTable from '../modules/sql/ingredient-table.js'
import todayDate from '../modules/scripts/today-date.js'

const LTITLE = 75
const LTYPE = 30
const LCOMMENT = 1000

/**
 * @Object
 * Object Ingredients is ES6 module that handles creating and modifying ingredients .
 *
 */
class Ingredients {
	/**
     * @Constructor
     * Create an Ingredients object.
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
		return (async() => await sqlCreate(this,dbName,ingredientTable()) )()
	}


  	/**
	 * @Method
     * Check if each string value is not too long.
     *
     * @Alert
     * Async. Not pure method, using LTITLE LTYPE LCOMMENT
     *
     * @param {object} [body] - Object with new ingredient data
     *
     */
	async CheckLenght(body) {
		try{
			for (const val of Object.keys(body)) {
				if (body[val] === 'Title')
					stringLenghtChecker(body[val],LTITLE,val)
				else if (body[val] === 'Type')
					stringLenghtChecker(body[val],LTYPE,val)
				else
					stringLenghtChecker(body[val],LCOMMENT,val)
			}
		}catch(err) {
			throw new Error(`CheckLenght(): ${err.message}`)
		}
	}


   	/**
	 * @Method
     * Create ingredient.
     *
     * @Alert
     * Async.
     *
     * @param {object} [body] - Object with new ingredient data.
     *
     * @return {boolean} - True if ingredient was created.
     *
     */
	async Create(body) {
		try{
			await this.CheckLenght(body)
			const SQL = await sqlInsert(body,'INGREDIENT')
			await this.db.run(SQL)
			return true
		}catch(err) {
			throw new Error(`Ingredient was not created => ${err.message}`)
		}
	}


   	/**
	 * @Method
     * Modify ingredient.
     *
     * @Alert
     * Async.
     *
     * @param {object} [body] - Object with new ingredient data.
     * @param {string} [IngredientId]
     *
     * @return {boolean} - True if ingredient was modified.
     *
     */
	async Modify(body, IngredientId) {
		try{
			await this.CheckLenght(body)
			body.UpdatedAt = await todayDate()
			const SQL = await sqlModify(body,'INGREDIENT','IngredientId',IngredientId)
			await this.db.run(SQL)
			return true
		}catch(err) {
			throw new Error(`Ingredient was not created => ${err.message}`)
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

/** @Export For Ingredients */
export default Ingredients
