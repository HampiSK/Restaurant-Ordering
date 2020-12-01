/** module Tables */

import { SQLInsert, SQLModify, SQLCreate } from '../modules/sql/sql-module.js'
import RestaraurantTable from '../modules/sql/restaurant_table-table.js'
import todaydate from './scripts/today-date.js'
import { CommentChecker } from './scripts/checkers.js'

const Lcomment = 1000

/**
 * Tables
 * ES6 module that handles creating and managing tables.
 */
class Tables {
	/**
   * Create an tables object
   * @param {String} [dbName=":memory:"] - The name of the database file to use.
   */
	constructor(dbName = ':memory:') {
		return (async() => SQLCreate(this,dbName,RestaraurantTable()) )()
	}

	async gettables(flag = 1) {
		if (flag < 0 || flag > 1) throw new Error('Invalid flag for gettables')
		const tables = []
		await this.db.each(`SELECT TableId FROM RESTAURANT_TABLE WHERE InUse = "${flag}%"`, (err, row) => {
			if (err === 0) throw new Error('Cannot open database')
			tables.push(row.TableId)
		})
		return tables
	}

	async create(body) {
		await CommentChecker(body['Comment'],Lcomment)
		const sql = await SQLInsert(body,'RESTAURANT_TABLE')
		await this.db.run(sql)
		return true
	}

	async modify(body, TableId) {
		await CommentChecker(body['Comment'],Lcomment)
		body.UpdatedAt = todaydate()
		const sql = await SQLModify(body,'RESTAURANT_TABLE','TableId',TableId)
		await this.db.run(sql)
		return true
	}

	async close() {
		await this.db.close()
	}

}

export default Tables
