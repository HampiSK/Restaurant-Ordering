/** module Tables */

import { SQLInsert, SQLModify, SQLCreate } from '../modules/sql/sql-module.js'
import ItemMenuTable from '../modules/sql/item_menu-table.js'
import todaydate from './scripts/today-date.js'
import { StringLenghtChecker } from './scripts/checkers.js'


const Ltitle = 75
const Ltype = 30
const Lcomment = 1000
const Lother = 10000
/**
 * Tables
 * ES6 module that handles creating and managing tables.
 */
class Items {
	/**
   * Create an tables object
   * @param {String} [dbName=":memory:"] - The name of the database file to use.
   */
	constructor(dbName = ':memory:') {
		return (async() => SQLCreate(this,dbName,ItemMenuTable()) )()
	}
    
    async CheckLenght(body) {
        for (const val of Object.keys(body)) {
            if (body[val] === 'Title')
                await StringLenghtChecker(body[val],Ltitle,val)
            else if (body[val] === 'Type')
                await StringLenghtChecker(body[val],Ltype,val)
            else if (body[val] === 'Comment'
                await StringLenghtChecker(body[val],Lcomment,val)
            else
                await StringLenghtChecker(body[val],Lother,val)
		}
    }
    
	async Create(body) {
		await this.CheckLenght(body)
		const sql = await SQLInsert(body,'ITEM_MENU')
		await this.db.run(sql)
		return true
	}

	async Modify(body, ItemId) {
		await this.CheckLenght(body)
		body.UpdatedAt = todaydate()
		const sql = await SQLModify(body,'ITEM_MENU','ItemId',ItemId)
		await this.db.run(sql)
		return true
	}

	async Close() {
		await this.db.close()
	}

}

export default Items
