/** module Tables */

import RestaraurantTable from '../modules/sql/restaurant_table-table.js'
import SQLInsert from '../modules/sql/sql-insert.js'

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
		return (async() => {
			this.db = await sqlite.open(dbName)
			// we need this table to store the user accounts
			const sql = RestaraurantTable()
			await this.db.run(sql)
			return this
		})()
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
		const Lcomment = 1000
		if (body['Comment'].length > Lcomment) throw new Error('Lenght of \'Comment\' is too long')
		const sql = await SQLInsert(body,'RESTAURANT_TABLE')
		await this.db.run(sql)
		return true
	}

	async modify(body, UserId) {
		const Lcomment = 1000
		if (body['Comment'].length > Lcomment) throw new Error('Lenght of \'Comment\' is too long')
		const sql = await SQLInsert(body,'RESTAURANT_TABLE')
		await this.db.run(sql)
		return true
	}

}
