/** @Scripts For Table Buttons */

/* Modules */
import Tables from '../builders/tables.js'

/* Constants */
const DBNAME = 'website.db'

/**
  * @Function
  * Actions for buttons in table
  *
  * @Alert
  * Async function
  *
  * @param {string} [option] - Button action
  *
  */
const tableButton = async(userId, option) => {
	const TABLES = await new Tables(DBNAME)
	try{
		switch (option) {
			case 'Add Table':
				await tableAdd(userId,TABLES)
				break
			case 'Delete Table':
				await tableDel(userId,TABLES)
				break
		}
	}catch(err) {
		throw new Error(`tableButton(): ${err.message}`)
	}finally{
		TABLES.Close()
	}
}

/**
  * @Function
  * Action for adding table
  *
  * @Alert
  * Async function
  *
  * @param {string} [option] - Button action
  *
  */
const tableAdd = async(userId,table) => {
	const body = {
		CreatorId: userId
	}
	await table.Create(body)
}

/**
  * @Function
  * Action for adding table
  *
  * @Alert
  * Async function
  *
  * @param {string} [option] - Button action
  *
  */
const tableDel = async(userId,table) => {
	const TABLES = await table.GetTables()
	const DEACTIVATE = TABLES[TABLES.length - 1]
	delete DEACTIVATE.TableName
	DEACTIVATE.InUse = 0
	await table.Modify(DEACTIVATE,DEACTIVATE.TableId)
}

export default tableButton
