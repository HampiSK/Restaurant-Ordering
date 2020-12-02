/** module Tables */

import { SQLInsert, SQLModify, SQLCreate } from '../modules/sql/sql-module.js'
import PaymentTable from '../modules/sql/payment-table.js'
import todaydate from './scripts/today-date.js'
import { StringLenghtChecker, NumberChecker } from './scripts/checkers.js'

const Lcomment = 1000

/**
 * Tables
 * ES6 module that handles creating and managing tables.
 */
class Payments {
	/**
   * Create an tables object
   * @param {String} [dbName=":memory:"] - The name of the database file to use.
   */
	constructor(dbName = ':memory:') {
		return (async() => SQLCreate(this,dbName,PaymentTable()) )()
	}
       
	async Create(body) {
		await StringLenghtChecker(body['Comment'],Lcomment,'Comment')
        await NumberChecker(body)
		const sql = await SQLInsert(body,'PAYMMENT')
		await this.db.run(sql)
		return true
	}

	async Modify(body, MenuId) {
		await StringLenghtChecker(body['Comment'],Lcomment,'Comment')
        await NumberChecker(body)
		body.UpdatedAt = todaydate()
		const sql = await SQLModify(body,'PAYMMENT','PaymentId',PaymentId)
		await this.db.run(sql)
		return true
	}

	async Close() {
		await this.db.close()
	}

}

export default Payments
