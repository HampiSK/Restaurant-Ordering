/** @module Accounts */

import bcrypt from 'bcrypt-promise'
import sqlite from 'sqlite-async'
import UserTable from '../modules/sql/user-table.js'
import SQLInsert from '../modules/sql/sql-insert.js'

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

	/**
     * Create an UserName from first name and last name of the user.
     * Making sure that each user name is unique.
     * When duplicate usernames are created new username gets number at the end starting by 0.
     * Username is in lowercase
     * Return new unique username
     *
     */
	async CreateUserName(FirstName, LastName) {
		let highest = 0 // Will be used as highest number of already existing users
		const newUsername = LastName.toLowerCase() + FirstName.toLowerCase()[0]
		let username = newUsername
		// until new username returned
		while (true) {
			const sql = `SELECT COUNT(UserId) as records FROM USER WHERE UserName="${username}";`
			const data = await this.db.get(sql) // getting data from database
			if (data.records !== 0) // when name already exists
			// looping each username
				await this.db.each(`SELECT UserName FROM USER WHERE UserName LIKE "${username}%"`, (err, row) => {
					if (err === 0) throw new Error('Cannot open database')
					const dbName = row.UserName
					let number = dbName.substring(username.length - 1) // exracting only numbers from username
					number = parseInt(number)
					if (highest < number) highest = number // Storing highest number
					username = newUsername+(highest++).toString() // creating new username
				})
			else
				return username // Only gets here when username is unique
		}
	}

	/**
     * Checking if email address is not already taken
     *
     */
	async AvaiabilityEmailCheck(Email) {
		const sql = `SELECT COUNT(UserId) as records FROM USER WHERE Email="${Email}";`
		const emails = await this.db.get(sql) // getting data from database
		if (emails.records !== 0) // when address already exists
			throw new Error(`email address "${Email}" is already in use`)
	}

	/**
     * Take object and update it based on Possition values.
     * Delete 'Position' from object.
     *
     */
	async Jobs(body) {
		switch(body.Position) {
			case 'Admin':
				body.Admin = 1, body.Manager = 0, body.Waiter = 0, body.Chef = 0
				break
			case 'Manager':
				body.Admin = 0, body.Manager = 1, body.Waiter = 0, body.Chef = 0
				break
			case 'Waiter':
				body.Admin = 0, body.Manager = 0, body.Waiter = 1, body.Chef = 0
				break
			case 'Chef':
				body.Admin = 0, body.Manager = 0, body.Waiter = 0, body.Chef = 1
				break
			default:
				throw new Error('Error: Job flag list was not created')
		}
		delete body.Position
	}

	/**
     * Take object and check if each value is not too long.
     *
     */
	async CheckLenght(body) {
		const Lgender = 10
		const Lcomment = 1000
		const Lval = 50

		for (const val of Object.keys(body)) {
			if (body['Gender'].length > Lgender)
				throw new Error('Lenght of \'Gender\' is too long')
			else if (body['Comment'].length > Lcomment)
				throw new Error('Lenght of \'Comment\' is too long')
			else if (body[val].length > Lval)
				throw new Error(`Lenght of '${val}' is too long`)
		}
	}

	/**
   * Registers a new user.
   * Take object parameter.
   * Using methods to modify parameter and as a checkers.
   * Returns Boolean returns true if the new user has been added.
   */
	async register(body) {
		body.CreatorId = 1 // temp
		await this.CheckLenght(body) // Checking lenght
		// Creating unique username
		body.UserName = await this.CreateUserName(body.FirstName.trim(), body.LastName.trim())
		if (body.Email.trim() !== '')
			await this.AvaiabilityEmailCheck(body.Email) // Check if email is unique
		if (body.Password.trim() !== '') // Check password is not created form spaces
			body.PasswordHash = await bcrypt.hash(body.Password, saltRounds)
		await this.Jobs(body)
		delete body.Password
		delete body.PasswordValidation
		const sql = await SQLInsert(body,'USER') // get sql statement
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
		let sql = `SELECT count(UserId) AS count FROM USER WHERE UserName="${username}";`
		const records = await this.db.get(sql)
		if (!records.count) throw new Error(`username "${username}" not found`)
		sql = `SELECT PasswordHash FROM USER WHERE UserName = "${username}";`
		const record = await this.db.get(sql)
		const valid = await bcrypt.compare(password, record.PasswordHash)
		if (valid === false)
			throw new Error(`invalid password for account "${username}"`)
		return true
	}

	async close() {
		await this.db.close()
	}
}

export default Accounts
