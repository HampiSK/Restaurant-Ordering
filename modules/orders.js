/** module Tables */

import { SQLInsert, SQLModify, SQLCreate } from '../modules/sql/sql-module.js'
import RestaurantOrderTable from '../modules/sql/restaurant_order-table.js'
import todaydate from './scripts/today-date.js'
import { StringLenghtChecker } from './scripts/checkers.js'

const Lcomment = 1000

/**
 * Tables
 * ES6 module that handles creating and managing tables.
 */
class Orders {
	/**
   * Create an tables object
   * @param {String} [dbName=":memory:"] - The name of the database file to use.
   */
	constructor(dbName = ':memory:') {
		return (async() => SQLCreate(this,dbName,RestaurantOrderTable()) )()
	}

	async Create(body) {
		await StringLenghtChecker(body['Comment'],Lcomment)
		const sql = await SQLInsert(body,'RESTAURANT_ORDER')
		await this.db.run(sql)
		return true
	}

	async Modify(body, OrderId) {
		await StringLenghtChecker(body['Comment'],Lcomment)
		body.UpdatedAt = todaydate()
		const sql = await SQLModify(body,'RESTAURANT_ORDER','OrderId',OrderId)
		await this.db.run(sql)
		return true
	}

	async Close() {
		await this.db.close()
	}

}

export default Orders
