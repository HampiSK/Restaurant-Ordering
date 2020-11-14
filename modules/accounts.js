/** @module Accounts */

import bcrypt from 'bcrypt-promise'
import sqlite from 'sqlite-async'
import UserTable from '../modules/sql/user-table.js'
//import CreateUserName from '../modules/accounts/accounts-register.js'

const saltRounds = 10

/**
 * Accounts
 * ES6 module that handles registering accounts and logging in.
 */
class Accounts {
	/**
   * Create an account object
   * @param {String} [dbName=":memory:"] - The name of the database file to use.
   */
	constructor(dbName = ':memory:') {
		return (async() => {
			this.db = await sqlite.open(dbName)
			// we need this table to store the user accounts
			const sql = UserTable()
			await this.db.run(sql)
			return this
		})()
	}

	async CreateUserName(FirstName, LastName) {
		try {
			let username = LastName.toLowerCase() + FirstName.toLowerCase()[0]
			let counter = 1
			while(true) {
				const sql = `SELECT COUNT(UserId) as records FROM USER WHERE UserName="${username}";`
				const data = await this.db.get(sql)
				if (data.records !== 0)
					username += counter.toString()
				else
					break

				counter++
			}
			return username
		} catch(err) {
			console.log(err)
		}
	}

	async AvaiabilityEmailCheck(Email) {
		const sql = `SELECT COUNT(UserId) as records FROM USER WHERE Email="${Email}";`
		const emails = await this.db.get(sql)
		if (emails.records !== 0)
			throw new Error(`email address "${Email}" is already in use`)
	}

	async Jobs(Position) {
		console.log(Position)
		switch(Position) {
			case 'Admin':
				return [1, 0, 0, 0]
			case 'Manager':
				return [0, 1, 0, 0]
			case 'Waiter':
				return [0, 0, 1, 0]
			case 'Chef':
				return [0, 0, 0, 1]
			default:
				throw new Error('Error: Job flag list was not created')
		}
	}

	//  			ctx.request.body.FirstName,
	// 			ctx.request.body.LastName,
	//             ctx.request.body.PasswordValidation,
	//             ctx.request.body.Gender,
	//             ctx.request.body.Birth,
	//             ctx.request.body.Position,
	//             ctx.request.body.Comment,
	//             ctx.request.body.Address,
	//             ctx.request.body.City,
	//             ctx.request.body.Zip,
	//             ctx.request.body.Phone,
	//             ctx.request.body.Email

	/**
   * registers a new user
   * @param {String} user the chosen username
   * @param {String} pass the chosen password
   * @param {String} email the chosen email
   * @returns {Boolean} returns true if the new user has been added
   */
	async register(FirstName, LastName, Gender, Birth, Email, Phone, Street, City, Zip,
		Password, Position, CreatorId, Comment) {
		//     Array.from(arguments).forEach((val) => {
		//         if (val.length === 0) throw new Error('Error: Missing field to create')
		//     })

		const UserName = await this.CreateUserName(FirstName, LastName)
		await this.AvaiabilityEmailCheck(Email)
		console.log(Password)
		Password = await bcrypt.hash(Password, saltRounds)
		const positions = await this.Jobs(Position)
		const sql = `INSERT INTO USER(UserName, FirstName, LastName, Gender, Birth, Email, Phone, Street, City, Zip, PasswordHash, Admin, Manager, Waiter, Chef, CreatorId, Comment) 
                 VALUES("${UserName}", "${FirstName}", "${LastName}", "${Gender}", "${Birth}", "${Email}", "${Phone}", "${Street}", "${City}", "${Zip}", "${Password}", "${positions[0]}", "${positions[1]}", "${positions[2]}", "${positions[3]}", "${CreatorId}", "${Comment}")`
		await this.db.run(sql)
		return true
	}

	/**
   * checks to see if a set of login credentials are valid
   * @param {String} username the username to check
   * @param {String} password the password to check
   * @returns {Boolean} returns true if credentials are valid
   */
	async login(username, password) {
		let sql = `SELECT count(id) AS count FROM users WHERE user="${username}";`
		const records = await this.db.get(sql)
		if (!records.count) throw new Error(`username "${username}" not found`)
		sql = `SELECT pass FROM users WHERE user = "${username}";`
		const record = await this.db.get(sql)
		const valid = await bcrypt.compare(password, record.pass)
		if (valid === false)
			throw new Error(`invalid password for account "${username}"`)
		return true
	}

	async close() {
		await this.db.close()
	}
}

export default Accounts
