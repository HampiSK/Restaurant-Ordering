/** @Module Accounts */

/* Packages */
import bcrypt from 'bcrypt-promise'

/* Modules */
import { sqlInsert, sqlModify, sqlCreate } from '../modules/sql/sql-module.js'
import userTable from '../modules/sql/user-table.js'
import todayDate from './scripts/today-date.js'
import { stringLenghtChecker, emptyStringChecker } from './scripts/checkers.js'

const SALTROUNDS = 10 // Rounds to encrypt password

/**
 * @Object
 * Object Account is ES6 module that handles registering accounts and logging in.
 *
 */
class Accounts {
	/**
     * @Constructor
     * Create an account object.
     *
     * @Alert
     * Async.
     *
     * Optional:
     * @param {String} [dbName=":memory:"] - The name of the database file to use.
     *                                       On default runs in main memory.
     * @return {object} - Itself.
     */
	constructor(dbName = ':memory:') {
		return (async() => await sqlCreate(this,dbName,userTable()) )()
	}


	/**
	 * @Method
     * Create an unique UserName.
     * When duplicate username is created new username gets number at the end starting by 0.
     *
     * @Alert
     * Async.
     *
     * @param {String} [userName]    - Username to be checked and updated if needed.
     *
     * @return {String} [uniqueName] - Return new unique username.
     *
     */
	async UniqueUsername(userName) {
		try{
			let highest = 0 // Will be used as highest number of already existing users
			let uniqueName = userName
			const SQL = `SELECT COUNT(UserId) as records FROM USER WHERE UserName="${uniqueName}";`
			const DATA = await this.db.get(SQL) // getting data from database
			if (DATA.records !== 0) { // when name already exists
				await this.db.each(`SELECT UserName FROM USER WHERE UserName LIKE "${uniqueName}%";`, (err, row) => {
					if (err === 0) throw new Error('Cannot open database')
					const DBNAME = row.UserName
					let number = DBNAME.substring(uniqueName.length - 1) // exracting only numbers from username
					number = parseInt(number)
					if (highest < number) highest = number // Storing highest number
					uniqueName = userName+(highest++).toString() // creating new username
				})
			} return uniqueName
		}catch(err) {
			throw new Error(`UniqueUsername(): ${err.message}`)
		}
	}


	/**
	 * @Method
     * Create an unique UserName from first letter in first name and last name of the user.
     * Username is in lowercase
     *
     * @Alert
     * Async.
     *
     * @param {String} [firstName] - First name of user.
     * @param {String} [lastName]  - Last name of user.
     *
     * @return {object} - Return new unique username.
     *
     */
	async CreateUsername(firstName, lastName) {
		try{
			const NEWUSERNAME = lastName.toLowerCase() + firstName.toLowerCase()[0]
			return await this.UniqueUsername(NEWUSERNAME)
		}catch(err) {
			throw new Error(`Something went wrong while creating username => ${err.message}`)
		}
	}


	/**
	 * @Method
	 * Modify email by deleting whitespaces.
     * Checking if email address is not already taken.
     *
     * @Alert
     * Async.
     *
     * @param {String} [email] - Email of user.
     *
     * @return {String} [email] - Unique email of user whithout whitespaces.
     *
     */
	async EmailCheck(email) {
		try {
			if(emptyStringChecker(email)) return ''
			email = email.trim()
			const SQL = `SELECT COUNT(UserId) as records FROM USER WHERE Email="${email}";`
			const DATA = await this.db.get(SQL) // getting data from database
			if (DATA.records !== 0) // when address already exists
				throw new Error(`Email address "${email}" is already in use`)
			return email
		}catch(err) {
			throw new Error(`EmailCheck(): ${err.message}`)
		}
	}


	/**
	 * @SubMethod of Jobs
     * Translate position into flags.
     *
     * @Alert
     * Async.
     *
     * @param {string} [position] - String with name of position.
     *
     * @return {object} - Job Flags.
     *
     */
	async JobsCases(position) {
		switch(position) {
			case 'Admin':
				return {Admin: 1, Manager: 0, Waiter: 0, Chef: 0}
			case 'Manager':
				return {Admin: 0, Manager: 1, Waiter: 0, Chef: 0}
			case 'Waiter':
				return {Admin: 0, Manager: 0, Waiter: 1, Chef: 0}
			case 'Chef':
				return {Admin: 0, Manager: 0, Waiter: 0, Chef: 1}
			default:
				throw new Error('Job flag list was not created')
		}
	}

