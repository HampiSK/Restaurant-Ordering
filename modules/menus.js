/** module Tables */

import { SQLInsert, SQLModify, SQLCreate } from '../modules/sql/sql-module.js'
import MenuTable from '../modules/sql/menu-table.js'
import todaydate from './scripts/today-date.js'
import { StringLenghtChecker } from './scripts/checkers.js'

const Lcomment = 1000

/**
 * Tables
 * ES6 module that handles creating and managing tables.
 */
class Menus {
	/**
   * Create an tables object
   * @param {String} [dbName=":memory:"] - The name of the database file to use.
   */
	constructor(dbName = ':memory:') {
		return (async() => SQLCreate(this,dbName,MenuTable()) )()
	}
    
	async Create(body) {
		await StringLenghtChecker(body['Comment'],Lcomment,'Comment')
		const sql = await SQLInsert(body,'MENU')
		await this.db.run(sql)
		return true
	}

	async Modify(body, MenuId) {
		await StringLenghtChecker(body['Comment'],Lcomment,'Comment')
		body.UpdatedAt = todaydate()
		const sql = await SQLModify(body,'MENU','MenuId',MenuId)
		await this.db.run(sql)
		return true
	}

	async Close() {
		await this.db.close()
	}

}

export default Menus
