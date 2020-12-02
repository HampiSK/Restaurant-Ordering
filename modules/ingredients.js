/** module Tables */

import { SQLInsert, SQLModify, SQLCreate } from '../modules/sql/sql-module.js'
import IngredientTable from '../modules/sql/ingredient-table.js'
import todaydate from './scripts/today-date.js'
import { StringLenghtChecker } from './scripts/checkers.js'


const Ltitle = 75
const Ltype = 30
const Lcomment = 1000
/**
 * Tables
 * ES6 module that handles creating and managing tables.
 */
class Ingredients {
	/**
   * Create an tables object
   * @param {String} [dbName=":memory:"] - The name of the database file to use.
   */
	constructor(dbName = ':memory:') {
		return (async() => SQLCreate(this,dbName,IngredientTable()) )()
	}
    
    async CheckLenght(body) {
        for (const val of Object.keys(body)) {
            if (body[val] === 'Title')
                await StringLenghtChecker(body[val],Ltitle,val)
            else if (body[val] === 'Type')
                await StringLenghtChecker(body[val],Ltype,val)
            else
                await StringLenghtChecker(body[val],Lcomment,val)
		}
    }
    
	async Create(body) {
		await this.CheckLenght(body)
		const sql = await SQLInsert(body,'INGREDIENT')
		await this.db.run(sql)
		return true
	}

	async Modify(body, IngredientId) {
		await this.CheckLenght(body)
		body.UpdatedAt = todaydate()
		const sql = await SQLModify(body,'INGREDIENT','IngredientId',IngredientId)
		await this.db.run(sql)
		return true
	}

	async Close() {
		await this.db.close()
	}

}

export default Ingredients