	/**
	 * @Method
     * Translate position into flags.
     *
     * @Alert
     * Async.
     *
     * @param {string} [position] - String with name of position.
     *
     * @return {object} - Job Flags.
     *
     */
	async Jobs(position) {
		try{
			const LPOSITION = 10
			stringLenghtChecker(position, LPOSITION, 'Position')
			return await this.JobsCases(position)
		}catch(err) {
			throw new Error(`Jobs(): ${err.message}` )
		}
	}


	/**
	 * @Method
     * Check if each value is not too long.
     *
     * @Alert
     * Async.
     *
     * @param {object} [body] - Object with new user data
     *
     */
	async CheckLenght(body) {
		try{
			const LCOMMENT = 1000
			const LVAL = 50
			for (const VAL of Object.keys(body)) {
				if (VAL === 'PasswordHash') continue
				else if (VAL === 'Comment')
					stringLenghtChecker(body['Comment'], LCOMMENT, VAL)
				else
					stringLenghtChecker(body[VAL], LVAL, VAL)
			}
		}catch(err) {
			throw new Error(`CheckLenght(): ${err.message}`)
		}

	}


	/**
	 * @Method
     * Check if each value is not too long.
     *
     * @Alert
     * Async. Not pure method, using SALTROUNDS.
     *
     * @param {object} [body] - Object with passwords.
     *
     * @return {string} - Password hash.
     *
     */
	async Password(body) {
		try{
			const LPASSWORD = 50

			stringLenghtChecker(body['Password'], LPASSWORD, 'Password')
			// Check password is not created form spaces
			if (body.Password.trim() === '') throw new Error('Password is not accepted.')
			const PASSWORD = await bcrypt.hash(body.Password, SALTROUNDS)
			delete body.Password
			delete body.PasswordValidation
			return PASSWORD
		}catch(err) {
			throw new Error(`Password(): ${err.message}`)
		}
	}


	/**
	 * @Method
     * Registers a new user.
     *
     * @Alert
     * Async.
     *
     * @param {object} [body] - Object with new user details.
     *
     * @return {boolean}
     *
     */
	async Register(body) {
		try {
			body.CreatorId = 1 // temp
			body.PasswordHash = await this.Password(body)
			body.Email = await this.EmailCheck(body.Email)
			body.UserName = await this.CreateUsername(body.FirstName.trim(), body.LastName.trim())
			Object.assign(body,await this.Jobs(body.Position))
			delete body.Position
			const SQL = await sqlInsert(body,'USER') // get sql statement
			await this.CheckLenght(body) // Checking lenght
			await this.db.run(SQL)
			return true
		}catch(err) {
			throw new Error(`User was not created => ${err.message}`)
		}
	}


	/**
	 * @Method
     * Checks to see if a set of login credentials are valid.
     *
     * @Alert
     * Async.
     *
     * @param {string} [username] - the username to check
     * @param {string} [password] - the password to check
     *
     * @returns {boolean} - returns true if credentials are valid
     *
     */
	async Login(username, password) {
		try{
			let sql = `SELECT count(UserId) AS count FROM USER WHERE UserName="${username}";`
			const RECORDS = await this.db.get(sql)
			if (!RECORDS.count) throw new Error(`Username "${username}" not found`)
			sql = `SELECT PasswordHash FROM USER WHERE UserName = "${username}";`
			const RECORD = await this.db.get(sql)
			const VALID = await bcrypt.compare(password, RECORD.PasswordHash)
			if (!VALID) throw new Error(`Invalid password for account "${username}"`)
			const BODY = {LastLogin: await todayDate()}
			sql = await sqlModify(BODY,'USER','UserName',username)
			await this.db.run(sql)
			return true
		}catch(err) {
			throw new Error(`Login failed => ${err.message}`)
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

/** @Export For Accounts */
export default Accounts
